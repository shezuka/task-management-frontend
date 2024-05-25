"use client";

import React from "react";
import UsernamePasswordForm from "@/components/auth/UsernamePasswordForm";
import axios from "@/helpers/axios";
import { useRouter } from "next/navigation";

interface RegisterProps {}

const Register = (props: RegisterProps) => {
  const router = useRouter();

  const onSubmit = async (username: string, password: string) => {
    const resp = await axios.post("auth/register", { username, password });
    if (resp.status >= 300) {
      return resp;
    }
    router.push("/login");
  };

  return (
    <UsernamePasswordForm
      title="Register"
      submitButtonText="Register"
      onFormSubmit={onSubmit}
      oppositeLink={{
        href: "/login",
        label: "Login to an account",
      }}
    />
  );
};

export default Register;
