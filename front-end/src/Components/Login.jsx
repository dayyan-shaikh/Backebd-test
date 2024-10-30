import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const changehandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.post("http://localhost:8000/login", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res.data);

      if (res.data.success) {
        setIsAuthenticated(true);
        toast.success(res.data.message);
      }
      localStorage.setItem("user", input);
    } catch (error) {
      localStorage.removeItem("user");
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="flex justify-center flex-1 max-w-screen-xl bg-white border shadow sm:rounded-lg">
        {/* <!-- Left: Image --> */}
        <div className="items-center justify-center hidden w-full lg:w-1/2 lg:flex">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="object-cover w-4/5 h-auto"
            alt="Phone image"
          />
        </div>
        {/* <!-- Right: Login Form --> */}
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <section className="w-full p-8">
            <div className="bg-white rounded-lg shadow dark:border sm:max-w-md lg:w-full xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="ml-20 text-xl font-bold leading-tight tracking-tight text-blue-900 text-red md:text-2xl">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={submithandler}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                    >
                      Your email
                    </label>
                    <input
                      onChange={changehandler}
                      value={input.email}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="email"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium dark:text-gray"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        onChange={changehandler}
                        name="password"
                        value={input.password}
                        className="w-full px-5 py-3 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute text-gray-500 right-3 top-3 hover:text-gray-700"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray dark:text-gray"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full py-3 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-blue-900 rounded-lg hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                  >
                    Login
                  </button>
                  <p className="text-sm font-light text-center text-gray dark:text-gray">
                    Don’t have an account yet?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
