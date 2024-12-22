import { useNavigate } from "react-router-dom";
import { createUser } from "../../utils/api";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../components/UserContextProvider";

export default function SignUp() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async ({ email, password, repeatPassword }) => {
    if (password !== repeatPassword) {
      setError("Passwords don't match");
      return;
    }

    const user = await createUser(email, password);
    if (!user) {
      navigate("/signup");
    }
    userContext.onChange(user);
    navigate("/");
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col items-center justify-center bg-slate-300"
      >
        <h2 className="text-5xl pb-2 mb-4">Sign Up</h2>
        <input
          type="email"
          className="w-1/4 mb-4 pl-4 min-h-10 text-base"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        <input
          type="password"
          className="w-1/4 mb-4 pl-4 min-h-10 text-base"
          placeholder="Password"
          {...register("password", {
            required: true,
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: "Password is not strong",
            },
          })}
        />
        <div className="mb-10">
          {errors.password && (
            <p className="mb-3 text-red-600">{errors.password.message}</p>
          )}
        </div>
        <input
          type="password"
          className="w-1/4 mb-16 pl-4 min-h-10 text-base"
          placeholder="Repeat password"
          {...register("repeatPassword", {
            required: true,
            validate: (value) => value === password,
          })}
        />
        {errors.repeatPassword && (
          <p className="mb-3 text-red-600">Password must be match</p>
        )}
        <button className="py-1.5 px-14 bg-slate-400 text-xl">Sign Up</button>
      </form>
    </div>
  );
}
