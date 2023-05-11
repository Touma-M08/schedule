import { forwardRef, useEffect, useRef, FC } from 'react';

type Props = {
    type?: string,
    name: string,
    id?: string,
    value: string | number,
    max?: number,
    className?: string,
    autoComplete?: string,
    required?: boolean,
    isFocused?: boolean,
    handleChange: React.ChangeEventHandler<HTMLInputElement>
}

const TextInput: FC<Props> = (
    { type = 'text', name, id, value, className, autoComplete, required, isFocused, handleChange }
) => {
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
};

export default TextInput;