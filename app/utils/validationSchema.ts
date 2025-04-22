import * as Yup from "yup";

const phoneRegExp =
  /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])\d{7}$/;

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(8, "Name must be at most 8 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  birthday: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Birthday must be in format YYYY-MM-DD")
    .required("Birthday is required"),
  gender: Yup.string()
    .oneOf(["true", "false"], "Select a valid gender")
    .required("Gender is required"),
  role: Yup.string().nullable(),
  skill: Yup.array()
    .of(Yup.string())
    .transform((value, originalValue) =>
      typeof originalValue === "string"
        ? originalValue
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "")
        : value
    ),
  certification: Yup.array()
    .of(Yup.string())
    .transform((value, originalValue) =>
      typeof originalValue === "string"
        ? originalValue
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "")
        : value
    ),
  bookingJob: Yup.array()
    .of(Yup.string())
    .transform((value, originalValue) =>
      typeof originalValue === "string"
        ? originalValue
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "")
        : value
    ),
});

export const editValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  birthday: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Birthday must be in format YYYY-MM-DD")
    .required("Birthday is required"),
  gender: Yup.string()
    .oneOf(["true", "false"], "Select a valid gender")
    .required("Gender is required"),
  role: Yup.string().nullable(),
  skill: Yup.string(),
  certification: Yup.string(),
  bookingJob: Yup.string(),
});

export const jobFormValidationSchema = Yup.object({
  maCongViec: Yup.string().required("Mã Công Việc is required"),
  maNguoiThue: Yup.string().required("Mã Người Thuê is required"),
  hoanThanh: Yup.boolean().required("Hoàn Thành is required"),
});
