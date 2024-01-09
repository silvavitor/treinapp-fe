import Image from "next/image";

import logo from "@/public/logo.png";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="w-full flex flex-col justify-center items-center h-40">
      <Link href="/">
        <Image alt="logo" src={logo}/>
      </Link>

      <div className="w-full mt-8 flex justify-around">
        <Link href="/">
          <Button className="w-40 border border-stone-200" variant="secondary">Treinos</Button>
        </Link>
        <Link href="/exercises">
          <Button className="w-40 border border-stone-200" variant="secondary">Exercícios</Button>
        </Link>
        <Link href="/athletes">
          <Button className="w-40 border border-stone-200" variant="secondary">Atletas</Button>
        </Link>
      </div>
    </header>
  )
}
