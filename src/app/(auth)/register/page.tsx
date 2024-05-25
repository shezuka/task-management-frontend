import React from "react";
import { Metadata } from "next";
import Register from "@/components/register/Register";

export const metadata: Metadata = {
  title: "Register | Task Manager",
};

interface RegisterPageProps {}

const RegisterPage = (props: RegisterPageProps) => {
  return <Register />;
};

export default RegisterPage;
