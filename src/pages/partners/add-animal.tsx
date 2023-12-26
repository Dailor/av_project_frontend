import {CustomInput} from "@/components/formComponents/CustomInput/CustomInput";
import React, {useState} from "react";
import {CustomButton} from "@/components/Button/CustomButton";
import {useAuth} from "@/auth/AuthProvider";
import {useRouter} from "next/router";
import {CustomSelect} from "@/components/formComponents/CustomSelect/CustomSelect";

export default function AddAnimalPage() {
    const auth = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [old, setOld] = useState(0);
    const [weight, setWeight] = useState(0);
    const [gender, setGender] = useState<string | null>('F');
    const [type, setType] = useState<string | null>('DOG');

    const [errorOther, setErrorOther] = useState('');
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        auth?.axiosInstance
            .put('/api/v1/adopt-animal/', {
                name, breed, photoUrl, old, weight, gender, type
            })
            .then(() => {
                return router.push('/partners/our-animals');
            })
            .catch(() => {
                setErrorOther('Server error');
            });
    };

    return (
        <div className={'mx-auto max-w-[480px] mt-[5vh] shadow-lg'}>
            <form className={'bg-white py-4 px-6 rounded-lg'} onSubmit={onSubmit}>
                <h3 className={'text-center font-bold text-4xl mb-3'}>Add Animal</h3>
                <div className={'grid grid-cols-1 lg:grid-cols-2 gap-2'}>
                    <CustomInput className={'w-full'} mb={'mb-4'} label={'Name'}
                                 value={name} onChange={(e) => setName(e.target.value)} required/>
                    <CustomInput className={'w-full'} mb={'mb-4'} label={'Breed'}
                                 value={breed} onChange={(e) => setBreed(e.target.value)}/>
                    <CustomInput className={'w-full'} mb={'mb-4'} label={'Photo URL'}
                                 value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}/>
                    <CustomInput className={'w-full'} mb={'mb-4'} label={'Old'} type={'number'}
                                 value={old} onChange={(e) => setOld(parseInt(e.target.value))} required/>
                    <CustomInput className={'w-full'} mb={'mb-4'} label={'Weight Kilo'} type={'number'}
                                 value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} required/>
                    <CustomSelect className={'w-full'} mb={'mb-4'} label={'Gender'}
                                  value={gender as string} onChange={(e) => setGender(e.target.value)} required>
                        <option value={'F'}>F</option>
                        <option value={'M'}>M</option>
                    </CustomSelect>
                    <CustomSelect className={'w-full'} mb={'mb-4'} label={'Type'}
                                  value={type as string} onChange={(e) => setType(e.target.value)}>
                        <option value={'CAT'}>Cat</option>
                        <option value={'DOG'}>Dog</option>
                    </CustomSelect>
                    {errorOther && (
                        <div className={'mb-3 text-red'}></div>
                    )}
                    <div className={'flex gap-4 col-span-full'}>
                        <CustomButton>Add</CustomButton>
                    </div>
                </div>
            </form>
        </div>
    );
};