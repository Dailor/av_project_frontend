import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {AuthProvider} from "@/auth/AuthProvider";
import {CustomHeader} from "@/components/CustomHeader/CustomHeader";
import {HTMLAttributes} from "react";
import {clsx} from "clsx";

config.autoAddCss = false;

type AdvancedAppProps = AppProps & {
    Component: AppProps['Component'] & {
        parentClassName?: HTMLAttributes<any>['className']
        hideHeader?: boolean
        hideFooter?: boolean
    }
}

export default function App({Component, pageProps}: AdvancedAppProps) {
    return (
        <AuthProvider>
            {Component.hideHeader !== true && (
                <CustomHeader/>
            )}
            <div className={clsx('grow', Component.parentClassName)}>
                <Component {...pageProps} />
            </div>
        </AuthProvider>
    );
}
