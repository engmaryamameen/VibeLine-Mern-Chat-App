import { useState } from "react";

export const usePasswordToggle = (initialValue = false) => {
  const [showPassword, setShowPassword] = useState(initialValue);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return {
    showPassword,
    togglePassword,
    setShowPassword,
  };
};

