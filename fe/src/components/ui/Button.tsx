import React from "react";




type ButtonProps = {
    label: string;
    onClick?: () => void;
    type?:"button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
}


const Button: React.FC<ButtonProps> = ({
    label, onClick, type = "button", disabled = false, className = ""
}) => {

    return <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 bg-blue-300 text-white  font-medium hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
        {label}
    </button>;
}


export default Button;