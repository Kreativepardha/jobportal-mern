import React from "react";




interface RadioOptions {
    label: string;
    value: string;
}


interface RadioGroupProps {
    options: RadioOptions[];
    value: string;
    onChange: (value: string) => void;
    name: string;
    className?: string;
}


const RadioGroup: React.FC<RadioGroupProps> = ({
    options,
    value,
    onChange,
    name,
    className
}) => {
    return (
        <div className={`flex flex-wrap gap-4 ${className}`}>
            {options.map((opt) => (
                <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio"
                        name={name}
                        value={opt.value}
                        checked={value === opt.value}
                        onChange={() => onChange(opt.value)}
                        className="cursor-pointer"
                    />
                    <span>{opt.label}</span>
                </label>
        ))}
        </div>
    );
}
export default RadioGroup;