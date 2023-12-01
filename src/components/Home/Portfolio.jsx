import { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '../Header/Heading';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Portfolio = () => {
    const [portfolioData, setPortfolioData] = useState([]);
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        // Fetch data from a fake JSON API (Replace with your actual API endpoint)
        axiosPublic.get('/portfolios')
            .then(response => setPortfolioData(response.data))
            .catch(error => console.error('Error fetching portfolio data:', error));
    }, []);

    return (
        <>
            <div className=" mx-auto p-6 pt-10 md:pt-16 lg:pt-20 shadow-lg shadow-slate-600 bg-gradient-to-b from-blue-400 to-base-100 py-10 mb-2">
                <Heading title={'🛠️ Portfolio'} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
                    {portfolioData.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-md shadow-md">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-40 object-cover mb-4 rounded-md"
                            />
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.albumId}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Portfolio;
