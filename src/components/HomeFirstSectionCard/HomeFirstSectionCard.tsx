import Image from 'next/image';

interface HomeFirstSectionCardProps {
    heading: string
    text: string
    imgSrc: string
}

export const HomeFirstSectionCard = ({heading, text, imgSrc}: HomeFirstSectionCardProps) => {
    return (
        <div>
            <div className={'mb-4'}>
                <Image className={'rounded-lg'} width={320} height={640} src={imgSrc} alt={'animals-section-1'}/>
            </div>
            <div className={'w-4/5'}>
                <h3 className={'text-primary-green text-3xl mb-3'}>{heading}</h3>
                <div className={'text-xl'}>
                    {text}
                </div>
            </div>
        </div>
    );
};