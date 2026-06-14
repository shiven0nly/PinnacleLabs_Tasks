import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, House, LogOut } from 'lucide-react';
import { Button } from './button';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '@/redux/user/userSlice';

const MobileNavbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/sign-out', {
        method: 'POST',
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="flex justify-around items-center h-16 px-4">
        <Link
          to="/"
          className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
        >
          <House size={20} />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to="/dashboard?tab=profile"
          className={`flex flex-col items-center gap-1 transition-colors ${
            tab === 'profile'
              ? 'text-primary'
              : 'text-gray-600 dark:text-gray-400 hover:text-primary'
          }`}
        >
          <User size={20} />
          <span className="text-xs">Profile</span>
        </Link>

        <button
          onClick={handleSignout}
          className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
          <span className="text-xs">Log Out</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNavbar;
