import styles from "./styles.module.css";
import Image from 'next/image';
import {CustomButton} from "@/components/Button/CustomButton";
import {useMemo} from "react";
import {clsx} from "clsx";

const donationButtonsTypes = [
    {
        sum: "5$"
    },
    {
        sum: "10$"
    },
    {
        sum: "100$"
    },
    {
        sum: "Other"
    }
];
export const HomePageDonationSection = () => {
    const donationButtons = useMemo(() => {
        return donationButtonsTypes.map((item, index) => {
            return (
                <div key={index}>
                    <CustomButton px={'px-12'} variant={'outlined'} customBorderWidth={'border-2'}>{item.sum}</CustomButton>
                </div>
            );
        });
    }, []);

    return (
        <div className={'bg-primary-blue relative lg:min-h-[470px]'}>
            <div className={'container flex justify-end'}>
                <div className={clsx('hidden lg:block absolute left-0 bottom-0',styles['donation-section'])}>
                    <Image className={'filter contrast-50'} width={1339} height={1080} alt={'cat-donation'}
                           src={'/static/animals/cat-section-2-1.png'}/>
                </div>
                <div className={'text-white mt-14 mb-6 lg:w-2/3'}>
                    <h3 className={'mb-4 font-bold text-5xl lg:w-2/3'}>You can help by donating money right now</h3>
                    <div className={'mb-6 text-2xl'}>
                        Event a small sum of 5$ can make big help for an animal!
                    </div>
                    <div className={'flex flex-wrap gap-4 mb-8 text-2xl'}>
                        {donationButtons}
                    </div>
                    <div className={'font-bold text-3xl'}>
                        <CustomButton className={'min-w-[200px] w-1/3'} py={'py-4'} borderRadius={'rounded-xl'} customBorderWidth={'border-0'}><h3>Donate</h3></CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};