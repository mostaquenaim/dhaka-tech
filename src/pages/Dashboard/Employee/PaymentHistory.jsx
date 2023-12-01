import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useGetUser from "../../../Hooks/useGetUser";
import Heading from "../../../components/Header/Heading";
import Pagination from "./Pagination"; // Update the path accordingly

const PaymentHistory = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useGetUser();
    const [payment, setPayment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const month = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        axiosPublic.get(`/get-user-payment/${user.email}`)
            .then(res => {
                setPayment(res.data);
                setLoading(false);
            });
    }, [axiosPublic, user.email]);

    // Calculate the current items to display based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = payment.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="min-h-screen">
            <Heading title={'Payment History'}></Heading>
            {
                loading ?
                    <span className="loading loading-spinner loading-lg"></span>
                    :
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{month[item.month - 1]}, {item.year}</td>
                                            <td>{item.paid} BDT</td>
                                            <td>{item.transactionId}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(payment.length / itemsPerPage)}
                            onPageChange={handlePageChange}
                        />
                    </div>
            }
        </div>
    );
};

export default PaymentHistory;
