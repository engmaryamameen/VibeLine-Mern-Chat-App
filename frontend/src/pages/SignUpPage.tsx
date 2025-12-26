import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { useAuthForm } from "../hooks/useAuthForm";

const SignUpPage = () => {
  const { showPassword, togglePassword } = usePasswordToggle();
  const { formData, handleChange, handleSubmit, isLoading, isFormValid } = useAuthForm("signup");

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label htmlFor="signup-fullname" className="label pb-2">
                <span className="label-text font-semibold text-sm text-base-content/80">Full Name</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-primary">
                  <User className="h-5 w-5 text-base-content/50 group-focus-within:text-primary transition-colors duration-200" />
                </div>
                <input
                  id="signup-fullname"
                  type="text"
                  className="input w-full pl-12 pr-4 h-12 rounded-xl border-2 border-base-300 bg-base-100 
                           text-base-content placeholder:text-base-content/40
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                           hover:border-base-content/30 transition-all duration-200
                           shadow-sm hover:shadow-md focus:shadow-lg"
                  placeholder="Enter Your Name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="signup-email" className="label pb-2">
                <span className="label-text font-semibold text-sm text-base-content/80">Email</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-primary">
                  <Mail className="h-5 w-5 text-base-content/50 group-focus-within:text-primary transition-colors duration-200" />
                </div>
                <input
                  id="signup-email"
                  type="email"
                  className="input w-full pl-12 pr-4 h-12 rounded-xl border-2 border-base-300 bg-base-100 
                           text-base-content placeholder:text-base-content/40
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                           hover:border-base-content/30 transition-all duration-200
                           shadow-sm hover:shadow-md focus:shadow-lg"
                  placeholder="mail@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="signup-password" className="label pb-2">
                <span className="label-text font-semibold text-sm text-base-content/80">Password</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-primary">
                  <Lock className="h-5 w-5 text-base-content/50 group-focus-within:text-primary transition-colors duration-200" />
                </div>
                <input
                  id="signup-password"
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
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUpPage;
