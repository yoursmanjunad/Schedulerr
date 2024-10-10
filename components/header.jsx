import Link from "next/link"; // Use next/link for navigation
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { PenBox } from "lucide-react";
const Header = () => {
  return (
    <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2">
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

  {/* Link for Login */}
  <Link href="/login">   {/* Assuming you want the Login button to redirect to a login page */}
    <Button variant="outline">
      Login
    </Button>
  </Link>
</div>
</nav>
  );
};

export default Header;
