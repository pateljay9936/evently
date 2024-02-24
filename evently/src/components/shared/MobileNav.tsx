import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import NavItems from "./NavItems";

export default function MobileNav() {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
            <Image
                className="cursor-pointer" 
                src='assets/icons/menu.svg'
                alt="menu"
                width={24}
                height={24} 
                style={{ width: '24px', height: '24px', objectFit: 'contain'}} />
        </SheetTrigger>
        <SheetContent className="flex flex-col bg-white gap-6 md:hidden">
            <Image  
                src='assets/images/logo.svg' 
                alt='logo' 
                width={128} 
                height={38}
            />
            <Separator className="border border-grey-50"/>
            <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
