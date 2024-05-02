import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./models/userModel";
import bcrypt from "bcryptjs";
import { connectDB } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin({
            cause: "Please Provide All Details",
          });
        }

        //Connection to Database

        await connectDB();

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new CredentialsSignin({
            cause: "Invalid Email or Password",
          });
        }

        if (!user.password) {
          throw new CredentialsSignin({
            cause: "Invalid Email or Password",
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new CredentialsSignin({
            cause: "Invalid Email or Password",
          });
        }

        return { name: user.name, email: user.email, id: user._id };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
