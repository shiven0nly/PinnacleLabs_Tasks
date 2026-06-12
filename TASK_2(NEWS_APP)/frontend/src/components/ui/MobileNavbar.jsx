import React from 'react';
import { Link } from 'react-router-dom';
import { User, House, LogOut } from 'lucide-react';

const MobileNavbar = () => {
  return (
    <div>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-primary-foreground border-t border-gray-700"></nav>
      <Link to="/" className="flex flex-col items-center text-slate-800">
        <House size={20} />
        <span className="text-xs"> Home</span>
      </Link>

      <Link
        to="/dashboard?tab=profile"
        className="flex flex-col items-center text-slate-800"
      >
        <User size={20} />
        <span className="text-xs"> Profile</span>
      </Link>

      <Button
        variant="outline"
        className="flex flex-col items-center text-slate-800"
      >
        <LogOut size={20} />
        <span className="text-xs">Log Out</span>
      </Button>
    </div>
  );
};

export default MobileNavbar;
