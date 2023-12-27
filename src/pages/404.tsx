import Image from 'next/image';
import {CustomButton} from "@/components/Button/CustomButton";

export default function NotFoundPage ()  {
    return (
        <div className={'grid grid-cols-12 overflow-hidden h-screen bg-primary-green text-white'}>
            <div className={'col-span-full lg:col-span-7'}>
                <div className={'mt-48 ml-24 pr-20'}>
                    <h1 className={'font-bold text-9xl mb-5'}>404</h1>
                    <h2 className={'font-bold text-6xl mb-6'}>Page not found</h2>
                    <div className={'font-semi text-2xl mb-6'}>
                        The page is outdated or has been deleted or did not exist at all. Try starting over.
                    </div>
                    <div>
                        <CustomButton px={'px-4'} py={'py-3'} borderRadius={'rounded-xl'} customBorderWidth={'border-0'} className={'nunito-font font-bold text-3xl'} href={'/'}>To the main page</CustomButton>
                    </div>
                </div>
            </div>
            <div className={'hidden lg:block lg:col-span-5'}>
                <div>
                    <Image className={'w-full'} src={'/404.jpeg'} width={1000} height={1000} alt={'404-cat'}/>
                </div>
            </div>
        </div>
    );
};

NotFoundPage.hideHeader = true;
NotFoundPage.hideFooter = true;