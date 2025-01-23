
interface InputBoxProps {
    type: string;
    value?: string;
    name: string;
    placeholder: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}



const InputBox: React.FC<InputBoxProps> = ({
    type, value, name, placeholder, label, onChange
}) => {
    return (
        <div className="my-2 p-2 flex items-around">
            <label className="mx-2">{label}</label>
            <input
             type={type}
             value={value}
             name={name}
             onChange={onChange}
             className="w-full rounded mx-2"
             placeholder={placeholder}
             />
        </div>
    )
}


export default InputBox;