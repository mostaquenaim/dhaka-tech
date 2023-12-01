import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useGetUser from '../../Hooks/useGetUser';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { RoleContext } from '../../contexts/Role/RoleProvider';

const Login = () => {
    const { signIn } = useGetUser()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPublic = useAxiosPublic()
    const { setCurrentRole } = useContext(RoleContext)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Login form submitted:', formData);
        signIn(formData.email, formData.password)
            .then(result => {
                if (result.user) {
                    axiosPublic.get(`https://dhaka-tech-backend.vercel.app/get-user/${formData.email}`)
                        .then(res => {
                            if (res.data) {
                                const loggedInUser = result.user
                                console.log(loggedInUser);
                                setCurrentRole(res.data?.role)
                                toast.success('Logged in')
                                navigate(location?.state ? location.state : '/');
                            }
                        })
                        .catch(err => {
                            console.log(err,"43");
                            toast.error(err?.response?.data?.message || err.message)
                        })
                }
            })
            .catch(error => {
                console.log(error)
                toast.error(error.message);
            })
    }

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
                <h2 className="text-3xl font-semibold mb-6 text-center text-white">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white ">
                            Email
                        </label>
                        <input
                            type="text"
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
                        <label htmlFor="password" className="block text-white ">
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
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full"
                    >
                        Login
                    </button>
                </form>
                <label className="label" >
                    <Link to="/register" className="label-text-alt link link-hover text-white">
                        <span>Not registered yet?</span>
                    </Link>
                </label>

            </div>
        </div>
    );
};

export default Login;
