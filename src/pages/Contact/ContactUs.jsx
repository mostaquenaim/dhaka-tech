// ContactUs.js

import React from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      message: '',
    },
    onSubmit: async (values) => {
        // Simulating an asynchronous operation, like an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        // Display success message using toast
        toast.success("Thanks for contacting us");
  
        // Reset the form after a successful submission
        formik.resetForm();
  
        console.log('Form submitted:', values);
        // You can add API calls or other logic to handle the form data
      },
  });

  return (
    <div className="container mx-auto mt-8 p-8 max-w-md bg-gray-100 my-10 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">✉ Contact Us</h1>
      <p className="mb-4">You can contact us using the form below:</p>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-600">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            rows="4"
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
          {formik.touched.message && formik.errors.message && (
            <div className="text-red-500 text-sm">{formik.errors.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Addresses:</h2>
        <p>1. 139/A, Uttara, Dhaka, Bangladesh</p>
        <p>2. 35, C, Dhanmondi, Dhaka, Bangladesh</p>
      </div>

    </div>
  );
};

export default ContactUs;
