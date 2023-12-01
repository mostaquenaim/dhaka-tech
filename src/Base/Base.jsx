import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavbarComp from '../components/Header/NavbarComp';
import FooterComp from '../components/Footer/FooterComp';

const Base = () => {

    return (
        <>
            <NavbarComp ></NavbarComp>
            <Outlet ></Outlet>
            <FooterComp></FooterComp>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default Base;