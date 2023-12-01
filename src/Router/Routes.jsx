import { createBrowserRouter } from "react-router-dom";
import ErrorElement from "../pages/404/ErrorElement";
import Root from "../Root/Root";
import Base from "../Base/Base";
import Home from "../pages/Home/Home";
import Login from "../pages/LoginAndRegister/Login";
import ContactUs from "../pages/Contact/ContactUs";
import Register from "../pages/LoginAndRegister/Register";
import DashboardComp from "../pages/Dashboard/DashboardComp";
import PrivateRouteComp from "./PrivateRouteComp";
import AllEmployeeList from "../pages/Dashboard/Admin/AllEmployeeList";
import PrivateAdminRoute from "./PrivateAdminRoute";
import PrivateEmployeeRoute from "./PrivateEmployeeRoute";
import PaymentHistory from "../pages/Dashboard/Employee/PaymentHistory";
import EmployeeDashboard from "../pages/Dashboard/Employee/EmployeeDashboard";
import WorkSheet from "../pages/Dashboard/Employee/WorkSheet";
import HRDashboard from "../pages/Dashboard/HR/HRDashboard";
import EmployeeList from "../pages/Dashboard/HR/EmployeeList";
import WorkProgress from "../pages/Dashboard/HR/WorkProgress";
import PrivateHRRouter from "./PrivateHRRouter";
import EmployeeDetails from "../pages/Dashboard/Employee/EmployeeDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: '/',
                element: <Base></Base>,
                children: [
                    {
                        path: '/',
                        element: <Home></Home>,
                    },
                    {
                        path: '/contact',
                        element: <ContactUs></ContactUs>
                    },
                    {
                        path: '/dashboard',
                        element: <PrivateRouteComp><DashboardComp></DashboardComp></PrivateRouteComp>
                    },
                    {
                        path: '/all-employee-list',
                        element: <PrivateRouteComp>
                            <PrivateAdminRoute>
                                <AllEmployeeList></AllEmployeeList>
                            </PrivateAdminRoute>
                        </PrivateRouteComp>
                        // loader: () => fetch(`https://dhaka-tech-backend.vercel.app/get-all-employees`)
                    },
                    {
                        path: '/employee',
                        element: <EmployeeDashboard></EmployeeDashboard>,
                        children: [
                            {
                                path: '/employee/payment-history',
                                element: <PrivateRouteComp>
                                    <PrivateEmployeeRoute>
                                        <PaymentHistory></PaymentHistory>
                                    </PrivateEmployeeRoute>
                                </PrivateRouteComp>,
                            },
                            {
                                path: '/employee/work-sheet',
                                element: <PrivateRouteComp>
                                    <PrivateEmployeeRoute>
                                        <WorkSheet></WorkSheet>
                                    </PrivateEmployeeRoute>
                                </PrivateRouteComp>
                            },
                        ]
                    },
                    {
                        path: '/hr',
                        element: <HRDashboard></HRDashboard>,
                        children: [
                            {
                                path: '/hr/employee-list',
                                element: <PrivateRouteComp>
                                    <PrivateHRRouter>
                                        <EmployeeList></EmployeeList>
                                    </PrivateHRRouter>
                                </PrivateRouteComp>
                            },
                            {
                                path: '/hr/progress',
                                element: <PrivateRouteComp>
                                    <PrivateHRRouter>
                                        <WorkProgress></WorkProgress>
                                    </PrivateHRRouter>
                                </PrivateRouteComp>
                            },
                            {
                                path: '/hr/emp/details/:email',
                                element: <PrivateRouteComp>
                                    <PrivateHRRouter>
                                        <EmployeeDetails></EmployeeDetails>
                                    </PrivateHRRouter>
                                </PrivateRouteComp>,
                                loader: ({params})=> fetch(`https://dhaka-tech-backend.vercel.app/get-user/${params.email}`)
                            },
                        ]
                    },


                ],
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            }

        ]
    }
]);

export default router;