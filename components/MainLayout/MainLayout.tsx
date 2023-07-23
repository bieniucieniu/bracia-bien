"use client"
import Link from "next/link"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  MainLayoutContext,
  useMainLayoutContext,
  useMainLayoutManager,
} from "./MainLayoutContext"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const context = useMainLayoutManager()

  return (
    <MainLayoutContext.Provider value={context}>
      <Topbar />
      <main className="snap-y snap-proximity overflow-auto h-screen">
        {children}
      </main>
    </MainLayoutContext.Provider>
  )
}

function Topbar() {
  const { navigation } = useMainLayoutContext()
  return (
    <nav
      style={{ scrollbarGutter: "stable" }}
      className="bg-white fixed top-0 left-0 right-0 z-40 grid grid-cols-3 drop-shadow-sm"
    >
      <NavigationMenu className="m-auto p-1 col-start-2">
        <NavigationMenuList>
          {navigation.main.map((item, i) => (
            <NavigationMenuItem key={i}>
              {item.content ? (
                <>
                  <NavigationMenuTrigger>{item.trigger}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex flex-row">
                      <ul className="flex-1 grid gap-3 p-4 max-w-fit">
                        {item.content.map((e, i) => (
                          <li className="row-span-3" key={i}>
                            <Link href={e.href || "/"} passHref legacyBehavior>
                              <NavigationMenuLink className="select-none inline-flex min-h-9 w-full items-center justify-start rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                                {e.name}
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-red-500 flex-1 w-[300px]"></div>
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={item?.href || "/"} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.trigger}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex mr-8 my-auto flex-row gap-8 justify-end">
        <Link
          href="https://www.instagram.com/braciabien/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/instagram.svg"
            className="m-auto object-contain select-none transition-opacity opacity-60 hover:opacity-100 h-8"
            alt="instagram"
            width={50}
            height={50}
          ></Image>
        </Link>
        <Link
          href="https://www.facebook.com/BraciaBien/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/facebook.svg"
            className="m-auto object-contain select-none transition-opacity opacity-60 hover:opacity-100 h-8"
            alt="facebook"
            width={50}
            height={50}
          ></Image>
        </Link>
      </div>
    </nav>
  )
}
