"use client";

import React from "react";
import AuthForm from "../../component/AuthForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { signUp } from "../../redux/slices/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = async (values: any) => {
    const resultAction = await dispatch(signUp(values));

    if (signUp.rejected.match(resultAction)) {
      throw new Error(resultAction.payload as string);
    }
    return resultAction.payload;
  };

  return <AuthForm mode="register" onSubmit={handleRegister} />;
}
