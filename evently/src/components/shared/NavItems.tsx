'use client'
import Link from "next/link";
import { headerLinks } from "../../../constants";
import { usePathname } from "next/navigation";
import { SheetClose } from "../ui/sheet";

export default function NavItems(){
    const PathName = usePathname();
  return (
    <div>
      <ul className=" flex md:flex-between w-full flex-col items-start gap-5 md:flex-row">
        {headerLinks.map((link) => {
            const isActive = PathName === link.route;
            return(
                <li key={link.route} className={`${isActive &&  'text-primary-500'} flex-center p-medium-16 whitespace-nowrap`} >
                    <Link href={link.route}>{link.label}</Link>
                </li>
            )
        })
           
        }
      </ul>
    </div>
  )
}   