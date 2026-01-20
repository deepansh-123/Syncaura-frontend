import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const PasswordField = ({ register, handleFocus, handleBlur, passRef }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-start justify-center w-full gap-1 ">
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="w-full"
      >
        <div
          ref={passRef}
          className="bg-[#F8F8F8]  w-full px-4 py-2 flex items-center gap-2
          border border-transparent rounded-md transition-all duration-200"
        >
          <Lock className="text-black size-6" />

          <motion.input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]).+$/,
                message:
                  "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
              },
            })}
            onFocus={() => handleFocus(passRef)}
            onBlur={() => handleBlur(passRef)}
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="text-black text-sm placeholder:text-black bg-transparent outline-none w-full"
          />

          <motion.div
            onClick={() => setShowPassword((p) => !p)}
            whileTap={{ scale: 0.85 }}
            className="cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {showPassword ? (
                <motion.div
                  key="eye-off"
                  initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <EyeOff className="text-black size-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="eye-on"
                  initial={{ opacity: 0, rotate: 20, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -20, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Eye className="text-black size-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordField;
