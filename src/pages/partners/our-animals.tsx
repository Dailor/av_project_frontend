import {useCallback, useEffect, useState} from "react";
import {useAuth} from "@/auth/AuthProvider";
import {AdoptAnimal, AuthContextType} from "@/auth/types";
import {OurPetCard} from "@/components/OurPetCard/OurPetCard";

export default function OutAnimalsPage() {
    const {axiosInstance} = useAuth() as AuthContextType;
    const [adoptAnimals, setAdoptAnimals] = useState<AdoptAnimal[]>([]);

    const [refresher, setRefresher] = useState(1);

    const deleteCallback = useCallback((idx: number) => {
        axiosInstance.delete('/api/v1/adopt-animal/partner/' + idx)
            .then(() => {
                setRefresher((prev) => prev + 1);
            });
    }, [axiosInstance]);

    useEffect(() => {
        if (axiosInstance !== null)
            axiosInstance
                .get('/api/v1/adopt-animal/partner')
                .then(r => {
                    setAdoptAnimals(r.data.adoptAnimals);
                });
    }, [axiosInstance, refresher]);

    return (
        <div className={'bg-white container mx-auto mt-2 min-h-[60vh]'}>
            <h3 className={'text-center font-bold text-3xl text-primary-green'}>Our animals</h3>
            <div>
                {adoptAnimals.map((item) => {
                    return (
                        <OurPetCard id={item.id} name={item.name} img={item.photoUrl} gender={item.gender}
                                    old={item.old + ' month'} weight={item.weight + ' kg'} breed={item.breed}
                                    deleteCallback={deleteCallback} isSponsor={true}
                                    key={item.id}/>
                    );
                })}
            </div>
        </div>
    );
};