import styles from '@/styles/index.module.css';

import {HomePreviewBlock} from "@/components/homePageComponents/HomePreviewBlock/HomePreviewBlock";
import {HomePageSection} from "@/components/homePageComponents/HomePageSection/HomePageSection";
import Image from 'next/image';
import {clsx} from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram, faXTwitter} from "@fortawesome/free-brands-svg-icons";
import {useMemo} from "react";
import {HomeFirstSectionCard} from "@/components/HomeFirstSectionCard/HomeFirstSectionCard";
import {HomePageDonationSection} from "@/components/homePageComponents/HomePageDonationSection/HomePageDonationSection";
import {CustomButton} from "@/components/Button/CustomButton";
import {serverSideAxios} from "@/lib/serverAxios";
import {OurPetCardProps, OurPetCard} from "@/components/OurPetCard/OurPetCard";

const socialNetworks = [
    {icon: faFacebook},
    {icon: faInstagram},
    {icon: faXTwitter},
];

const firstSectionAnimals = [
    {
        heading: "Helping pets find friendly home",
        text: "Our organisation is trying to find home for every animal",
        imgSrc: '/static/animals/dog-section-1-down-1.jpg'
    },
    {
        heading: "Making pets happy",
        text: "Our main aim is to make homeless animals or animals with disabilities happy",
        imgSrc: '/static/animals/dog-section-1-down-2.jpg'
    },
    {
        heading: "Provide support to the shelters",
        text: "We providing help to the shelters, which have joined our organisation",
        imgSrc: '/static/animals/dog-section-1-down-3.jpg'
    },
];

const ourPetsList: OurPetCardProps[] = [
    {
        id: -1,
        name: "Musya",
        img: '/static/animals/our_pets/animal-1.jpg',
        gender: 'F',
        old: '5 month',
        weight: '1 kg',
        breed: 'The breed is unknown'
    },
    {
        id: -1,
        name: "Rex",
        img: '/static/animals/our_pets/animal-2.webp',
        gender: 'M',
        old: '4 year',
        weight: '10 kg',
        breed: 'Smooth Fox Terrier'
    },
    {
        id: -1,
        name: "Vaska",
        img: '/static/animals/our_pets/animal-3.jpg',
        gender: 'M',
        old: '8 year',
        weight: '2 kg',
        breed: 'European Shorthair'
    },
    {
        id: -1,
        name: "Mia",
        img: '/static/animals/our_pets/animal-4.jpg',
        gender: 'F',
        old: '7 month',
        weight: '1 kg',
        breed: 'The breed is unknown'
    },
];

interface HomePageAchievementProps {
    title: any
    statistic: any
}

const HomePageAchievement = ({title, statistic}: HomePageAchievementProps) => {
    return (
        <div className={'flex flex-col justify-center text-center font-bold'}>
            <div className={'text-6xl'}>{statistic}</div>
            <div className={'text-2xl'}>{title}</div>
        </div>
    );
};

interface HomePageAchievementImageProps {
    src: string
}

const HomePageAchievementImage = ({src}: HomePageAchievementImageProps) => {
    return (
        <div>
            <Image style={{width: '100%', height: '100%'}} width={960} height={720} src={src}
                   alt={'animals-achievement'}/>
        </div>
    );
};

