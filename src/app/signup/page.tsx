/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/utils";

const SignUp = () => {
  const signUpHandler = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!name || !email || !password) {
      throw new Error("Please Fill All Fields");
    }

    //Connect To Database

    await connectDB();

    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    redirect("/login");
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signUpHandler} className="flex flex-col gap-4">
            <Input placeholder="Name" name="name" />
            <Input placeholder="Email" type="email" name="email" />
            <Input placeholder="Password" type="password" name="password" />
            <Button type="submit">Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>OR</span>
          <form>
            <Button type="submit" variant={"outline"}>
              Sign in with Google
            </Button>
          </form>
          <Link href={"/login"} className="mt-2">
            Already have an account? Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
