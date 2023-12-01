import { useState, useEffect } from "react";
import useWorkSheet from "../../../Hooks/useWorkSheet";
import WorkTable from "../../../components/Work/WorkTable";
import FilterSection from "../../../components/Work/FilterSection"; // Create this component
import useEmployees from "../../../Hooks/useEmployees";
import Heading from "../../../components/Header/Heading";

const WorkProgress = () => {
    const [works, isPending] = useWorkSheet();
    const [employees] = useEmployees()
    const [filteredWorks, setFilteredWorks] = useState(works);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

    // useEffect to update filteredWorks whenever works, selectedEmployee, or selectedMonth change
    useEffect(() => {
        // Filter works based on selectedEmployee and selectedMonth
        let filteredData = works;
        console.log(works, "188");
        if (selectedEmployee) {
            filteredData = filteredData.filter((work) => work.user.email === selectedEmployee);
        }

        if (selectedMonth) {
            filteredData = filteredData.filter((work) => {
                const workMonth = new Date(work.date).getMonth()+1; // Assuming date is a string
                return workMonth == parseInt(selectedMonth);
            });
        }

        setFilteredWorks(filteredData);
    }, [works, selectedEmployee, selectedMonth]);

    return (
        <div>
            <Heading title={'Work Progress'}></Heading>
            <FilterSection
                employees={employees}
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
            />
            <WorkTable works={filteredWorks} isPending={isPending} />


        </div>
    );
};

export default WorkProgress;
