
interface InputBoxProps {
    type: string;
    value: string;
    name: string;
    placeholder: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}



const InputBox: React.FC<InputBoxProps> = ({
    type, value, name, placeholder, label, onChange
}) => {
    return (
        <div className="my-2">
            <label>{label}</label>
            <input
             type={type}
             value={value}
             name={name}
             onChange={onChange}
             placeholder={placeholder}
             />
        </div>
    )
}


export default InputBox;