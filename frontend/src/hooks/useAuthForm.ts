import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

type AuthMode = "login" | "signup";

type LoginFormData = {
  email: string;
  password: string;
};

type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
};

type AuthFormData<T extends AuthMode> = T extends "login" ? LoginFormData : SignupFormData;

export const useAuthForm = <T extends AuthMode>(mode: T) => {
  const isLogin = mode === "login";
  
  const [formData, setFormData] = useState<AuthFormData<T>>(
    (isLogin
      ? { email: "", password: "" }
      : { fullName: "", email: "", password: "" }) as AuthFormData<T>
  );

  const { login, signup, isLoggingIn, isSigningUp } = useAuthStore();

  const handleChange = (field: keyof AuthFormData<T>, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (isLogin) {
      return true; // Login validation is handled by backend
    }

    const signupData = formData as SignupFormData;
    
    if (!signupData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!signupData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!signupData.password) {
      toast.error("Password is required");
      return false;
    }
    if (signupData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      await login(formData as LoginFormData);
    } else {
      if (validateForm()) {
        await signup(formData as SignupFormData);
      }
    }
  };

  const isFormValid = (): boolean => {
    if (isLogin) {
      const loginData = formData as LoginFormData;
      return loginData.email.trim() !== "" && loginData.password.trim() !== "";
    } else {
      const signupData = formData as SignupFormData;
      return (
        signupData.fullName.trim() !== "" &&
        signupData.email.trim() !== "" &&
        signupData.password.trim() !== ""
      );
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading: isLogin ? isLoggingIn : isSigningUp,
    isFormValid: isFormValid(),
  };
};

