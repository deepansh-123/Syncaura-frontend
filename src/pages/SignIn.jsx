import { Loader, Mail } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SocialAuthButton from "../components/auth/SocialAuthButton";
import { motion } from "framer-motion";
import PasswordField from "../components/auth/PasswordField";
import { Link } from "react-router-dom";
import AnimatedInput from "../components/auth/AnimatedInput";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting]=useState(false)
  
  const wrapperRef = useRef(null);
  const passRef = useRef(null);
  const socialProviders = [
    {
      id: "google",
      icon: "/images/Auth/google.png",
      alt: "Google login",
      onClick: () => console.log("Google Login"),
    },
    {
      id: "github",
      icon: "/images/Auth/github.png",
      alt: "GitHub login",
      onClick: () => console.log("GitHub Login"),
    },
    {
      id: "facebook",
      icon: "/images/Auth/facebook.png",
      alt: "Facebook login",
      onClick: () => console.log("Facebook Login"),
    },
  ];

  const handleFocus = (ref) => {
    ref.current?.classList.add(
      "border-[#01509C]",
      "ring-2",
      "ring-[#01509C]/30"
    );
  };
  const handleBlur = (ref) => {
    ref.current?.classList.remove(
      "border-[#01509C]",
      "ring-2",
      "ring-[#01509C]/30"
    );
  };
  const onSubmit = (data) => {
   setIsSubmitting(true);
   setTimeout(()=>{
     console.log(data);
     setIsSubmitting(false)
   }, [1000])
  };
  const onError = (error) => {
    console.log(error);
  };
  return (
    <div
      class="bg-[radial-gradient(ellipse_60%_70%_at_center,#4a9df0_0%,#01509C_65%,#013b73_100%)]
 w-full min-h-screen flex items-center justify-center overflow-hidden  "
    >
      <motion.div
      className="relative flex items-center justify-center w-[90%] md:w-[80%] lg:w-3/4 2xl:w-1/2"
      
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, duration: 1 }}

  
    >
        <div
          className="absolute -bottom-5 -right-6 md:-bottom-11 md:-right-11 z-20 size-20 md:size-25 rounded-full bg-linear-to-bl 
 from-[#868686] to-[#ECECEC]"
        />
        <div
          className="absolute -top-5 -left-6 md:-top-11 md:-left-11 z-20 size-20 md:size-25 rounded-full bg-linear-to-bl 
 from-[#0050FF] to-[#0040CC]"
        />
        <div className="rounded-4xl lg:rounded-r-none z-80 py-5 xl:py-15 px-10 xl:px-20 pr-5 xl:pr-15  w-full bg-[#ECECEC] flex flex-col items-center justify-center">
          <h1 className="text-[#000000] text-2xl font-bold">Welcome Back</h1>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-4 w-full mt-10"
          >
            <div className="relative flex flex-col items-start justify-center gap-1.5 ">
              <label className="text-[#000000] text-base font-medium">
                Email Address
              </label>
              <div className="flex flex-col items-start justify-center w-full gap-1 ">
                <AnimatedInput
  type="email"
  placeholder="Email"
  iconType="mail"
  register={register}
  wrapperRef={wrapperRef}
  handleFocus={handleFocus}
  handleBlur={handleBlur}
/>

              </div>
            </div>

            <div className="relative flex flex-col items-start justify-center w-full gap-1.5 ">
              <label className="text-[#000000] text-base font-medium">
                Password
              </label>
              <div className="flex flex-col items-start justify-center w-full gap-1 ">
                <PasswordField
                  register={register}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  passRef={passRef}
                />
                <div className="flex items-center justify-end w-full ">
                  <p className="text-sm text-blue-500 hover:underline transition-all duration-500 cursor-pointer font-semibold">
                    Forgot Password?
                  </p>
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 12px 25px rgba(0,0,0,0.25)",
              }}
              whileTap={{
                scale: 0.95,
                boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="relative flex items-start justify-center w-full rounded-md bg-[#2457C5] py-2 px-3"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ y: -1 }}
                whileTap={{ y: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="text-[#F8F8F8] font-bold text-lg"
              >
               {isSubmitting ? <Loader className="size-5 text-white animate-spin" /> : " Sign In"}
              </motion.button>
            </motion.div>
            <div className="flex relative items-center justify-center w-full top-2 ">
              <span className="h-0.5 bg-black  w-full" />
              <h1 className="absolute -top-2.5  bg-[#ECECEC] px-2 text-black text-sm font-bold flex-1/3">
                Or continue with
              </h1>
            </div>
            <div className="flex items-center justify-center w-full gap-4 mt-8 ">
              {socialProviders.map((provider) => (
                <SocialAuthButton
                  key={provider.id}
                  icon={provider.icon}
                  alt={provider.alt}
                  onClick={provider.onClick}
                />
              ))}
            </div>
            <div className="flex items-center justify-center w-full gap-1 ">
              <span className="text-[#000000] text-base font-semibold">
                Don’t have an account?{" "}
              </span>
              <Link
                to={"/sign-up"}
                className="flex items-center justify-center"
              >
                <span className="text-blue-500 hover:underline text-xl font-semibold">
                  {" "}
                  Sign Up
                </span>
              </Link>
            </div>
          </form>
        </div>
        <div className=" rounded-r-4xl relative z-100  w-full px-7 py-23.5 bg-[#2461E6] hidden lg:flex flex-col items-center justify-center">
          <div className="bg-[#FFFFFF21] border border-[#7B9CE282] h-75 xl:h-95 w-2/3 rounded-4xl" />
          <div className="absolute z-60 -left-20 xl:-top-5 -top-7">
            <img
              src="/images/Auth/loginHuman.png"
              alt=""
              className="object-fill scale-100"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
