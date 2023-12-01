import useWorkSheet from '../../../Hooks/useWorkSheet';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useGetUser from '../../../Hooks/useGetUser';
import WorkTable from '../../../components/Work/WorkTable';
import Swal from 'sweetalert2';

const WorkSheet = () => {
    const [works, refetch, isPending] = useWorkSheet()
    const axiosPublic = useAxiosPublic()
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useGetUser()

    const handleFormSubmit = (values, { resetForm }) => {
        const adjustedDate = new Date(startDate).toLocaleString(); // Convert to local timezone
        console.log(startDate, adjustedDate);
        const newTask = {
            task: values.task,
            hoursWorked: values.hoursWorked,
            date: adjustedDate,
            currentDate: new Date().toLocaleDateString(),
            user: user
        };

        axiosPublic.post('/add-work', newTask)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Work added successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch();
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to add work',
                    text: 'Please try again.',
                });
            });

        resetForm();
    };


    return (
        <div className="min-h-screen">
            {/* Form Section */}
            <Formik
                initialValues={{
                    task: 'sales',
                    hoursWorked: 0,
                }}
                onSubmit={handleFormSubmit}
            >
                <Form className='flex flex-col md:flex-row md:items-center gap-2 mx-10 my-5'>
                    <label htmlFor="task">Tasks:</label>
                    <Field as="select" id="task" name="task">
                        <option value="sales">Sales</option>
                        <option value="support">Support</option>
                        <option value="content">Content</option>
                        <option value="paper-work">Paper-work</option>
                    </Field>

                    <label htmlFor="hoursWorked">Hours Worked:</label>
                    <Field type="number" id="hoursWorked" name="hoursWorked" />

                    <label htmlFor="date">Date:</label>
                    <DatePicker id="date" name="date" selected={startDate} onChange={(date) => setStartDate(date)} />

                    <button type="submit" className='btn btn-success rounded-lg'>Add </button>
                </Form>
            </Formik>

            {/* Table Section */}
            {
                isPending
                    ?
                    <span className='loading loading-spinner loading-lg'></span>
                    :
                    <WorkTable works={works}></WorkTable>
            }
        </div>
    );
};

export default WorkSheet;
