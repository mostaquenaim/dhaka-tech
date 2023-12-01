import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Heading from "../Header/Heading";
import TestimonialSwiper from "./TestimonialSwiper";

const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/reviews')
            .then(res => setReviews(res.data))
    }, [axiosPublic])

    return (
        // grid grid-cols-1 md:grid-cols-2 gap-3
        <div className=" shadow-lg shadow-slate-600 bg-gradient-to-b from-blue-400 to-base-100 py-10 mb-2">
            <div className="mx-10">
                <Heading title='📝 Testimonials'></Heading>
                <TestimonialSwiper reviews={reviews}></TestimonialSwiper>
            </div>
        </div>
    );
};

export default Testimonials;