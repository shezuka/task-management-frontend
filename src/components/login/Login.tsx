"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "@/helpers/axios";
import UsernamePasswordForm from "@/components/auth/UsernamePasswordForm";
import { saveAuthToken } from "@/helpers/token";

interface LoginProps {}

const Login = (props: LoginProps) => {
  const router = useRouter();

  const onSubmit = async (username: string, password: string) => {
    const resp = await axios.post("auth/login", { username, password });
    if (resp.status === 200) {
      saveAuthToken(resp.data.token);
      router.push("/tasks");
      return;
    }

    if (resp.status >= 300) {
      return resp;
    }
  };

  return (
    <UsernamePasswordForm
      title="Login"
      submitButtonText="Login"
      onFormSubmit={onSubmit}
      oppositeLink={{
        href: "/register",
        label: "Create account",
      }}
    />
  );
};

export default Login;
