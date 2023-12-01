import axios from "axios";
import { useEffect, useState } from "react";
import Heading from "../Header/Heading";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Services = () => {
    const [services, setServices] = useState([]);
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axiosPublic.get('/services')
            .then(res => setServices(res.data))
            .catch(err => console.error(err));
    }, [axiosPublic]);

    return (
        <div className=" mx-auto p-6 pt-10 md:pt-16 lg:pt-20 shadow-lg shadow-slate-600 bg-gradient-to-b from-blue-400 to-base-100 py-10 mb-2">
            <Heading title={'🛠️ Our Services'}/>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
                {services.map(service => (
                    <div key={service._id} className="bg-white shadow-md p-4 rounded-md hover:shadow-lg transition duration-300 ease-in-out">
                        <img src={service.img} alt={service.title} className="w-full h-32 object-cover mb-4 rounded-md" />
                        <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                        <p className="text-gray-600">{service.description}</p>
                        <div className="mt-4">
                            <span className="text-green-500 font-semibold">{service.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
