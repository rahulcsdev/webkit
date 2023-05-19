"use client";
import { rem, px } from "@mantine/core";
import { gql } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { Manrope } from "next/font/google";
import { TextInput, Checkbox, Button, Group, Box, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";
import boy from "../../public/assets/boy.jpg";
import { useRouter } from "next/navigation";
import client from "../../apolloClient/index";
import { UserLogin} from "@/services";
const manrope = Manrope({ subsets: ["latin"] });


const Login = () => {
  const router = useRouter();


  const LoginUser = async (values: any) => {
    const { data } = await client.mutate({
      mutation: UserLogin,
      variables: {
        email: values.email,
        password: values.password,
      },
    });

    if (data?.authenticateUserWithPassword.message) {
      return alert("invalid credentials");
    }

    if (data?.authenticateUserWithPassword.item) {
      // localStorage.setItem('userToken',data.authenticateUserWithPassword.sessionToken)

      localStorage.setItem("userId", data.authenticateUserWithPassword.item.id);

      router.push("/home");
    }
    // console.log(data);
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length !== 0 ? null : "please enter password",
    },
  });

  return (
    <div className="h-full flex items-center  justify-center ">
      <div className="p-5  rounded-xl grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-1 w-[56%] h-2/3">
        <div className="form-box bg-[#5773FF] rounded-l-[18px] p-8 ">
          <form onSubmit={form.onSubmit((values) => LoginUser(values))}>
            <h2 className="text-white mb-4 text-[34px] font-semibold">
              {" "}
              Sign In{" "}
            </h2>
            <p className="text-white mb-8"> Login to stay connected </p>

            <div className="mb-6">
              <TextInput
                withAsterisk
                placeholder="Email"
                styles={(theme) => ({
                  input: {
                    padding: "22px !important",
                    borderRadius: "12px !important",
                  },
                })}
                {...form.getInputProps("email")}
              />
            </div>

            <div className="mb-8">
              <TextInput
                withAsterisk
                radius="md"
                className="rounded"
                placeholder="Password"
                type="password"
                styles={(theme) => ({
                  input: {
                    padding: "22px !important",
                    borderRadius: "12px !important",
                  },
                })}
                {...form.getInputProps("password")}
              />
            </div>

            <div className="flex mt-2">
              <input
                {...form.getInputProps("termsOfService", { type: "checkbox" })}
                id="checked-checkbox"
                type="checkbox"
                className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="checkbox text-white mb-2 -translate-y-1">
                {" "}
                Remember me{" "}
              </label>
            </div>

            <Group position="left" mt="md">
              <button
                type="submit"
                className="text-blue-600 bg-white px-4 py-2 rounded-[8px] text-sm hover:bg-violet-100"
              >
                {" "}
                Sign in{" "}
              </button>
            </Group>

            <h6 className="text-white mt-4"> create an Account Signup </h6>
          </form>
        </div>
        <div className="image-box rounded-r-[18px] bg-white flex items-center">
          <Image src={boy} alt="image" className={`h-80 w-full`} />
        </div>
      </div>
    </div>
  );
};

export default Login;
