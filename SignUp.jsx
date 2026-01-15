import { Loader, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

const SocialAuthButton = ({ icon, alt, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="bg-white rounded-full p-2.5 shadow-sm hover:shadow-md transition-all w-10 h-10 flex items-center justify-center"
  >
    <img src={icon} alt={alt} className="w-5 h-5 object-contain" />
  </motion.button>
);

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });

  const socialProviders = [
    {
      id: "google",
      icon: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg",
      alt: "Google",
    },
    {
      id: "github",
      icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      alt: "GitHub",
    },
    {
      id: "facebook",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      alt: "Facebook",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar
    };
  };

  const validateField = (field) => {
    const newErrors = { ...errors };

    switch (field) {
      case "fullName":
        if (!formData.fullName.trim()) {
          newErrors.fullName = "Full name is required";
        } else if (formData.fullName.trim().length < 2) {
          newErrors.fullName = "Full name must be at least 2 characters";
        } else {
          delete newErrors.fullName;
        }
        break;

      case "email":
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else {
          const passwordValidation = validatePassword(formData.password);
          if (!passwordValidation.isValid) {
            newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
          } else {
            delete newErrors.password;
          }
        }
        break;

      case "confirmPassword":
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true
    });
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted successfully:", {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role
      });
      
      alert("Account created successfully!");
      
      setIsSubmitting(false);
      
      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user"
      });
      setErrors({});
      setTouched({});
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} Login clicked`);
    // Here you would integrate with actual OAuth providers
    alert(`${provider} login coming soon!`);
  };

  return (
    <div className="bg-[radial-gradient(ellipse_60%_70%_at_center,#4a9df0_0%,#01509C_65%,#013b73_100%)] w-full min-h-screen flex items-center justify-center overflow-hidden p-4">
      <motion.div
        className="relative flex items-center justify-center w-[90%] md:w-[80%] lg:w-3/4 2xl:w-1/2"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, duration: 1 }}
      >
        {/* Decorative circles */}
        <div className="absolute -bottom-5 -right-6 md:-bottom-11 md:-right-11 z-20 size-20 md:size-25 rounded-full bg-gradient-to-bl from-[#868686] to-[#ECECEC]" />
        <div className="absolute -top-5 -left-6 md:-top-11 md:-left-11 z-20 size-20 md:size-25 rounded-full bg-gradient-to-bl from-[#0050FF] to-[#0040CC]" />
        
        <div className="relative flex items-stretch max-w-6xl w-full shadow-2xl rounded-3xl overflow-hidden">
          {/* Left side - Illustration */}
          <div className="rounded-l-4xl relative z-100 w-full px-7 py-23.5 bg-[white] hidden lg:flex flex-col items-center justify-center">
            <div className="bg-[#ECECEC] border border-[#7B9CE282] h-30 xl:h-120 w-2/3 rounded-4xl" />
            <div className="absolute">
              <img
                src="/images/Auth/loginHuman.png"
                alt=""
                className="object-fill scale-160"
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="rounded-r-4xl lg:rounded-r-none z-80 py-5 xl:py-10 px-10 xl:px-20 pr-5 xl:pr-15 w-full bg-[#2461E6] flex flex-col items-center justify-center">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-2xl font-bold text-white mb-8 text-center">Create Account</h1>
              
              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      onBlur={() => handleBlur("fullName")}
                      className={`w-full pl-10 pr-4 py-2.5 bg-white text-gray-900 border rounded-lg text-sm focus:outline-none focus:ring-1 transition-colors ${
                        errors.fullName && touched.fullName
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500" 
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                  </div>
                  {errors.fullName && touched.fullName && (
                    <p className="text-red-200 text-xs mt-1 ml-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className={`w-full pl-10 pr-4 py-2.5 bg-white text-gray-900 border rounded-lg text-sm focus:outline-none focus:ring-1 transition-colors ${
                        errors.email && touched.email
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500" 
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="text-red-200 text-xs mt-1 ml-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      onBlur={() => handleBlur("password")}
                      className={`w-full pl-10 pr-10 py-2.5 bg-white text-gray-900 border rounded-lg text-sm focus:outline-none focus:ring-1 transition-colors ${
                        errors.password && touched.password
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500" 
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-200 text-xs mt-1 ml-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      onBlur={() => handleBlur("confirmPassword")}
                      className={`w-full pl-10 pr-10 py-2.5 bg-white text-gray-900 border rounded-lg text-sm focus:outline-none focus:ring-1 transition-colors ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500" 
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-200 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Role Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-1">
                    Role (Default)
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#ECECEC] hover:bg-white text-black font-semibold py-2.5 rounded-lg transition-all duration-200 mt-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="h-0.5 bg-white w-full" />
                    <h1 className="absolute -top-2.5 bg-[#2461E6] px-2 text-white text-sm font-bold flex-1/3">
                      OR 
                    </h1>
                  </div>
                </div>

                {/* Social Login */}
                <div className="flex justify-center gap-3">
                  {socialProviders.map((provider) => (
                    <SocialAuthButton
                      key={provider.id}
                      icon={provider.icon}
                      alt={provider.alt}
                      onClick={() => handleSocialLogin(provider.alt)}
                    />
                  ))}
                </div>

                {/* Login Link */}
                <div className="text-center mt-5">
                  <span className="text-sm text-white">Already have an account? </span>
                  <a href="/sign-in" className="text-sm text-white font-bold hover:underline">
                    LOGIN
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;