import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { useAuthForm } from "../hooks/useAuthForm";

const LoginPage = (): JSX.Element => {
  const { showPassword, togglePassword } = usePasswordToggle();
  const { formData, handleChange, handleSubmit, isLoading, isFormValid } = useAuthForm("login");

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label htmlFor="login-email" className="label pb-2">
                <span className="label-text font-semibold text-sm text-base-content/80">Email</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-primary">
                  <Mail className="h-5 w-5 text-base-content/50 group-focus-within:text-primary transition-colors duration-200" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  className="input w-full pl-12 pr-4 h-12 rounded-xl border-2 border-base-300 bg-base-100 
                           text-base-content placeholder:text-base-content/40
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                           hover:border-base-content/30 transition-all duration-200
                           shadow-sm hover:shadow-md focus:shadow-lg"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="login-password" className="label pb-2">
                <span className="label-text font-semibold text-sm text-base-content/80">Password</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-primary">
                  <Lock className="h-5 w-5 text-base-content/50 group-focus-within:text-primary transition-colors duration-200" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="input w-full pl-12 pr-12 h-12 rounded-xl border-2 border-base-300 bg-base-100 
                           text-base-content placeholder:text-base-content/40
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                           hover:border-base-content/30 transition-all duration-200
                           shadow-sm hover:shadow-md focus:shadow-lg"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center 
                           text-base-content/50 hover:text-base-content/80 
                           focus:outline-none focus:text-primary transition-colors duration-200
                           active:scale-95"
                  onClick={togglePassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoading || !isFormValid}>
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};
export default LoginPage;
