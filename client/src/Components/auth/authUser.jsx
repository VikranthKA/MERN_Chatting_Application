import { useState } from "react";
import axios from "axios"
const AuthenticateUser = () => {
  const [authState, setAuthState] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    password: ""
  });

  axios.defaults.baseURL = "http://localhost:3333/api/v1" ;
  axios.defaults.withCredentials = true;

  const validateInputs = () => {
    const errors = {};

    if (authState.username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters long.";
    }

    if (authState.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }

    const {data} = await axios.post("/register",authState)
    console.log(data,"data")



    console.log(authState,"state")
  };

  const handleToggleChange = () => {
    setAuthState({
      username: "",
      password: ""
    });
    setValidationErrors({
      username: "",
      password: ""
    });
    setError(null);
    setIsLogin((curr) => !curr);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthState({
      ...authState,
      [name]: value
    });
  };

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form onSubmit={handleSubmit} className="mx-auto w-11/12 sm:w-8/12 md:w-1/2 lg:w-1/3">
        <input
          type="text"
          name="username"
          onChange={handleInputChange}
          value={authState.username}
          id="username"
          className="block w-full rounded-sm p-2 mb-2 border"
          placeholder="Username"
        />
        {validationErrors.username && (
          <p className="text-red-500 text-xs text-center pb-2 font-semibold">{validationErrors.username}</p>
        )}

        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          value={authState.password}
          id="password"
          className="block w-full rounded-sm p-2 mb-2 border"
          placeholder="Password"
        />
        {validationErrors.password && (
          <p className="text-red-500 text-xs text-center pb-2 font-semibold">{validationErrors.password}</p>
        )}

        <button type="submit" className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoading ? "Processing..." : isLogin ? "LOGIN" : "SIGN UP"}
        </button>

        <section className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="ml-3 text-blue-600 hover:text-blue-800 cursor-pointer"
            onClick={handleToggleChange}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </section>
      </form>
    </div>
  );
};

export default AuthenticateUser;
