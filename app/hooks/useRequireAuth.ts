"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useRequireAuth = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  return () => {
    if (!user) {
      router.push(`/auth/login`);
      return false;
    }
    return true;
  };
};
