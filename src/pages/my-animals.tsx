import {useAuth} from "@/auth/AuthProvider";
import {useEffect, useState} from "react";
import {OurPetCard} from "@/components/OurPetCard/OurPetCard";
import {AdoptAnimal} from "@/auth/types";

export default function MyAnimalsPage() {
    const auth = useAuth();

    const [adoptedAnimals, setAdoptedAnimals] = useState<AdoptAnimal[]>([]);

    useEffect(() => {
        auth?.axiosInstance && auth?.axiosInstance
            .get("/api/v1/adopt-animal/user")
            .then(r => {
                setAdoptedAnimals(r.data.adoptAnimals);
            });
    }, [auth?.axiosInstance]);

    return (
        <div className={'bg-white container mx-auto mt-2 min-h-[60vh]'}>
            <h3 className={'mb-3 text-center font-bold text-5xl text-primary-green'}>My animals</h3>
            <div>
                {adoptedAnimals.map((item) => {
                    return (
                        <OurPetCard id={item.id} name={item.name} img={item.photoUrl} gender={item.gender}
                                    old={item.old + ' month'} weight={item.weight + ' kg'} breed={item.breed}
                                    key={item.id} isOwner={true}/>
                    );
                })}
            </div>
        </div>
    );
}