"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidationSchema } from "../utils/validationSchema";

interface AddUserModalProps {
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add User</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            phone: "",
            birthday: "",
            avatar: "",
            gender: "",
            role: "",
            skill: "",
            certification: "",
            bookingJob: "",
          }}
          validationSchema={registerValidationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const processedValues = {
              ...values,
              gender: values.gender === "true",
              skill: values.skill
                ? values.skill.split(",").map((s) => s.trim())
                : [],
              certification: values.certification
                ? values.certification.split(",").map((s) => s.trim())
                : [],
              bookingJob: values.bookingJob
                ? values.bookingJob.split(",").map((s) => s.trim())
                : [],
            };

            try {
              await onSubmit(processedValues);
              onClose();
            } catch (error: any) {
              setErrors({ email: error.message });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block font-semibold">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold">Phone</label>
                <Field
                  type="text"
                  name="phone"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold">Birthday</label>
                <Field
                  name="birthday"
                  type="date"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="birthday"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold">Avatar</label>
                <Field
                  type="text"
                  name="avatar"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="avatar"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Select Gender</option>
                  <option value="true">Male</option>
                  <option value="false">Female</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold">Role</label>
                <Field
                  type="text"
                  name="role"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold">
                  Skill (comma separated)
                </label>
                <Field
                  type="text"
                  name="skill"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="skill"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold">
                  Certification (comma separated)
                </label>
                <Field
                  type="text"
                  name="certification"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="certification"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold">
                  BookingJob (comma separated)
                </label>
                <Field
                  type="text"
                  name="bookingJob"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="bookingJob"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Add
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUserModal;
