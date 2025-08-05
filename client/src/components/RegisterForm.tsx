import { type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerUser } from "../reducers/auth";
import { registerSchema, type RegisterFormData } from "../utils/validationSchema";
import type { AppDispatch, RootState } from "../types/redux";

const RegisterForm = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, isError, errorMessage } = useSelector((state: RootState) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormData) => {
        dispatch(registerUser(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <input {...register("name")} placeholder="Name" />
                {errors.name && <p style={{color: 'red'}}>{errors.name.message}</p>}
            </div>
            <div>
                <input {...register("email")} placeholder="Email" />
                {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
            </div>
            <div>
                <input {...register("password")} placeholder="Password" type="password" />
                {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
            </div>
            <div>
                <input {...register("confirmPassword")} placeholder="Confirm password" type="password" />
                {errors.confirmPassword && <p style={{color: 'red'}}>{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
            </button>

            {isError && <p style={{color: 'red'}}>{errorMessage}</p>}
        </form>
    );
};

export default RegisterForm;