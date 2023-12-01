import React from 'react';
import { NavLink } from 'react-router-dom';

const NavEmployee = () => {
    return (
        <nav className="navbar">
            <ul className="flex">
                <li className="mr-6">
                    <NavLink className="btn btn-primary rounded-lg" to="/employee/payment-history">Payment History</NavLink>
                </li>
                <li className="mr-6">
                    <NavLink className="btn btn-primary rounded-lg" to="/employee/work-sheet">Work Sheet</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavEmployee;