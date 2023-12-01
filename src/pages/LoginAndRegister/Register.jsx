import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/Auth/AuthProvider';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation();
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        image: null, // Change to null to store the file
        name: '',
        bank_account_no: '',
        salary: '',
        designation: '',
        role: '',
        isVerified: false,
        isFired: false
    });

    const { reset } = useForm();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordRegex.test(formData.password)) {
            toast.error("Password must be at least 6 characters long and contain a capital letter and a special character.");
            return;
        }

        try {
            // Upload image to image hosting service
            const imageFile = { image: formData.image };
            const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (imageRes.data.success) {
                createUser(formData.email, formData.password)
                    .then(result => {
                        const loggedUser = result.user;
                        console.log(loggedUser);
                        updateUserProfile(formData.name, imageRes.data.data.display_url)
                            .then(async () => {
                                // Prepare user data for registration
                                const userData = {
                                    name: formData.name,
                                    email: formData.email,
                                    bank_account_no: formData.bank_account_no,
                                    salary: formData.salary,
                                    designation: formData.designation,
                                    role: formData.role,
                                    isVerified: false, // Set isVerified to false
                                    isFired: false,
                                    image: imageRes.data.data.display_url
                                };

                                // Register the user
                                const userRes = await axiosPublic.post('/add-user', userData);
                                console.log(userRes, "76");
                                if (userRes.data) {
                                    // Reset the form after successful registration
                                    reset(); // Assuming reset is a function to reset the form
                                    // Show a success toast
                                    toast.success('Registration Successful!');
                                    const destination = location?.state || '/';
                                    navigate(destination);
                                } else {
                                    toast.error('Info not collected');
                                }
                            })
                            .catch(err => toast.error(err.message)); // Catch errors in updateUserProfile
                    })
                    .catch(err => toast.error(err.message)); // Catch errors in createUser
            }

        } catch (error) {
            // Handle errors
            console.error('Registration failed:', error);
            // Show an error toast
            toast.error('Registration Failed. Please try again later.');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-50"
            style={{
                backgroundImage: `url('https://i.ibb.co/0K1cDTh/modern-office-design.webp')`,
                backgroundSize: 'cover',
                position: 'relative',
            }}
        >
            {/* Black overlay */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                style={{ zIndex: 1 }}
            ></div>

            <div className="relative z-10 bg-primary bg-opacity-30 p-8 rounded shadow-md w-full max-w-md shadow-slate-400 border-white border-2">
                <Link to='/'>
                    <img src="/dhaka-tech.png" className='h-20 w-20 mx-auto rounded-full m-5' alt="" />
                </Link>
                <h2 className="text-3xl font-semibold mb-6 text-center text-white">
                    Register
                </h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-white">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-white">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                placeholder="Your email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                placeholder="Your password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="bank_account_no" className="block text-white">
                                Bank Account No
                            </label>
                            <input
                                type="text"
                                id="bank_account_no"
                                name="bank_account_no"
                                value={formData.bank_account_no}
                                onChange={handleChange}
                                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                placeholder="Your bank account number"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="salary" className="block text-white">
                                Salary
                            </label>
                            <input
                                type="text"
                                id="salary"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                placeholder="Your salary"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="designation" className="block text-white">
                                Designation
                            </label>
                            <input
                                type="text"
                                id="designation"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                placeholder="Your designation"
                                required
                            />
                        </div>
                        <div className="mb-4 md:col-span-2">
                            <label htmlFor="role" className="block text-white">
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>Select your role</option>
                                <option value="employee">Employee</option>
                                <option value="hr">HR</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4 ">
                        <label htmlFor="image" className="block text-white">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border rounded-md py-2 px-3 focus:outline-none text-white focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full"
                    >
                        Register
                    </button>
                </form>
                <label className="label">
                    <Link to="/login" className="label-text-alt link link-hover text-white">
                        <span>Already registered? Login here</span>
                    </Link>
                </label>

            </div>
        </div>
    );
};

export default Register;
