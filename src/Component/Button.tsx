import { PropsWithChildren } from "react";

type ButtonProps = {
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ children }) => {
    return (
        <a>
            {children}
        </a>
    )
}

export default Button;