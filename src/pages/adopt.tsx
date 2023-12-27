import {OurPetCard} from "@/components/OurPetCard/OurPetCard";
import {useCallback, useEffect, useState} from "react";
import {AdoptAnimal} from "@/auth/types";
import {serverSideAxios} from "@/lib/serverAxios";
import {useAuth} from "@/auth/AuthProvider";
import {useRouter} from "next/navigation";

interface AdoptAnimalPageProps {
    adoptAnimals: AdoptAnimal[]
}

export default function AdoptAnimalPage({adoptAnimals}: AdoptAnimalPageProps) {
    const auth = useAuth();
    const router = useRouter();

    const [successAdopt, setSuccessAdopt] = useState([-1, '']);
    const [errorAdopt, setErrorAdopt] = useState([-1, '']);

    const adoptAnimal = useCallback((idx: number) => {
        if (!auth?.isAuth) {
            return router.push('/login');
        }

        return auth?.axiosInstance
            .post("/api/v1/adopt-animal/adopt/" + idx)
            .then((r) => {
                setSuccessAdopt([idx, 'Success Adopted!']);
            })
            .catch((r) => {
                setErrorAdopt([idx, "Error! May be it's already adopt or ad removed"]);
            });
    }, [auth?.isAuth, auth?.axiosInstance, router]);

    return (
        <div className={'bg-white container mx-auto mt-2 min-h-[60vh]'}>
            <h3 className={'mb-3 text-center font-bold text-5xl text-primary-green'}>Adopt animal</h3>
            <div>
                {adoptAnimals.map((item) => {
                    let successAdoptProp = {};
                    let errorAdoptProp = {};

                    if (successAdopt[0] == item.id) {
                        successAdoptProp = {successAdopt: successAdopt[1]};
                    }

                    if (errorAdopt[0] == item.id) {
                        errorAdoptProp = {errorAdopt: successAdopt[1]};
                    }


                    return (
                        <OurPetCard id={item.id} name={item.name} img={item.photoUrl} gender={item.gender}
                                    old={item.old + ' month'} weight={item.weight + ' kg'} breed={item.breed}
                                    key={item.id}
                                    adoptCallback={adoptAnimal} {...successAdoptProp} {...errorAdoptProp}/>
                    );
                })}
            </div>
        </div>
    );
};

export async function getStaticProps() {
    return serverSideAxios.get('/api/v1/adopt-animal/adopt').then((r) => {
        const data = r.data;

        return {
            props: {
                ...data
            }
        };
    });
}