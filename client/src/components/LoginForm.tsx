import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../reducers/auth";
import type { AppDispatch, RootState } from "../types/redux";

const LoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, isError, errorMessage } = useSelector((state: RootState) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        dispatch(login(data));
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <input {...register("email")} placeholder="Email" />
                {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
            </div>
            <div>
                <input {...register("password")} placeholder="Password" type="password" />
                {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
            </button>

            {isError && <p style={{color: 'red'}}>{errorMessage}</p>}
        </form>
    );
};

export default LoginForm;