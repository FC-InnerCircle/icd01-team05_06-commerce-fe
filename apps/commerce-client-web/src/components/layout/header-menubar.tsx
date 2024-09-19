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
import { MainMenu } from '@/types/menu-types';

interface HeaderMenubarProps {
  mainMenu: MainMenu[];
}

const HeaderMenubar = ({ mainMenu }: HeaderMenubarProps) => {
  return (
    <Menubar className="flex space-x-6 border-0">
      {mainMenu.map((menu, index) => (
        <MenubarMenu key={index}>
          {menu.categories ? (
            <>
              <MenubarTrigger className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
                {menu.title}
              </MenubarTrigger>
              <MenubarContent className="mt-2 rounded-lg bg-white p-2 shadow-lg">
                {menu.categories.map((category, categoryIndex) => (
                  <MenubarSub key={categoryIndex}>
                    <MenubarSubTrigger className="rounded-md p-4 text-sm text-gray-700 hover:bg-gray-100">
                      {category.title}
                    </MenubarSubTrigger>
                    {category.items && (
                      <MenubarSubContent className="ml-2 mt-2 rounded-lg p-2 shadow-lg">
                        {category.items.map((item, itemIndex) => (
                          <MenubarSub key={itemIndex}>
                            <MenubarSubTrigger className="rounded-md p-4 text-sm text-gray-700 hover:bg-gray-100">
                              {item.title}
                            </MenubarSubTrigger>
                            {item.items ? (
                              <MenubarSubContent className="ml-2 mt-2 rounded-lg p-2 shadow-lg">
                                {item.items.map((subItem, subItemIndex) => (
                                  <MenubarItem key={subItemIndex} asChild>
                                    <Link
                                      href={{
                                        pathname: '/search',
                                        query: {
                                          category: subItem.title,
                                        },
                                      }}
                                      passHref
                                    >
                                      <span className="w-full rounded-md px-4 py-2 text-sm">
                                        {subItem.title}
                                      </span>
                                    </Link>
                                  </MenubarItem>
                                ))}
                              </MenubarSubContent>
                            ) : (
                              <MenubarItem key={itemIndex} asChild>
                                <Link
                                  href={{
                                    pathname: '/search',
                                    query: {
                                      category: item.title,
                                    },
                                  }}
                                  passHref
                                >
                                  <span className="w-full rounded-md px-4 py-2 text-sm">
                                    {item.title}
                                  </span>
                                </Link>
                              </MenubarItem>
                            )}
                          </MenubarSub>
                        ))}
                      </MenubarSubContent>
                    )}
                  </MenubarSub>
                ))}
              </MenubarContent>
            </>
          ) : (
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
          )}
        </MenubarMenu>
      ))}
    </Menubar>
  );
};

export default HeaderMenubar;
