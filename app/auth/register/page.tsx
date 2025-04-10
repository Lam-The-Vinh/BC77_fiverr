"use client";

import React from "react";
import AuthForm from "../../component/AuthForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { signUp } from "../../redux/slices/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = async (values: any) => {
    try {
      await dispatch(signUp(values)).unwrap();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm mode="register" onSubmit={handleRegister} />;
    </div>
  );
}
