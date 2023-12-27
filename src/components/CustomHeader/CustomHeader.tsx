import Image from "next/image";
import {CustomButton} from "@/components/Button/CustomButton";
import {HeaderLink} from "@/components/CustomHeader/HeaderLink";
import {clsx} from "clsx";
import {usePathname} from "next/navigation";
import {useAuth} from "@/auth/AuthProvider";
import {AuthContextType} from "@/auth/types";
import {useEffect, useState} from "react";
import Link from "next/link";

export const CustomHeader = () => {
    const {isAuth, logout} = useAuth() as AuthContextType;
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const customHeaderStyles = {
        'bg-primary-green': pathname !== '/',
        'absolute z-10': pathname === '/'
    };

    return (
        <header className={clsx('min-w-full', customHeaderStyles)}>
            <div className={'container-header mx-auto flex items-center'}>
                <div className={'me-12 grow lg:grow-0'}>
                    <HeaderLink className={'block w-32'} href={'/'}><Image width={128} height={64} src="/logo.svg"
                                                                           alt="Logo"/></HeaderLink>
                </div>
                <div className='hidden lg:flex flex-col md:flex-row grow gap-8'>
                    <HeaderLink href={'/about'}>About the project</HeaderLink>
                    <HeaderLink href={'/information'}>Useful information</HeaderLink>
                    <HeaderLink href={'/help'}>Help</HeaderLink>
                    <HeaderLink href={'/adopt'}>Adopt a pet</HeaderLink>
                </div>
                {isMounted && isAuth && (
                    <div className="group relative">
                        <CustomButton href={'#'} variant={'outlined'}
                            className="font-semibold py-2 px-4 rounded flex items-center">
                            <span className="mr-1">Menu</span>
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6z"/>
                            </svg>
                        </CustomButton>
                        <div className={'absolute hidden group-hover:block'}>
                            <div className="bg-white border rounded mt-2">
                                <ul className="list-reset">
                                    <li>
                                        <Link className={'flex items-center gap-2 text-gray-800 hover:bg-gray-300 py-2 px-4'} href={'/partners/add-animal'}>
                                            <span>Add Animal</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={'flex items-center gap-2 text-gray-800 hover:bg-gray-300 py-2 px-4'} href={'/partners/our-animals'}>
                                            <span>Our Animals</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={'flex items-center gap-2 text-gray-800 hover:bg-gray-300 py-2 px-4'} href={'/partners/adopted-animals'}>
                                            <span>Adopted animals</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={'flex items-center gap-2 text-gray-800 hover:bg-gray-300 py-2 px-4'} href={'/my-animals'}>
                                            <span>My animals</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={'flex items-center gap-2 text-gray-800 hover:bg-gray-300 py-2 px-4'} href={'#'} onClick={logout}>
                                            <span>Logout</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) || (
                    <CustomButton className={'font-bold text-xl font-bold'} variant={'outlined'}>
                        <HeaderLink href={'/login'}>Log in</HeaderLink>
                    </CustomButton>
                )}
            </div>
        </header>
    );
};
