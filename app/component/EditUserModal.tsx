"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { editValidationSchema } from "../utils/validationSchema";

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <Formik
          initialValues={{
            name: user.name || "",
            email: user.email || "",
            password: "",
            phone: user.phone || "",
            birthday: user.birthday || "",
            gender: user.gender ? "true" : "false",
            role: user.role || "",
            skill: (user.skill || []).join(", "),
            certification: (user.certification || []).join(", "),
            bookingJob: (user.bookingJob || []).join(", "),
          }}
          validationSchema={editValidationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const processedValues = {
              ...values,
              gender: values.gender === "true",
              ...(values.password ? { password: values.password } : {}),
              skill: values.skill
                ? values.skill
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter((s: string) => s !== "")
                : [],
              certification: values.certification
                ? values.certification
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter((s: string) => s !== "")
                : [],
              bookingJob: values.bookingJob
                ? values.bookingJob
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter((s: string) => s !== "")
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
                <label className="block" htmlFor="name">
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block">
                  Password (leave blank to keep unchanged)
                </label>
                <Field
                  name="password"
                  type="password"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block" htmlFor="phone">
                  Phone
                </label>
                <Field
                  name="phone"
                  type="text"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block" htmlFor="birthday">
                  Birthday
                </label>
                <Field
                  name="birthday"
                  type="date"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="birthday"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block" htmlFor="gender">
                  Gender
                </label>
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
                <label className="block" htmlFor="role">
                  Role
                </label>
                <Field
                  name="role"
                  type="text"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block" htmlFor="skill">
                  Skill (comma separated)
                </label>
                <Field
                  name="skill"
                  type="text"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="skill"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block" htmlFor="certification">
                  Certification (comma separated)
                </label>
                <Field
                  name="certification"
                  type="text"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage
                  name="certification"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block" htmlFor="bookingJob">
                  BookingJob (comma separated)
                </label>
                <Field
                  name="bookingJob"
                  type="text"
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
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditUserModal;
