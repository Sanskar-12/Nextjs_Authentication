/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Form from "@/components/client/Form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await auth();

  if (session?.user) redirect("/");

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>OR</span>
          <form>
            <Button type="submit" variant={"outline"}>
              Sign in with Google
            </Button>
          </form>
          <Link href={"/signup"} className="mt-2">
            Don't have an account? SignUp
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
