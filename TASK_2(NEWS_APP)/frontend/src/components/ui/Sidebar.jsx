import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, CircleFadingPlus } from 'lucide-react';
import { Button } from './button';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '@/redux/user/userSlice';

const Sidebar = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
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
    <div className="w-64 h-screen bg-gray-50 dark:bg-gray-900 border-r">
      <aside className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-center items-center gap-2 p-6 border-b">
          <span>
            <svg
              aria-label="Logo"
              role="img"
              fill="primary"
              height="2em"
              viewBox="0 0 324 323"
              width="2em"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary fill-primary"
              {...props}
            >
              <rect
                fill="currentColor"
                height="323"
                rx="161.5"
                width="323"
                x="0.5"
              />
              <circle
                cx="162"
                cy="161.5"
                fill="white"
                r="60"
                className="fill-accent"
              />
            </svg>
          </span>
          <span className="prose-black prose-xl font-bold">Dashboard</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard?tab=profile"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  tab === 'profile'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </Link>
            </li>
            <li>
              <Link  to="/create-post"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  tab === 'profile'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}>
                  <CircleFadingPlus className='w-5 h-5' /> 
                  <span className='font-medium'>Create Post</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={handleSignout}
          >
            <LogOut className="w-5 h-5" />
            <Button variant="destructive">Log Out</Button>
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
