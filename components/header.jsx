import Link from "next/link"; // Use next/link for navigation
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import { SignedOut, SignedIn } from "@clerk/nextjs"; 
import { UserButton } from "@clerk/nextjs"; // Import UserButton for signed-in users
import UserMenu from "./UserMenu";
import { checkUser } from "@/lib/checkuser";

const Header = async () =>{

  await checkUser();

  return (
    <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2 bg-white">
      <Link href="/" className="flex items-center">
        <Image
          src="/scheduler.png"
          width={150}
          height={60}
          alt="Register Logo"
          className="h-14 w-auto"
        />
      </Link>
      <div className="flex items-center gap-4">
        {/* Link for Create Event */}
        <Link href="/events?create=true">
          <Button className="flex items-center gap-2">
            <PenBox size={18} />
            Create Event
          </Button>
        </Link>

        {/* Conditional rendering for Login Button */}
        <SignedOut>
          <Link href="/login"> {/* Navigate to login page */}
            <Button variant="outline">Login</Button>
          </Link>
        </SignedOut>
        
        {/* Render UserButton for signed-in users */}
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
