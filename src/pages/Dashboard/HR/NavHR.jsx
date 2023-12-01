import { NavLink } from 'react-router-dom';

const NavHR = () => {
    return (
        <nav className="navbar">
            <ul className="flex">
                <li className="mr-6">
                    <NavLink className="btn btn-primary rounded-lg" to="/hr/employee-list">Employees</NavLink>
                </li>
                <li className="mr-6">
                    <NavLink className="btn btn-primary rounded-lg" to="/hr/progress">Work Progress</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavHR;