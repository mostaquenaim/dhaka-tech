// FilterSection.jsx

import { useEffect, useState } from "react";

const FilterSection = ({
  employees,
  selectedEmployee,
  setSelectedEmployee,
  selectedMonth,
  setSelectedMonth,
}) => {
  const [noHrEmployees, setNoHrEmployees] = useState(employees);

  useEffect(() => {
    const res = employees.filter((emp) => emp.role !== "hr");
    setNoHrEmployees(res);
  }, [employees]);

  // Create an array of month options
  const monthOptions = [
    { value: "", label: "All Months" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-5 my-10 mx-10 items-center">
      {/* Dropdown for selecting an employee */}
      <label>Select Employee:</label>
      <select
        value={selectedEmployee || ""}
        onChange={(e) => setSelectedEmployee(e.target.value)}
        className="input"
      >
        <option value="">All Employees</option>
        {noHrEmployees.map((employee) => (
          <option key={employee.id} value={employee.email}>
            {employee.name}
          </option>
        ))}
      </select>

      {/* Dropdown for selecting a month */}
      <label>Select Month:</label>
      <select
        value={selectedMonth || ""}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="input"
      >
        {monthOptions.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSection;
