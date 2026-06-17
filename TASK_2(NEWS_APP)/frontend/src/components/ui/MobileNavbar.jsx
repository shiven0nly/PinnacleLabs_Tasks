import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, House, LogOut, CircleFadingPlus, CircleCheck } from 'lucide-react';
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
      const res = await fetch('/api/user/signout', {
        method: 'POST',
        credentials: 'include',
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
        <ul className="list-none">
          <li>
            <Link
              to="/"
              className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              <House size={20} />
              <span className="text-xs">Home</span>
            </Link>
          </li>

          <li>
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
          </li>

          <li>
            <Link
              to="/create-post"
              className={`flex flex-col items-center gap-1 transition-colors ${
                tab === 'profile'
                  ? 'text-primary'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary'
              }`}
            >
              <CircleFadingPlus size={20} />
              <span className="text-xw">Create Post</span>
            </Link>
          </li>

          <li>
            <Link
              to="/your-articles"
              className={`flex flex-col items-center gap-1 transition-colors ${
                tab === 'profile'
                  ? 'text-primary'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary'
              }`}
            >
              <CircleCheck size={20} />
              <span className="text-xw">Your Articles</span>
            </Link>
          </li>

          <li>
            <Button onClick={handleSignout} variant="destructive">
              <LogOut size={20} />
              <span className="text-xs">Sign Out</span>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileNavbar;
