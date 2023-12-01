import WorkTableComp from '../Table/WorkTableComp'

const WorkTable = ({ works }) => {
    return (
        <>
            {
                works.length > 0 ?
                <WorkTableComp works={works}></WorkTableComp>
                :
                <div className="text-center text-3xl my-5">No work found!</div>
            }
        </>
        // <table>
        //     <thead>
        //         <tr>
        //             <th>Task</th>
        //             <th>Hours Worked</th>
        //             <th>Date</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {
        //             works.length > 0 ?
        //             works.map((task, index) => (
        //                 <tr key={index}>
        //                     <td>{task.task}</td>
        //                     <td>{task.hoursWorked}</td>
        //                     <td>{task.date}</td>
        //                 </tr>
        //             ))
        //             :
        //             <div>No works found</div>
        //         }
        //     </tbody>
        // </table>
    );
};

export default WorkTable;