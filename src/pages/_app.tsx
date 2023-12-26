import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {AuthProvider} from "@/auth/AuthProvider";
import {CustomHeader} from "@/components/CustomHeader/CustomHeader";

config.autoAddCss = false;

export default function App({Component, pageProps}: AppProps) {
    return (
        <AuthProvider>
            <CustomHeader/>
            <div className={'grow'}>
                <Component {...pageProps} />
            </div>
        </AuthProvider>
    );
}
