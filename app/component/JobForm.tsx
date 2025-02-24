import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { jobFormValidationSchema } from "../utils/validationSchema";

export interface JobFormValues {
  jobId: string;
  renterId: string;
  renterDate: string;
  completed: boolean;
}

interface JobFormProps {
  initialValues: JobFormValues;
  onSubmit: (values: JobFormValues) => void;
  onCancel: () => void;
}

const JobForm: React.FC<JobFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={jobFormValidationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ isSubmitting, values }) => (
        <Form className="space-y-4">
          <div>
            <label
              htmlFor="jobId"
              className="block text-sm font-medium text-gray-700"
            >
              Job ID
            </label>
            <Field
              name="jobId"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage
              name="jobId"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="renterId"
              className="block text-sm font-medium text-gray-700"
            >
              Renter ID
            </label>
            <Field
              name="renterId"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage
              name="renterId"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="renterDate"
              className="block text-sm font-medium text-gray-700"
            >
              Renter Date
            </label>
            <Field
              name="renterDate"
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage
              name="renterDate"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="completed"
              className="block text-sm font-medium text-gray-700"
            >
              Completed
            </label>
            <div className="mt-1 flex items-center">
              <Field name="completed" type="checkbox" className="mr-2" />
              <span>{values.completed ? "Yes" : "No"}</span>
            </div>
            <ErrorMessage
              name="completed"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default JobForm;
