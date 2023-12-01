import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useGetUser from "../../Hooks/useGetUser";
import { useNavigate } from "react-router-dom";


const CheckoutForm = ({ employee }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const { user } = useGetUser();
    const navigate = useNavigate();
    const [userPayments, setUserPayments] = useState([])

    const [months, setMonths] = useState([
        { value: 1, label: "January" },
        { value: 2, label: "February" },
        { value: 3, label: "March" },
        { value: 4, label: "April" },
        { value: 5, label: "May" },
        { value: 6, label: "June" },
        { value: 7, label: "July" },
        { value: 8, label: "August" },
        { value: 9, label: "September" },
        { value: 10, label: "October" },
        { value: 11, label: "November" },
        { value: 12, label: "December" },
      ]);
      
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 7 }, (_, index) => currentYear - 3 + index);



    const totalPrice = parseInt(employee.salary)
    // max = 999999

    useEffect(() => {
        if (totalPrice > 0) {
            axiosPublic.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosPublic, totalPrice])

    useEffect(() => {
        axiosPublic.get(`get-user-payment/${employee.email}`)
            .then(res => {
                console.log(res.data)
                setUserPayments(res.data)
            })
    }, [axiosPublic, employee])

    useEffect(() => {
        if (selectedMonth && selectedYear) {
            console.log(userPayments, "55", selectedMonth, selectedYear);
            const res = userPayments.filter((payment) => payment.month === parseInt(selectedMonth) && payment.year === parseInt(selectedYear))
            console.log(res, "57");
            res.length > 0 ? setError('You have paid for this month') : setError('')
        }
    }, [selectedMonth, selectedYear, userPayments])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    // email: user.email,
                    employee: employee,
                    paid: totalPrice,
                    transactionId: paymentIntent.id,
                    paid_at: new Date(),
                    month: selectedMonth,
                    year: selectedYear,
                }

                const res = await axiosPublic.post('/make-payment', payment);
                console.log('payment saved', res.data);
                // refetch();
                if (res.data._id) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Payment sent to ${employee.name}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                setTimeout(() => {
                    window.location.reload()
                }, 1000)

            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <div className="my-2">
                <label className=" text-sm font-medium text-gray-700">Salary: </label>
                {totalPrice} BDT
            </div>

            <div className="my-2">
                <label className="block text-sm font-medium text-gray-700">
                    Month
                </label>
                <select
                    className="mt-1 p-2 w-full border rounded-md"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="" disabled>Select a month</option>
                    {months.map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="my-2">
                <label className="block text-sm font-medium text-gray-700">
                    Year
                </label>
                <select
                    className="mt-1 p-2 w-full border rounded-md"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="" disabled>Select a year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <button disabled={!stripe || !clientSecret} className={`btn btn-sm btn-primary my-4 ${(!selectedMonth || !selectedYear || error) && 'btn-disabled'}`} type="submit" >
                Pay
            </button>

            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;