import Link from "next/link";
import Image from "next/image";
import Logo from "./helpmate.png";

import CreateForm from "../tickets/create/CreateForm";

export default function Navbar() {
  return (
    <nav>
      <Image
        src={Logo}
        alt="Help Mate logo"
        width={70}
        placeholder="blur"
        quality={100}
      />
      <h1>HelpMate</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
    </nav>
  );
}
