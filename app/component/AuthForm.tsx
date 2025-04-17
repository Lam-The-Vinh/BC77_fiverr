"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../utils/validationSchema";

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const router = useRouter();

  const initialValues =
    mode === "login"
      ? {
          email: "",
          password: "",
        }
      : {
          name: "",
          email: "",
          password: "",
          phone: "",
          birthday: "",
          gender: "",
          role: "USER",
          skill: "",
          certification: "",
          bookingJob: "",
        };

  const validationSchema =
    mode === "login" ? loginValidationSchema : registerValidationSchema;

  return (
    <div className="max-w-md my-48 container p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {mode === "login" ? "Login" : "Register"}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (
          values: any,
          { setSubmitting, setErrors, setStatus }: FormikHelpers<any>
        ) => {
          const processedValues = {
            ...values,
            gender: values.gender === "true",
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
            router.push("/");
          } catch (error: any) {
            setStatus(error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status, setStatus }) => (
          <Form
            onFocusCapture={() => {
              if (status) setStatus("");
            }}
            className="flex flex-col space-y-4"
          >
            {status && (
              <div className="text-red-500 text-center text-sm">{status}</div>
            )}

            {mode === "register" && (
              <div>
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="border p-2 w-full rounded"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {mode === "register" && (
              <>
                <div>
                  <label htmlFor="phone" className="block font-medium">
                    Phone
                  </label>
                  <Field
                    name="phone"
                    type="text"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="birthday" className="block font-medium">
                    Birthday (YYYY-MM-DD)
                  </label>
                  <Field
                    name="birthday"
                    type="date"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="birthday"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block font-medium">
                    Gender
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    className="border p-2 w-full rounded"
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
                  <label htmlFor="skill" className="block font-medium">
                    Skill (comma separated)
                  </label>
                  <Field
                    name="skill"
                    type="text"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="skill"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="certification" className="block font-medium">
                    Certification (comma separated)
                  </label>
                  <Field
                    name="certification"
                    type="text"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="certification"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="bookingJob" className="block font-medium">
                    Booking Job (comma separated)
                  </label>
                  <Field
                    name="bookingJob"
                    type="text"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="bookingJob"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              {mode === "login" ? "Login" : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
