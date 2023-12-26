import React from "react";
import {clsx} from "clsx";

type CustomInputProps = {
    label: string
    mb?: string,
    error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const CustomInput = ({mb, label, className, error, ...props}: CustomInputProps) => {
    return (
        <div className={clsx(mb)}>
            <div className={'font-semibold mb-2'}>
                <label>{label}</label>
            </div>
            <input className={clsx(className || '', 'border-2', {'error': !!error})} {...props}/>
            <div className={'text-rose-400'}>{error}</div>
        </div>
    );
};