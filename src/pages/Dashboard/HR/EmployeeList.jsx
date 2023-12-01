import { useEffect, useState } from "react";
import useEmployees from "../../../Hooks/useEmployees";
import Heading from "../../../components/Header/Heading";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useOnlyEmployees from "../../../Hooks/useOnlyEmployees";
import toast from "react-hot-toast";
import Payment from "../../../components/Payment/Payment";
import { Link } from "react-router-dom";
import TableComp from "../../../components/Table/TableComp";

const EmployeeList = () => {
    const [onlyEmployees, refetch] = useOnlyEmployees()
    const axiosPublic = useAxiosPublic()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState({})

    const openModal = (employee) => {
        setSelectedEmployee(employee)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleVerification = (employee) => {
        axiosPublic.patch(`/update-employee/${employee.email}?isVerified=${!employee.isVerified}`)
            .then(res => {
                console.log(res.data);

                // Wait for 1 second (adjust the delay as needed)
                setTimeout(() => {
                    // After the delay, trigger a refetch
                    if (employee.isVerified) {
                        toast.success(`User is now unverified`, { icon: '🚫', style: { background: 'red', color: 'white' } });
                    } else {
                        toast.success(`User is now verified`, { icon: '✅', style: { background: 'green', color: 'white' } });
                    }
                    refetch();
                }, 1000);
            })
            .catch(error => {
                console.error('Error updating verification status:', error);
            });
    };



    return (
        <div>
            <TableComp emp={onlyEmployees && onlyEmployees} handleVerification={handleVerification} openModal={openModal}></TableComp>
            <div className="overflow-x-auto">
                {
                    isModalOpen &&
                    <div
                        className="fixed bottom-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <div className="absolute w-full h-full bg-black opacity-80" onClick={closeModal}></div>
                        <div
                            data-aos="zoom-in-up"
                            className=" p-4 bg-white rounded-lg z-50 w-full md:w-3/4">
                            <Payment employee={selectedEmployee} ></Payment>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default EmployeeList;