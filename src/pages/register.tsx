import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NotificationMsg } from "../shared/notification-modal";
import { AuthStorageKeys, URLEndPoint } from "../shared/auth-modal";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(URLEndPoint.register, {
        username,
        email,
        password,
      });
      localStorage.setItem(AuthStorageKeys.token, res.data.token);
      localStorage.setItem(AuthStorageKeys.user, JSON.stringify(res.data.user));
      dispatch(setCredentials(res.data));
      navigate(URLEndPoint.home);
      toast.success(NotificationMsg.RegistrationSuccess);
    } catch (err: any) {
      toast.error(err.response.data.message || NotificationMsg.LoginFailed);
    }
  };

  return (
    <div className="flex" style={{ minHeight: "calc(100vh - 3.3rem)" }}>
      {/* Left Side Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 lg:px-32">
        <div className="max-w-md w-full mx-auto">
          <div className="text-blue-600 text-3xl font-bold mb-6">ShopKart</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create your account
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Already a member?{" "}
            <Link
              to={URLEndPoint.login}
              className="text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white cursor-pointer font-semibold rounded hover:bg-blue-700 transition"
            >
              Create Account
            </button>

            <div className="hidden">
              <div className="flex items-center gap-4 my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="text-gray-400 text-sm">Or sign up with</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-2 border rounded flex justify-center items-center hover:bg-gray-100">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                  />
                  Google
                </button>
                <button className="flex-1 py-2 border rounded flex justify-center items-center hover:bg-gray-100">
                  <img
                    src="https://www.svgrepo.com/show/475702/github.svg"
                    alt="GitHub"
                    className="w-5 h-5 mr-2"
                  />
                  GitHub
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block w-1/2">
        <img
          src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d"
          alt="register"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
