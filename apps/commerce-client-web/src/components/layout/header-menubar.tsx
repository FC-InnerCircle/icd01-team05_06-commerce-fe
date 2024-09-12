import React from 'react';
import Link from 'next/link';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from '@/components/ui/menubar';

type SubSubMenuItem = {
  title: string;
};

type SubMenuItem = {
  title: string;
  subSubMenu: SubSubMenuItem[];
};

type MenuItemWithSubMenu = {
  title: string;
  subMenu: SubMenuItem[];
};

type MenuItemWithHref = {
  title: string;
};

type MenuItem = MenuItemWithSubMenu | MenuItemWithHref;

const mock: MenuItem[] = [
  {
    title: '전체 카테고리',
    subMenu: [
      {
        title: '국내도서',
        subSubMenu: [{ title: '소설' }, { title: '시' }, { title: '역사' }, { title: '과학' }],
      },
      {
        title: '외국도서',
        subSubMenu: [{ title: '소설' }, { title: '시' }, { title: '역사' }, { title: '과학' }],
      },
      {
        title: 'eBook',
        subSubMenu: [{ title: '소설' }, { title: '시' }, { title: '역사' }, { title: '과학' }],
      },
    ],
  },
  {
    title: '베스트셀러',
  },
  {
    title: '새로나온책',
  },
  {
    title: '추천도서',
  },
];

// Type guard function
const isMenuItemWithSubMenu = (menu: MenuItem): menu is MenuItemWithSubMenu => {
  return 'subMenu' in menu;
};

const HeaderMenubar = () => {
  return (
    <Menubar className="flex space-x-6 border-0">
      {mock.map((menu, index) => (
        <MenubarMenu key={index}>
          {isMenuItemWithSubMenu(menu) ? (
            <>
              <MenubarTrigger className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                {menu.title}
              </MenubarTrigger>
              <MenubarContent className="mt-2 rounded-lg bg-white p-2 shadow-lg">
                {menu.subMenu.map((subMenuItem, subIndex) =>
                  subMenuItem.subSubMenu ? (
                    <MenubarSub key={subIndex}>
                      <MenubarSubTrigger className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {subMenuItem.title}
                      </MenubarSubTrigger>
                      <MenubarSubContent className="ml-2 mt-2 rounded-lg bg-gray-100 p-2 shadow-lg">
                        {subMenuItem.subSubMenu.map((subSubMenuItem, subSubIndex) => (
                          <MenubarItem key={subSubIndex} asChild>
                            <Link
                              href={{
                                pathname: '/search',
                                query: {
                                  pc: subMenuItem.title,
                                  sc: subSubMenuItem.title,
                                },
                              }}
                              passHref
                            >
                              <span className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                                {subSubMenuItem.title}
                              </span>
                            </Link>
                          </MenubarItem>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                  ) : null,
                )}
              </MenubarContent>
            </>
          ) : (
            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link
                  href={{
                    pathname: '/search',
                    query: {
                      tag: menu.title,
                    },
                  }}
                  passHref
                >
                  <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm font-medium transition-colors">
                    {menu.title}
                  </span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          )}
        </MenubarMenu>
      ))}
    </Menubar>
  );
};

export default HeaderMenubar;
