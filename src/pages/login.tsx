import {CustomInput} from "@/components/formComponents/CustomInput/CustomInput";
import React, {useState} from "react";
import {CustomButton} from "@/components/Button/CustomButton";
import {useAuth} from "@/auth/AuthProvider";
import {useRouter} from "next/router";

export default function LoginPage() {
    const auth = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setError('');
        auth?.login(username, password)
            .then(() => {
                return router.push('/');
            })
            .catch((e) => {
                setError("Wrong password or username");

                setTimeout(() => {
                    setError('');
                }, 3000);
                throw e;
            });
    };

    return (
        <div className={'mx-auto max-w-[480px] mt-[15vh] shadow-lg'}>
            <form className={'bg-white py-4 px-6 rounded-lg'} onSubmit={onSubmit}>
                <h3 className={'text-center font-bold text-4xl mb-3'}>Login</h3>
                <div>
                    <CustomInput className={'w-full'} mb={'mb-4'} label={'Email'}
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}/>
                    <CustomInput className={'w-full'} mb={'mb-4'} label={'Password'} type={'password'}
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 error={error}/>
                    <div className={'flex gap-4'}>
                        <CustomButton>Submit</CustomButton>
                        <CustomButton className={'border-primary-orange'} textColor={'text-primary-orange'} variant={'outlined'} href={'/registration'}>Registration</CustomButton>
                    </div>
                </div>
            </form>
        </div>
    );
};