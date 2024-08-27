'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeaderButton from './header-button';
import HeaderMenubar from './header-menubar';
import HamburgerMenu from './header-hamburgermenu';
import Search from './search';

const Header: React.FC = () => {
    return (
        <header className="w-full p-4 bg-background">
            <div className="container mx-auto flex items-center justify-between">
                {/* 로고 */}
                <div className="flex-shrink-0">
                    <Link href="/" className="hidden md:flex">
                        <Image
                            src="/logo-lg.svg"
                            alt="이너북스"
                            width={180}
                            height={60}
                            className="cursor-pointer"
                        />
                    </Link>
                    <Link href="/" className="md:hidden">
                        <Image
                            src="/logo.svg"
                            alt="이너북스"
                            width={120}
                            height={40}
                            className="cursor-pointer"
                        />
                    </Link>
                </div>

                {/* 검색 바 (md 이상에서만 보이도록) */}
                <div className="hidden md:flex flex-1 justify-start md:ml-6">
                    <div className="w-full max-w-lg">
                        <Search />
                    </div>
                </div>

                {/* 버튼들 (md 이상에서만 보이도록) */}
                <div className="hidden md:flex items-center space-x-4">
                    <HeaderButton />
                </div>

                {/* 모바일용 햄버거 메뉴 (md 이하에서만 보이도록) */}
                <div className="flex md:hidden">
                    <HamburgerMenu />
                </div>
            </div>

            {/* 메뉴바 (md 이상에서만 보이도록) */}
            <div className="hidden md:flex mt-4 border-t pt-2 container mx-auto">
                <HeaderMenubar/>
            </div>
        </header>
    );
};

export default Header;