import AboutUs from "../../components/Home/AboutUs";
import Banner from "../../components/Home/Banner";
import Portfolio from "../../components/Home/Portfolio";
import Services from "../../components/Home/Services";
import Testimonials from "../../components/Home/Testimonials";

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <Services></Services>
            <Portfolio></Portfolio>
            <Testimonials></Testimonials>
        </>
    );
};

export default Home;