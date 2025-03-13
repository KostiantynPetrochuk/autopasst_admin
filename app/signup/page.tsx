"use client";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/Constants";
import React, { useRef } from "react";
import { signIn } from "next-auth/react";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const router = useRouter();
  const register = async () => {
    const res = await fetch(BACKEND_URL + "/auth/register", {
      method: "POST",
      body: JSON.stringify({
        // name: data.current.name,
        // email: data.current.email,
        // password: data.current.password,
        login: data.current.name,
        // email: data.current.email,
        pwd: data.current.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert("User Registered!");
    //
    // auto login after register and redirect
    const result = await signIn("credentials", {
      redirect: false,
      username: "test@gmail.com",
      password: "123",
    });

    if (result?.error) {
      // setError(result.error);
      alert("Login after register Failed!");
    } else {
      // Redirect or show success message
      router.push("/");
    }
  };
  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div>
      <div>Sign up</div>
    </div>
  );
};

export default SignupPage;
