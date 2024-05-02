"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export interface Login {
  email: string;
  password: string;
}

const loginHandler = async ({ email, password }: Login) => {
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};

export { loginHandler };
