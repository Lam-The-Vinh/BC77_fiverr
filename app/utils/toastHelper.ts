
import { toast, ToastOptions, TypeOptions, Id } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showToast = (
  message: string,
  type: TypeOptions = "default",
  options: ToastOptions = {}
) => {
  toast(message, { ...defaultOptions, ...options, type });
};

export const showSuccess = (message: string, options?: ToastOptions) => {
  showToast(message, "success", options);
};

export const showError = (message: string, options?: ToastOptions) => {
  showToast(message, "error", options);
};

export const showInfo = (message: string, options?: ToastOptions) => {
  showToast(message, "info", options);
};

export const showWarning = (message: string, options?: ToastOptions) => {
  showToast(message, "warning", options);
};

export const showLoading = (message: string): Id => {
  return toast.loading(message, { position: "top-right" });
};

export const dismissToast = (id?: Id) => {
  toast.dismiss(id);
};
