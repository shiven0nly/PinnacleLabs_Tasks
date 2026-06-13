import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from './ui/input';
import { Button } from './ui/button';

export const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const ProfilePicRef = useRef(null);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center text-accent font-bold text-3xl font-serif">
        Update Your Profile
      </h1>

      <form className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={ProfilePicRef}
        />
        <div ClassName="w-32 h-32 self-cetner cursor-pointer overflow-hidden rounded-full">
          <img
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : currentUser.profilePicture
            }
            type="file"
            onClick={() => ProfilePicRef.current.click()}
            onChange={(e) => handleImageChange(e)}
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
