"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/helpers/axios";
import { getAuthToken } from "@/helpers/token";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

const AuthenticatedLayout = (props: AuthenticatedLayoutProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const checkToken = async () => {
      return axios
        .get("auth/check")
        .then((resp) => {
          if (resp.status === 401) router.push("/login");
          return resp;
        })
        .catch((err) => {
          console.error(err);
          router.push("/login");
          throw err;
        });
    };

    checkToken()
      .then((resp) => {
        if (resp.status === 200) setIsLoading(false);
      })
      .catch((err) => {});

    const inst = setInterval(checkToken, 5000);
    return () => {
      clearInterval(inst);
    };
  }, []);

  if (isLoading) return null;
  return props.children;
};

export default AuthenticatedLayout;
