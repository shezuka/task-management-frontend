import React, { ChangeEventHandler } from "react";
import { Input } from "@nextui-org/input";

interface UsernamePasswordViewProps {
  onUsernameChange?: ChangeEventHandler<HTMLInputElement>;
  onPasswordChange?: ChangeEventHandler<HTMLInputElement>;
}

const UsernamePasswordView = (props: UsernamePasswordViewProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Input
        name="username"
        label="Username"
        onChange={props.onUsernameChange}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        onChange={props.onPasswordChange}
      />
    </div>
  );
};

export default UsernamePasswordView;
