"use client";

import React, { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";

interface ProvidersProps {
  children?: ReactNode;
}

const Providers = (props: ProvidersProps) => {
  return <NextUIProvider>{props.children}</NextUIProvider>;
};

export default Providers;
