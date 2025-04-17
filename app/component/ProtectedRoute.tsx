"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { showWarning } from "../utils/toastHelper";

interface ProtectedRouteProps {
  requiredRole: string;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  children,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (!user) {
        router.push("/");
        showWarning("You do not have permission to access this page.");
      } else if (user.role !== requiredRole) {
        router.push("/");
        showWarning("You do not have the required role to access this page.");
      }
    }
  }, [isClient, user, requiredRole, router]);

  if (!isClient || !user || user.role !== requiredRole) return null;

  return <>{children}</>;
};
