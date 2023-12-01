import DataTable, { createTheme } from "react-data-table-component";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

createTheme("solarized", {
    text: {
        primary: "#268bd2",
        secondary: "#2aa198"
    },
    background: {
        default: "#002b36"
    },
    context: {
        background: "#cb4b16",
        text: "#FFFFFF"
    },
    divider: {
        default: "#073642"
    },
    action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)"
    }
});

export default function WorkTableComp({ works }) { 
    const columns = [
        {
          name: "Tasks",
          selector: (row) => row.task,
        //   sortable: true,
        },
        {
          name: "Hours Worked",
          selector: (row) => row.hoursWorked,
        //   sortable: true,
        },
        {
          name: "Date",
          selector: (row) => {
            const dateObj = new Date(row.date);
            const day = dateObj.getUTCDate();
            const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(dateObj);
            const year = dateObj.getUTCFullYear();
            
            return `${day} ${month}, ${year}`;
          },
        //   sortable: true,
        },
      ];
      
      

    const playerSummary = [
        ...works
    ];

    const handleRowClicked = (row) => {
        console.log(row.PlayerName);
    };

    return (
        <div className="App">
            <DataTable
                title="Employee Works"
                columns={columns}
                data={playerSummary}
                // defaultSortFieldId
                pagination={5}
                onRowClicked={handleRowClicked}
                highlightOnHover
            />
        </div>
    );
}
