"use client"

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface NewsletterFormValues {
  email: string;
}

const NewsletterFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
});

 const NewsletterForm: React.FC = () => {
  const initialValues: NewsletterFormValues = { email: "" };

  const handleSubmit = async (values: NewsletterFormValues, { resetForm }: any) => {
    // Submit newsletter form here
    resetForm();
  };

  return (
    <div className="max-w-md mx-auto">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={NewsletterFormSchema}>
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-2" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Subscribe"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};


export default NewsletterForm