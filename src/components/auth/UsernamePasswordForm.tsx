"use client";

import React, { FormEventHandler, useState } from "react";
import UsernamePasswordView from "@/components/auth/UsernamePasswordView";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, Divider } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

interface RegisterProps {
  title: string;
  submitButtonText: string;
  onFormSubmit: (username: string, password: string) => Promise<any>;
  oppositeLink?: {
    href: string;
    label: string;
  };
}

const UsernamePasswordForm = (props: RegisterProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);
    props
      .onFormSubmit(username, password)
      .then((resp) => {
        if (!resp || !resp.status) return;

        if (resp.status >= 400 && resp.status < 500) {
          if (resp.status === 400) {
            setErrors([resp.data]);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setErrors(["An error occurred. Please try again."]);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Card fullWidth>
      <CardHeader>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex w-full flex-row items-end">
            <h1 className="text-2xl flex-1">{props.title}</h1>
            {props.oppositeLink && (
              <Link as={NextLink} href={props.oppositeLink.href}>
                {props.oppositeLink.label}
              </Link>
            )}
          </div>
          {errors.map((it) => (
            <p key={it} className="text-danger">
              {it}
            </p>
          ))}
        </div>
      </CardHeader>
      <Divider />
      <form onSubmit={onSubmit}>
        <CardBody>
          <UsernamePasswordView
            onUsernameChange={(e) => setUsername(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
          />
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            type="submit"
            color="primary"
            isDisabled={!username || !password || submitting}
            fullWidth
            size="lg"
          >
            {props.submitButtonText}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UsernamePasswordForm;
