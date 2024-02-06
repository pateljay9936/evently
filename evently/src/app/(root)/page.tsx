import Image from "next/image";
import {Button} from "../../components/ui/button";
import { DESTRUCTION } from "dns";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl">Evently</h1>
      <Button variant="destructive" className="px-4 ">
        hello
      </Button>
    </main>
  );
}
