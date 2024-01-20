import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="bg-blue-400 w-full">
        <Link href={"/"}>POS</Link>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Welcome to POS trial 1
      <button className="bg-red-800 px-4 py-2 rounded-xl" ><Link href={"/POSPage"}>GO to POS</Link></button>
      
       </main>
    </div>
    
  );
}
