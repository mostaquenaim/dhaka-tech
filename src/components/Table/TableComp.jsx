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

export default function TableComp({ emp, handleVerification, openModal }) {
    console.log(emp);
    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: "Verification",
            selector: (row) => <button onClick={() => handleVerification(row)}>
                {
                    row.isVerified ?
                        <TiTick className="bg-green-400 hover:bg-green-300 rounded-lg p-1 text-4xl"></TiTick>
                        :
                        <ImCross className="bg-red-400 hover:bg-red-300 rounded-lg p-3 text-4xl"></ImCross>
                }
            </button>,
            sortable: true
        },
        {
            name: "Bank Account No.",
            selector: (row) => row.bank_account_no,
            sortable: true
        },
        {
            name: "Salary",
            selector: (row) => row.salary,
            sortable: true
        },
        {
            name: <span className="text-center w-full">Actions</span>,
            selector: (row) => <td className="flex gap-5 justify-center">
                <span>
                    <button onClick={() => openModal(row)} className={`btn btn-primary rounded-lg border-2 ${!row.isVerified && 'btn-disabled'}`}>pay</button>
                </span>
                <Link to={`/hr/emp/details/${row.email}`}>
                    <button className="btn btn-success rounded-lg border-2">details</button>
                </Link>
            </td>,
            sortable: true
        },
    ];

    const playerSummary = [
        ...emp
    ];

    const handleRowClicked = (row) => {
        console.log(row.PlayerName);
    };

    return (
        <div className="App">
            <DataTable
                title="Employee List"
                columns={columns}
                data={playerSummary}
                defaultSortFieldId
                pagination={5}
                onRowClicked={handleRowClicked}
                highlightOnHover
            />
        </div>
    );
}
