import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children?: ReactNode;
}

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full px-4 md:px-10 lg:px-0 lg:max-w-[600px]">
        {props.children}
      </div>
    </div>
  );
};

export default AuthLayout;
