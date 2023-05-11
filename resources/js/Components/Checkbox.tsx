import { FC } from "react";

type Props = {
    name?: string,
    value: any,
    handleChange: React.ChangeEventHandler<HTMLInputElement>
}

const Checkbox: FC<Props> = ({ name, value, handleChange }) => {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
            onChange={(e) => handleChange(e)}
        />
    );
}

export default Checkbox;