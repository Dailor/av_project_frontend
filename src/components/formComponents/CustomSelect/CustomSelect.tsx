import React from "react";
import {clsx} from "clsx";

type CustomSelectProps = {
    label: string
    mb?: string,
    error?: string
    className?: React.ReactNode
} & React.SelectHTMLAttributes<HTMLSelectElement>

export const CustomSelect = ({mb, label, error, className, children, ...props}: CustomSelectProps) => {
    return (
        <div className={clsx(mb)}>
            <div className={'font-semibold mb-2'}>
                <label>{label}</label>
            </div>
            <select className={clsx(className || '', 'border-2', {'error': !!error})} {...props}>
                {children}
            </select>
            <div className={'text-rose-400'}>{error}</div>
        </div>
    );
}