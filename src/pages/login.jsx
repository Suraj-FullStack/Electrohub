import { useForm } from "react-hook-form";
import { useLoginMutation } from "../services/authApi";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [login] = useLoginMutation();

  const onSubmit = async (formData) => {
    try {
      const result = await login(formData).unwrap();
      alert(`Welcome back, ${result.firstName}!`);
    } catch (err) {
      alert("Login failed. Check your credentials.");
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#101828] px-4 py-16">
      <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-7 shadow-xl shadow-black/20">
        <p className="eyebrow">Welcome to Electrohub</p>
        <h1 className="text-2xl font-black text-slate-950">Sign in to your setup</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="primary-button w-full"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
