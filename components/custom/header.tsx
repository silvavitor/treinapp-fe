import Image from "next/image";

import logo from "@/public/logo.png";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex justify-center items-center h-40">
      <Link href="/">
        <Image alt="logo" src={logo}/>
      </Link>
    </header>
  )
}
