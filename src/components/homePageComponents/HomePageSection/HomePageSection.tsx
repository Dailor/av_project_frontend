import React, {HTMLAttributes} from "react";
import {clsx} from "clsx";

type HomePageSectionProps = {
    title: string,
    children: React.ReactNode,
    isReverse?: boolean
} & Pick<HTMLAttributes<HTMLElement>, "className">

export const HomePageSection = ({title, isReverse = false, className, children}: HomePageSectionProps) => {
    return (
        <div className={clsx({
            "bg-primary-green": isReverse
        })}>
            <div className={clsx(className, 'container home-page-section mx-auto')}>
                <h1 className={clsx('mb-8 font-bold text-center text-6xl', {
                    'text-primary-green': !isReverse,
                    'text-white': isReverse,
                })}>{title}</h1>
                {children}
            </div>
        </div>
    );
};