import Image from 'next/image';
import styles from "./styles.module.css";
import React from "react";
import {clsx} from "clsx";
import {CustomButton} from "@/components/Button/CustomButton";

export const HomePreviewBlock = () => {
    return (
        <div className={clsx('min-h-screen')}>
            <Image width={1920} height={1080} className={styles.home_preview_block__bg} src="/home-preview-bg.webp"
                   alt="bg"/>
            <div className={clsx("min-w-full absolute", styles.home_preview_block__panel)}>
                <div className='container mx-auto'>
                    <div className={clsx(styles.inner_container, 'text-white')}>
                        <h3 className='font-bold text-4xl lg:text-6xl mb-4'>Charity project</h3>
                        <div className='text-xl md:text-2xl description mb-6'>
                            We are starting this project at a difficult time for the whole world. Right now we need to rethink
                            our values. Helping homeless and crippled animals is the goal of this project. The entire
                            Animalsaid.org team believes that every cat and every dog will definitely find their `Door to
                            Summer`!
                        </div>
                        <div>
                            <CustomButton customBorderWidth={"border-0"} px={"px-16 lg:px-24"} py={"py-3"} borderRadius={"rounded-xl"}>
                                <span className={'font-bold text-xl lg:text-3xl'}>Help</span>
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.home_preview_block__animal}>
                <Image width={1000} height={1000} src="/static/animals/dog-1.png" alt="" placeholder={'empty'}/>
            </div>
        </div>
    );
};