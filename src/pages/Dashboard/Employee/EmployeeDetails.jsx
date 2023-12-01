import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SalaryVsMonth from "../../../components/Charts/SalaryVsMonth";
import { useMediaQuery } from "react-responsive";
import SalaryVsMonthSm from "../../../components/Charts/SalaryVsMonthSm";

const EmployeeDetails = () => {
    const userDetails = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const [salaryData, setSalaryData] = useState([]);
    const { name, image, designation, email } = userDetails;

    useEffect(() => {
        axiosPublic.get(`/get-user-payment/${email}`)
            .then(res => setSalaryData(res.data));
    }, [axiosPublic, email]);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1024px)'
      })
      const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
      const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
      const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
      const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">{name}</h2>
                <img src={image} alt="Employee" className="mx-auto mt-4 rounded-full w-24 h-24 object-cover" />
                <p className="">Designation: <span className="font-semibold text-xl">{designation}</span></p>
            </div>
            {/* <div className="w-full  p-8 bg-gray-100 rounded-lg shadow-md flex flex-col items-center"> */}
            <h3 className="text-xl font-bold mb-4">Salary vs. Month and Year</h3>
            {/* {
                salaryData.length > 0
                && */}
                {
                    isDesktopOrLaptop ?
                    <SalaryVsMonth salaryData={salaryData}></SalaryVsMonth>
                    :
                    <SalaryVsMonthSm salaryData={salaryData}></SalaryVsMonthSm>
                }
            {/* } */}
            {/* </div> */}
        </div>
    );
};

export default EmployeeDetails;