interface HomeProps {
    petsFoundHomeCount: number
    partnersCount: number
    dollarsCollected: number
}
export default function Home({petsFoundHomeCount, partnersCount, dollarsCollected}: HomeProps) {
    const socialNetworkBlock = useMemo(() => {
        return socialNetworks.map((item, index) => {
            return (
                <a href="#" key={index}>
                    <FontAwesomeIcon icon={item.icon} size={'2xl'}/>
                </a>
            );
        });
    }, []);

    const firstSectionAnimalsCard = useMemo(() => {
        return firstSectionAnimals.map((item, index) => {
            return (<HomeFirstSectionCard {...item} key={index}/>);
        });
    }, []);

    const ourPetCards = useMemo(() => {
        return ourPetsList.map((item, index) => {
            return (
                <OurPetCard {...item} key={index}/>
            );
        }, []);
    }, []);

    return (
        <>
            <HomePreviewBlock/>
            <HomePageSection className={clsx(styles['section-1'])} title={'About the project'}>
                <div className='flex mb-12'>
                    <div className={clsx(styles['main-dog-img-wrapper'], 'hidden lg:block mr-16')}>
                        <Image width={480} height={633} src={'/static/animals/dog-section-1.jpg'}
                               alt={"dog-section-1"}/>
                    </div>
                    <div className={'text-lg lg:basis-2/5'}>
                        <p className={'mb-5'}>The project <span
                            className={'font-bold'}>&quot;Animalsaid.org&quot;</span> was created on the
                            initiative of
                            the <span className={'font-bold text-primary-green'}>Tefi Charitable Foundation</span> and
                            it is a
                            part of the <span
                                className={'font-bold text-primary-green'}>&quot;Door to Summer&quot; Animal Welfare Program</span>.
                        </p>
                        <p className={'mb-5'}>
                            The aim of the project is to help animals who have been injured due to the accidents, human
                            fault or simply found themselves without a home due to life circumstances. We help them to
                            undergo treatment and rehabilitation and to find a new family. We also want to draw public
                            attention to the problems of such animals and unite professional communities from different
                            countries to solve existing problems.
                        </p>
                        <p className={'mb-5'}>
                            We are sure that there are no boundaries and obstacles to achieve the project`s goal! By
                            combining our efforts we can do it!
                        </p>
                        <div className={'mb-8'}>
                            <a className='font-bold text-primary-green' href="#">
                                More about project <FontAwesomeIcon className={"ml-3"} icon={faArrowRightLong}
                                                                    size={"xl"}
                                                                    style={{transform: 'scaleX(1.5) scaleY(1.3)'}}/>
                            </a>
                        </div>
                        <div className={'flex items-center'}>
                            <p className={'font-bold mr-4'}>Share on social media: </p>
                            <div className={'flex gap-4 text-primary-blue'}>
                                {socialNetworkBlock}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'}>
                    {firstSectionAnimalsCard}
                </div>
            </HomePageSection>
            <HomePageDonationSection/>
            <HomePageSection title={'Out pets'}>
                <div className={'text-center text-xl'}>These pets can`t wait to find their home and be loved</div>
                <div className={'grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'}>
                    {ourPetCards}
                </div>
                <div className={'flex justify-center'}>
                    <CustomButton className={'text-3xl nunito-font border-primary-blue'}
                                  textColor={'text-primary-blue'}
                                  customBorderWidth={'border-4'}
                                  borderRadius={'rounded-xl'}
                                  px={'px-12'}
                                  variant={'outlined'}>More pets</CustomButton>
                </div>
            </HomePageSection>
            <HomePageSection title={"Due to the project"} isReverse={true}>
                <div className={'grid gap-4 md:grid-cols-2 lg:gap-0 lg:grid-cols-3 text-white nunito-font'}>
                    <HomePageAchievement title={'pets found their home'} statistic={petsFoundHomeCount}/>
                    <HomePageAchievementImage src={'/static/animals/achievements/animal-1.jpg'}/>
                    <HomePageAchievement title={'partners out project has'} statistic={partnersCount}/>
                    <HomePageAchievementImage src={'/static/animals/achievements/animal-2.webp'}/>
                    <HomePageAchievement title={'collected'} statistic={dollarsCollected + '$'}/>
                    <HomePageAchievementImage src={'/static/animals/achievements/animal-3.webp'}/>
                </div>
            </HomePageSection>
        </>
    );
}

export async function getStaticProps() {
    return serverSideAxios.get('/api/v1/home').then((r) => {
        const data = r.data;

        return {
            props: {
                ...data
            }
        };
    });

    return {
        props: {
            petsFoundHomeCount: 1,
            partnersCount: 1,
            dollarsCollected: 1,
        }
    };
}