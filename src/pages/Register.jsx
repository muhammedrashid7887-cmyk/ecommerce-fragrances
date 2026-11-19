
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, registerUser } from "../services/authService";

function Register() {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      setName("");
      setEmail("");
      setPassword("");
      setShowpass(false);
      setRegisterError("");

      nav("/login");
    },

    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  // REGISTER FUNCTION
  const handle = async (e) => {
    e.preventDefault();

    if (isPending) return;

    setRegisterError("");

    const fullName = Name.trim();
    const email = Email.trim().toLowerCase();

    if (!fullName || !email || !Password.trim()) {
      setRegisterError("Please fill in all required fields.");
      return;
    }

    if (Password.length < 6) {
      setRegisterError("Password must contain at least 6 characters.");
      return;
    }

    try {
      // CHECK EXISTING USERS
      const users = await getUsers();

      const alreadyExists = users.some(
        (user) =>
          user.Email?.trim().toLowerCase() === email
      );

      if (alreadyExists) {
        setRegisterError("This email is already registered.");
        return;
      }

      // CREATE USER
      const user = {
        FullName: fullName,
        Email: email,
        Password: Password,
      };

      mutate(user);
    } catch (error) {
      console.error("Unable to check email:", error);
      setRegisterError(
        "Unable to verify email. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#FAF8F3] px-6 py-14 text-[#30251F]">

      {/* MAIN CONTAINER */}
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

        {/* LEFT SECTION */}
        <div className="min-w-0">

          <p className="mb-2 text-[9px] font-normal uppercase tracking-[2px] text-[#6B5545]">
            PRIVATE CLIENT
          </p>

          <h1 className="mb-4 font-serif text-4xl font-light leading-tight text-[#30251F] md:text-5xl">
            Create an account.
          </h1>

          <p className="max-w-lg text-sm leading-6 text-[#75685F]">
            Join Aurélia to save your favorites, check out seamlessly,
            and track your order history.
          </p>

        </div>

        {/* RIGHT REGISTER FORM */}
        <div className="mx-auto w-full max-w-114 border border-[#E1D7C9] bg-[#FFFEFC] p-6 sm:p-8">

          <h2 className="mb-6 font-serif text-[26px] font-light leading-tight text-[#30251F]">
            Register
          </h2>

          <form onSubmit={handle}>

            {/* FULL NAME */}
            <div className="mb-4">
              <label
                htmlFor="register-name"
                className="mb-2 block text-[10px] uppercase tracking-[1px] text-[#75685F]"
              >
                FULL NAME *
              </label>

              <input
                id="register-name"
                type="text"
                placeholder="Priya Verma"
                value={Name}
                onChange={(e) => {
                  setName(e.target.value);
                  setRegisterError("");
                }}
                required
                className="h-9.5 w-full border border-[#E1D7C9] bg-[#FAF8F3] px-3 text-xs text-[#30251F] outline-none transition placeholder:text-[#A99B8F] focus:border-[#30251F]"
              />
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label
                htmlFor="register-email"
                className="mb-2 block text-[10px] uppercase tracking-[1px] text-[#75685F]"
              >
                EMAIL ADDRESS *
              </label>

              <input
                id="register-email"
                type="email"
                placeholder="priya@example.com"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setRegisterError("");
                }}
                required
                className="h-9.5 w-full border border-[#E1D7C9] bg-[#FAF8F3] px-3 text-xs text-[#30251F] outline-none transition placeholder:text-[#A99B8F] focus:border-[#30251F]"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-5">
              <label
                htmlFor="register-password"
                className="mb-2 block text-[10px] uppercase tracking-[1px] text-[#75685F]"
              >
                PASSWORD *
              </label>

              <div className="relative">
                <input
                  id="register-password"
                  type={showpass ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={Password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setRegisterError("");
                  }}
                  minLength={6}
                  required
                  className="h-9.5 w-full border border-[#E1D7C9] bg-[#FAF8F3] px-3 pr-12 text-xs text-[#30251F] outline-none transition placeholder:text-[#A99B8F] focus:border-[#30251F]"
                />

                <button
                  type="button"
                  onClick={() => setShowpass(!showpass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#75685F] hover:text-[#30251F]"
                  aria-label={
                    showpass ? "Hide password" : "Show password"
                  }
                >
                  {showpass ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* VALIDATION ERROR */}
            {registerError && (
              <p className="mb-4 text-xs text-red-500">
                {registerError}
              </p>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="h-10.5 w-full bg-[#30251F] text-[10px] font-bold tracking-wider text-white transition hover:bg-[#514035] disabled:opacity-50"
            >
              {isPending
                ? "CREATING ACCOUNT..."
                : "CREATE ACCOUNT"}
            </button>

          </form>

          {/* API ERROR MESSAGE */}
          {isError && (
            <p className="mt-4 text-center text-xs text-red-500">
              {error?.message ||
                "Registration failed. Please try again."}
            </p>
          )}

          {/* LOGIN LINK */}
          <div className="mt-5 border-t border-[#E1D7C9] pt-4 text-center">
            <p className="text-xs text-[#75685F]">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 border-b border-[#30251F] pb-1 font-medium text-[#30251F] hover:text-[#8B6B50]"
              >
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;
