import {CustomInput} from "@/components/formComponents/CustomInput/CustomInput";
import React, {useState} from "react";
import {CustomButton} from "@/components/Button/CustomButton";
import {useAuth} from "@/auth/AuthProvider";
import {useRouter} from "next/router";

export default function RegistrationPage() {
    const auth = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorOther, setErrorOther] = useState('');

    const [isFetching, toggleIsFetching] = useState(false);
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setErrorUsername('');
        setErrorOther('');
        toggleIsFetching(true);
        auth?.axiosInstance
            .post("/api/v1/auth/register", {
                email: username, firstname, lastname, password
            })
            .then(r => {
                return router.push('/login');
            })
            .catch(r => {
                const data = r.response.data;

                if (data.email) {
                    setErrorUsername(data.email);
                } else {
                    setErrorOther('Server error');
                }
            })
            .finally(() => {
                toggleIsFetching(false);
            });
    };

    return (
        <div className={'mx-auto max-w-[480px] mt-[15vh] shadow-lg'}>
            <form className={'bg-white py-4 px-6 rounded-lg'} onSubmit={onSubmit}>
                <h3 className={'text-center font-bold text-4xl mb-3'}>Registration</h3>
                <div>
                    <CustomInput className={'w-full'} mb={'mb-4'} label={'Email'}
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 error={errorUsername}
                                 required/>
                    <CustomInput className={'w-full'} mb={'mb-4'} label={'Firstname'}
                                 value={firstname}
                                 onChange={(e) => setFirstname(e.target.value)} required/>
                    <CustomInput className={'w-full'} mb={'mb-4'} label={'Lastname'}
                                 value={lastname}
                                 onChange={(e) => setLastname(e.target.value)} required/>
                    <CustomInput className={'w-full'} mb={'mb-4'} label={'Password'} type={'password'}
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 required/>
                    {errorOther && (
                        <div className={'mb-3 text-red'}></div>
                    )}
                    <div className={'flex gap-4'}>
                        <CustomButton disabled={isFetching}>Submit</CustomButton>
                        <CustomButton className={'border-primary-orange'} textColor={'text-primary-orange'}
                                      variant={'outlined'} href={'/login'}>Login</CustomButton>
                    </div>
                </div>
            </form>
        </div>
    );
};