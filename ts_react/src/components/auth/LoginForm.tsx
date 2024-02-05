import React from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "hooks";
import { User } from "primitives";

export function LoginForm(): JSX.Element {
    const { register, handleSubmit } = useForm<User>({
        defaultValues: {}
    });
    const { login, error } = useAuth();
    const onSubmit = (data: User): void => {
        login(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container">
            <div className="header">
                <div className="text">Login</div>
                {error && error.message}
            </div>
            <div className="inputs">
                <div className="input">
                    <input {...register("email")} placeholder="Email" type="email" />
                </div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input {...register("password")} placeholder="Mot de passe" type="password"></input>
                </div>
            </div>
            <div className="submit-container">
                <button>Se connecter</button>
            </div>
        </form >
    )
}