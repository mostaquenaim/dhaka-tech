import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Heading from "../Header/Heading";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = ({employee, paymentDate}) => {
    return (
        <div className="">
            <Heading title="Payment" ></Heading>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm employee={employee}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;