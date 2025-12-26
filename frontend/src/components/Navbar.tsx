import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Navbar = (): JSX.Element => {
  return (
    <header className="fixed w-full top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-300 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-all duration-200 hover:opacity-80"
          >
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200 shadow-sm">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Chatty
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
