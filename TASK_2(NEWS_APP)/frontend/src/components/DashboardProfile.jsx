import React from 'react';
import { useSelector } from 'react-redux';
import { Input } from './ui/input';
import { Button } from './ui/button';

export const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center text-accent font-bold text-3xl font-serif">
        Update Your Profile
      </h1>

      <form className="flex flex-col items-center gap-4">
        <div ClassName="w-32 h-32 self-cetner cursor-pointer overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user pfp"
            className="w-full h-full object-cover border-4 border-primary rounded-full"
          />
        </div>

        <Input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="h-12 border-accent-foreground rounded-lg focus-visible:ring-1 focus-visible:ring-accent"
        />
        <Input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="h-12 border-accent-foreground rounded-lg focus-visible:ring-1 focus-visible:ring-accent"
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          className="h-12 border-accent-foreground rounded-lg focus-visible:ring-1 focus-visible:ring-accent"
        />
        <Button
          type="submit"
          variant="default"
          className="w-full h-12 rounded-lg cursor-pointer"
        >
          Update Profile
        </Button>
      </form>
      <div className="flex justify-between mt-5">
        <Button className="cursor-pointer" variant="destructive">
          Delete Account
        </Button>
        <Button className="cursor-pointer" variant="destructive">
          Sign Out
        </Button>
      </div>
    </div>
  );
};
