import Image from 'next/image';
import {faArrowRightLong, faMars, faVenus} from "@fortawesome/free-solid-svg-icons";
import {clsx} from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import {CustomButton} from "@/components/Button/CustomButton";

export interface OurPetCardProps {
    id: number,
    isSponsor?: boolean,
    name: string,
    img: string,
    gender: 'M' | 'F',
    old: string,
    weight: string,
    breed: string,
    deleteCallback?: (idx: number) => void
}

export const OurPetCard = ({id, deleteCallback, isSponsor = false, ...props}: OurPetCardProps) => {
    const [isImgFailure, toggleIsImageFailure] = useState(false);


    let nameColorClass = 'text-primary-gray';
    let imgBorderColorClass = 'border-primary-gray';
    let genderIcon = faMars;

    if (props.gender === 'F') {
        nameColorClass = 'text-primary-blue';
        imgBorderColorClass = 'border-primary-blue';
        genderIcon = faVenus;
    }

    let imgPath = props.img;

    if (!imgPath.startsWith('/')) {
        imgPath = '/' + imgPath;
    }

    return (
        <div className={'flex items-center gap-2 nunito-font shadow-xl px-4 py-4 text-xl text-primary-gray'}>
            <div
                className={clsx('flex mr-6 border-4 rounded-full overflow-hidden w-[230px] h-[230px]', imgBorderColorClass)}>
                <Image width={300} height={300} alt={'our-pet-animal'}
                       src={!isImgFailure ? imgPath : '/static/not-found-kitten.webp'} onError={() => {
                    toggleIsImageFailure(true);
                }}/>
            </div>
            <div className={'grow'}>
                <div className={'flex mr-8'}>
                    <div className={clsx(nameColorClass, 'text-2xl mb-4 grow')}>
                        <span className={'mr-3'}>{props.name}</span>
                        <FontAwesomeIcon icon={genderIcon} size={'xl'}/>
                    </div>
                    {isSponsor && deleteCallback && (
                        <div className={'flex flex-col gap-2 items-center'}>
                            <CustomButton className={'w-full'} variant={'danger'}
                                          onClick={() => deleteCallback(id)}>Удалить</CustomButton>
                            <CustomButton className={'w-full'} variant={'info'}
                                          href={'/partners/edit-animal/' + id}>Изменить</CustomButton>
                        </div>
                    )}
                </div>
                <div className={'flex mb-3 w-1/3'}>
                    <div className={'grow'}>{props.old}</div>
                    <div>{props.weight}</div>
                </div>
                <div className={'mb-4'}>{props.breed}</div>
                <div>
                    <a className={'underline'} href="src/components/OurPetCard#">
                        To get acquainted
                        <span className={'ml-4'}><FontAwesomeIcon icon={faArrowRightLong}/></span>
                    </a>
                </div>
            </div>
        </div>
    );
};