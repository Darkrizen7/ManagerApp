import { LoginForm } from "components";
import { useAuth } from "hooks";
import React from "react"
export const Login: React.FC = (): React.JSX.Element => {
    const { isConnected } = useAuth();
    return (
        <>
            {!isConnected() &&
                <LoginForm></LoginForm>
            }
        </>
    )
}