import styles from './style.module.css';

import React from "react";
import {clsx} from 'clsx';
import Link, {LinkProps} from "next/link";

type ButtonVariants = "primary" | "secondary" | "outlined" | "danger" | "info"

type ButtonProps = {
    px?: string,
    py?: string,
    customBorderWidth?: string,
    borderRadius?: string,
    textColor?: string,
    variant?: ButtonVariants,
    href?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>
    & Omit<LinkProps, 'href'>;
export const CustomButton = ({
                                 px,
                                 py,
                                 customBorderWidth,
                                 borderRadius,
                                 textColor,
                                 variant,
                                 className,
                                 children,
                                 ...props
                             }: ButtonProps & {
    children?: React.ReactNode
}) => {

    variant = variant || 'primary';


    let variantClasses = '';

    switch (variant) {
        case "primary":
            variantClasses = "bg-primary";
            break;
        case "secondary":
            variantClasses = "bg-secondary";
            break;
        case "danger":
            variantClasses = "bg-red-500";
            break
        case 'info':
            variantClasses = "bg-primary-blue"
            break
    }

    const classNameObject = {
        [styles['custom-button']]: true,
        [variantClasses || '']: true,
        [customBorderWidth || 'border']: true,
        [borderRadius || 'rounded-lg']: true,
        [textColor || 'text-white']: true,
        [px || 'px-8']: true,
        [py || 'py-2']: true,
        [className || '']: true
    };

    if (props.href) {
        return (<Link
                      className={clsx(classNameObject)}
                      {...props as LinkProps}>{children}</Link>);
    }
    return (
        <button
            className={clsx(classNameObject)}
            {...props}>{children}</button>
    );

};
