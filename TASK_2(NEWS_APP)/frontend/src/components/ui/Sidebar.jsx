import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from './button';
import { LogOut } from '@hugeicons/core-free-icons/index';

const Sidebar = () => {
  return (
    <div className="w-64">
      <aside className="flex flex-col gap-4 bg-accent h-screen">
        <div className="flex justify-center items-center gap-2">
          <img src="/favicon.svg" alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold">Dashboard</span>
        </div>

        {/*Navigation Links*/}
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to={'/dashboard?tab=profile'}
                className="flex items-center gap-2 hover:bg-accent-foreground/50 rounded-full p-2"
              >
                <User className="mr-3" />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
          <div className="border-t border-primary-foreground hover:bg-accent-foreground/50 rounded-full p-2">
            <Button variant="outline" className="w-full">
              <LogOut className="mr-3" />
              <span>Log Out</span>
            </Button>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
