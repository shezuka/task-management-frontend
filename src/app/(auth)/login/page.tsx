import { Metadata } from "next";
import Login from "@/components/login/Login";

export const metadata: Metadata = {
  title: "Login | Task Manager",
};

interface LoginPageProps {}

const LoginPage = (props: LoginPageProps) => {
  return <Login />;
};

export default LoginPage;
