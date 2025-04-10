"use client";
import React, { useState } from "react";
import AuthForm from "../../component/AuthForm";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (values: any) => {
    try {
      await dispatch(signIn(values)).unwrap();
    } catch (error: any) {
       throw new Error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm mode="login" onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
