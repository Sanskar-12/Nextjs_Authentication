"use client";

import React from "react";
import { toast } from "sonner";
import { loginHandler } from "../server/loginHandler";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();

  return (
    <form
      action={async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
          return toast("Please Fill All Fields");
        }

        const toastId = toast.loading("Logging In");

        const error = await loginHandler({ email, password });

        if (!error) {
          toast.success("Logged In Successfully", {
            id: toastId,
          });
          router.push("/");
        } else {
          return toast.error(String(error), {
            id: toastId,
          });
        }
      }}
      className="flex flex-col gap-4"
    >
      <Input placeholder="Email" type="email" name="email" />
      <Input placeholder="Password" type="password" name="password" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default Form;
