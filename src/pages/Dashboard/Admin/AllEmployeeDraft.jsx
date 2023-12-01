import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Heading from "../../../components/Header/Heading";
import Swal from 'sweetalert2';
import useEmployees from "../../../Hooks/useEmployees";

const AllEmployeeDraft = () => {
    const [employees, refetch] = useEmployees()

    const [isTableMode, setTableMode] = useState(true);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleMakeHR = (employee) => {
        // Implement logic to make the employee HR
        console.log("Make HR:", employee);
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
                // Call the function to handle firing the employee
                console.log("Fire:", employee);
                refetch()
                Swal.fire('Fired!', `${employee?.name} has been fired.`, 'success');
            }
        });
    };

    const toggleViewMode = () => {
        setTableMode(!isTableMode);
    };

    return (
        <div className="min-h-screen">
            <Heading title="All Employee List"></Heading>
            <button className="btn btn-sm btn-primary" onClick={toggleViewMode}>
                Toggle View: {isTableMode ? "Card" : "Table"}
            </button>

            {isTableMode ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.designation}</td>
                                <td>
                                    <button onClick={() => handleMakeHR(employee)}>
                                        Make HR
                                    </button>
                                    <button onClick={() => handleFireEmployee(employee)}>Fire</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>
                    {employees.map((employee) => (
                        <div key={employee.id}>
                            <p>Name: {employee.name}</p>
                            <p>Designation: {employee.designation}</p>
                            <button onClick={() => handleMakeHR(employee)}>Make HR</button>
                            <button onClick={() => handleFireEmployee(employee)}>Fire</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllEmployeeDraft;
