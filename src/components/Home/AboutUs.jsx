import Heading from "../Header/Heading";

const AboutUs = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center text-center shadow-lg shadow-slate-600 bg-gradient-to-b from-blue-400 to-base-100 py-10 mb-2">
            <div className="mx-auto mt-10 max-w-2xl">
                <Heading title={'🌟 About Us'}/>
                <div className="flex items-center justify-center mb-6">
                    <img
                        src="/dhaka-tech.png" // Replace with your company logo or relevant image
                        alt="Company Logo"
                        className="rounded-full h-20 w-20 lg:w-28 lg:h-28 object-cover border-4 border-blue-500"
                    />
                </div>
                <p className="text-gray-600 mb-4">
                    Welcome to Dhaka Tech! We are a passionate team dedicated to providing innovative solutions and top-notch services. Our mission is to redefine the tech industry and create a positive impact on the world.
                </p>
                <p className="text-gray-600 mb-4">
                    At Dhaka Tech, we believe in the power of technology to transform businesses and enhance lives. Our skilled team of professionals works tirelessly to deliver cutting-edge solutions tailored to meet your unique needs.
                </p>
                <p className="text-gray-600 mb-4">
                    Whether you are looking for web development, mobile app solutions, or strategic consulting, Dhaka Tech is here to exceed your expectations. We value collaboration, integrity, and excellence in everything we do.
                </p>
                <p className="text-gray-600">
                    Join us on our journey towards innovation and success. Let us build a brighter future together!
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
