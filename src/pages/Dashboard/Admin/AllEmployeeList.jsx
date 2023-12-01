import Heading from "../../../components/Header/Heading";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useEmployees from "../../../Hooks/useEmployees";
import { useQuery } from "@tanstack/react-query";
import useVerifiedEmployees from "../../../Hooks/useVerifiedEmployees";

const AllEmployeeList = () => {

  const [isTableMode, setTableMode] = useState(true);
  const axiosPublic = useAxiosPublic()
  const [verifiedEmployees, refetch, isPending] = useVerifiedEmployees()

  // const { isPending, data: verifiedEmployees, refetch } = useQuery({
  //   queryKey: ['verifiedEmployees'],
  //   queryFn: async () =>
  //     await axiosPublic.get(`/get-all-verifiedEmployees`).then(
  //       (res) => res.data,
  //     ),
  // })

  console.log("25", verifiedEmployees);

  const handleMakeHR = (employee) => {
    // Implement logic to make the employee HR
    if (employee.role === 'employee') {
      Swal.fire({
        title: 'Are you sure?',
        text: `You are about to make ${employee?.name} a HR`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {

          const userData = {
            email: employee.email,
            role: 'hr',
          }
          //start from update 
          axiosPublic.patch(`update-employee/${userData.email}?role=${userData.role}`)
            .then(res => {
              console.log(res.data)
              refetch()
              Swal.fire('Successful!', `${employee?.name} has been made a HR.`, 'success')
            })

          console.log("HR:", employee);

        }
      })

    }
  };

  const handleFireEmployee = (employee) => {
    // Implement logic to fire the employee
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to fire ${employee?.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, fire them!'
    }).then((result) => {
      if (result.isConfirmed) {
        //start from update 
        axiosPublic.patch(`fire-employee/${employee.email}?isFired=true`)
          .then(res => {
            console.log(res.data)
            refetch()
            Swal.fire('Fired!', `${employee?.name} has been fired.`, 'success')
          })

        console.log("Fire:", employee);

      }
    })
  };

  const toggleViewMode = () => {
    setTableMode(!isTableMode);
  };

  return (
    <div className="mx-10 min-h-screen">
      <Heading title="All Employee List"></Heading>
      <button className="btn btn-sm btn-primary" onClick={toggleViewMode}>
        Toggle View: {isTableMode ? "Card" : "Table"}
      </button>

      {
        isPending ?
          <span className="loading loading-spinner loading-lg"></span>
          :
          isTableMode ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Action</th>
                    <th>Fire</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    verifiedEmployees?.length > 0 && verifiedEmployees.map((employee, index) => (
                      <tr key={index} className={`bg-white ${index%2 === 0 && 'bg-opacity-60' }`  }>
                        <th>
                          <label>
                            {index + 1}
                          </label>
                        </th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={employee.image} alt="Avatar" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{employee.name}</div>
                              <div className="text-sm opacity-50"></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {employee.designation}
                          <br />
                        </td>
                        <td>
                          <button className="btn btn-ghost" onClick={() => handleMakeHR(employee)}>
                            <img src={employee.role === 'employee' ? '/employee.png' : 'hr.png'} className="w-10 h-10" alt="" />
                          </button>
                        </td>
                        <th>

                          {
                            employee.isFired ?
                              <span>Fired</span>
                              :
                              <button className="btn btn-ghost" onClick={() => handleFireEmployee(employee)}>
                                <img src="/fire.png" className="w-10 h-10" alt="" />
                              </button>
                          }

                        </th>
                      </tr>
                    ))
                  }

                </tbody>

              </table>
            </div>
          )
            :
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
              {verifiedEmployees &&
                verifiedEmployees.map((employee, index) => (
                  <div key={index} className="relative bg-white p-4 rounded-lg shadow-md flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={employee.image} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{employee.name}</div>
                          <div className="text-sm opacity-50"></div>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      Designation: <span className="font-semibold">{employee.designation}</span>
                    </div>

                    <div className="flex items-center justify-end">
                      {employee.isFired ? (
                        <span>Fired</span>
                      ) : (
                        <button
                          className="btn btn-ghost"
                          onClick={() => handleFireEmployee(employee)}
                        >
                          <img
                            src="/fire.png"
                            className="w-10 h-10"
                            alt=""
                          />
                        </button>
                      )}

                      <button
                        className="btn btn-ghost mt-2"
                        onClick={() => handleMakeHR(employee)}
                      >
                        <img src={employee.role === 'employee' ? '/employee.png' : 'hr.png'} className="w-10 h-10" alt="" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
      }
    </div>
  );
};

export default AllEmployeeList;