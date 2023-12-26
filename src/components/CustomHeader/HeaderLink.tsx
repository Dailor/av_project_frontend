import Link, {LinkProps} from "next/link";
import React from "react";
import {clsx} from "clsx";

type HeaderLink = LinkProps & {
    children?: React.ReactNode
} & React.HTMLAttributes<HTMLAnchorElement>

export const HeaderLink = ({href, ...props}: HeaderLink ) => {
    return <Link className={clsx('text-2xl text-white font-bold', props.className || '')} href={href} {...props}>{props.children}</Link>;
};