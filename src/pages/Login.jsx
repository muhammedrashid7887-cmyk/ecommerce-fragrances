
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../redux/Slices/authSlice";
import { getUsers } from "../services/authService";

function Login() {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [loginError, setLoginError] = useState("");

  // FETCH USERS
  const {
    data: users = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // LOGIN FUNCTION
  const handle = (e) => {
    e.preventDefault();

    if (isPending || isError) return;

    const user = users.find((item) => {
      return (
        item.Email?.trim().toLowerCase() ===  Email.trim().toLowerCase() &&
        item.Password === Password
      );
    });

    if (!user) {
      setLoginError("Invalid Email or Password");
      return;
    }

    setLoginError("");

    // USER DATA WITHOUT PASSWORD
    const userData = {
      id: user.id,
      FullName: user.FullName,
      Email: user.Email,
    };

    // SAVE LOGIN STATE
    localStorage.setItem("user", JSON.stringify(userData));

    // UPDATE REDUX STATE
    dispatch(login(userData));

    // REDIRECT AFTER LOGIN
    const from = location.state?.from;

    const redirectPath = from
      ? `${from.pathname}${from.search || ""}`
      : "/";

    nav(redirectPath, { replace: true });
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
            Welcome back.
          </h1>

          <p className="max-w-lg text-sm leading-6 text-[#75685F]">
            Sign in to access your shopping bag,
            place orders, and view your previous fragrances.
          </p>

        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="mx-auto w-full max-w-114 border border-[#E1D7C9] bg-[#FFFEFC] p-6 sm:p-8">

          <h2 className="mb-6 font-serif text-[26px] font-light leading-tight text-[#30251F]">
            Sign in
          </h2>

          <form onSubmit={handle}>

            {/* EMAIL */}
            <div className="mb-4">

              <label
                htmlFor="login-email"
                className="mb-2 block text-[10px] uppercase tracking-[1px] text-[#75685F]"
              >
                EMAIL ADDRESS *
              </label>

              <input
                id="login-email"
                type="email"
                placeholder="ananya@example.com"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoginError("");
                }}
                required
                className="h-9.5 w-full border border-[#E1D7C9] bg-[#FAF8F3] px-3 text-xs text-[#30251F] outline-none transition placeholder:text-[#A99B8F] focus:border-[#30251F]"
              />

            </div>

            {/* PASSWORD */}
            <div className="mb-5">

              <label
                htmlFor="login-password"
                className="mb-2 block text-[10px] uppercase tracking-[1px] text-[#75685F]"
              >
                PASSWORD *
              </label>

              <div className="relative">

                <input
                  id="login-password"
                  type={showpass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={Password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError("");
                  }}
                  required
                  className="h-9.5 w-full border border-[#E1D7C9] bg-[#FAF8F3] px-3 pr-12 text-xs text-[#30251F] outline-none transition placeholder:text-[#A99B8F] focus:border-[#30251F]"
                />

                {/* SHOW / HIDE PASSWORD */}
                <button
                  type="button"
                  onClick={() => setShowpass(!showpass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#75685F] transition hover:text-[#30251F]"
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

            {/* LOGIN ERROR */}
            {loginError && (
              <p className="mb-4 text-xs text-red-500">
                {loginError}
              </p>
            )}

            {/* FETCH ERROR */}
            {isError && (
              <p className="mb-4 text-xs text-red-500">
                {error?.message || "Unable to load users."}
              </p>
            )}

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              disabled={isPending || isError}
              className="h-10.5 w-full bg-[#30251F] text-[10px] font-bold tracking-wider text-white transition hover:bg-[#514035] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "PLEASE WAIT..." : "SIGN IN"}
            </button>

          </form>

          {/* REGISTER LINK */}
          <div className="mt-5 border-t border-[#E1D7C9] pt-4 text-center">

            <p className="text-xs text-[#75685F]">
              New to Aurélia?

              <Link
                to="/register"
                className="ml-1 border-b border-[#30251F] pb-1 font-medium text-[#30251F] transition hover:text-[#8B6B50]"
              >
                Create an account
              </Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
