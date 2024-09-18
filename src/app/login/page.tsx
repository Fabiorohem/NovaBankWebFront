"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomInput from "@/components/input";
import PersonIcon from "@/assets/icons/Profile.png";
import KeyLockIcon from "@/assets/icons/keyLock.png";
import Logo from "@/assets/images/logo.png";
import Apresentation from "@/components/apresentation";
import Button from "@/components/button";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, "Username must be at least 4 characters long")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const LoginPage: React.FC = () => {
  const router = useRouter();
  const handleSubmit = (values: any) => {
    console.log(values);
    router.push("/main");
  };

  return (
    <div className="min-h-screen w-full bg-[#151515] flex">
      <div className="hidden lg:block lg:w-3/5">
        <Apresentation />
      </div>
      <article className="flex flex-col gap-y-4 items-center justify-center w-full lg:w-2/5 bg-[#151515]">
        <div className="max-w-[20%]">
          <Image src={Logo} alt="Logo" priority />
        </div>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="flex flex-col gap-y-2 w-[80%] md:max-w-md lg:max-w-auto">
              <h2 className="text-sm text-left text-[#8A8A8A]">
                Use os campos para efetuar o login:
              </h2>
              <div className="flex flex-col gap-y-1">
                <CustomInput
                  name="username"
                  imageSrc={PersonIcon}
                  imageAlt="User Icon"
                  placeholder="Username"
                  ariaLabel="username"
                  required
                />
                <CustomInput
                  name="password"
                  imageSrc={KeyLockIcon}
                  imageAlt="Lock Icon"
                  type="password"
                  placeholder="Password"
                  ariaLabel="password"
                  required
                />
              </div>

              <div className="flex items-end justify-end -mt-[20px] mb-10">
                <div>
                  <span className="text-xs mr-2 text-right text-white">
                    Esqueceu a senha?
                  </span>
                  <a className="text-[#A644CB]" href="#">
                    Clique aqui!
                  </a>
                </div>
              </div>
              <Button
                type="submit"
                text="Login"
                color="bg-[#A644CB]"
                hoverColor="hover:bg-[#8E38A6]"
                disabled={false}
              />
            </Form>
          )}
        </Formik>
      </article>
    </div>
  );
};

export default LoginPage;
