import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authorizeUser } from "../../utils/api";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../components/UserContextProvider";

export default function Login() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [error, setError] = useState(null);

  const onSubmit = async ({ email, password }) => {
    const user = await authorizeUser(email, password);
    if (user) {
      userContext.onChange(user);
      navigate("/");
    } else {
      setError("Email or password is not correct");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col items-center justify-center bg-slate-300"
      >
        <h2 className="text-5xl pb-2 mb-4">Login</h2>
        <input
          type="email"
          className="w-1/4 mb-1 pl-4 min-h-10 text-base"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <div className="mb-2"></div>
        {errors.email && <p className="mb-3 text-red-600">Email is required</p>}
        <input
          type="password"
          className="w-1/4 mb-3 pl-4 min-h-10 text-base"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <div className="mb-10">
          {errors.password && (
            <p className="mb-3 text-red-600">Password is required</p>
          )}
        </div>

        <button className="py-1.5 px-14 mb-4 bg-slate-400 text-xl">
          Log in
        </button>
        {error && <span className="">{error}</span>}
        <button className="py-1.5 px-12 bg-slate-400 text-xl">
          <Link to="/signup">Sign up</Link>
        </button>
      </form>
    </div>
  );
}
