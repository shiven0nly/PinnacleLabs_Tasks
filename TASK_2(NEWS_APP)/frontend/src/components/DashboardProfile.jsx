import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from './ui/input';
import { Button } from './ui/button';

export const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const ProfilePicRef = useRef(null);

  console.log('DashboardProfile - currentUser:', currentUser);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 w-full">
      <h1 className="text-center font-bold text-3xl mb-8">
        Update Your Profile
      </h1>

      <form className="flex flex-col gap-6">
        {/* Profile Picture */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={ProfilePicRef}
          onChange={handleImageChange}
        />
        <div className="w-32 h-32 self-center cursor-pointer overflow-hidden rounded-full shadow-lg">
          <img
            src={imageUrl || currentUser?.profilePicture}
            alt="user profile"
            onClick={() => ProfilePicRef.current.click()}
            className="w-full h-full object-cover border-4 border-primary"
          />
        </div>

        {/* Username Input */}
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser?.username}
            className="h-12 border rounded-lg"
          />
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser?.email}
            className="h-12 border rounded-lg"
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            type="password"
            id="password"
            placeholder="New Password"
            className="h-12 border rounded-lg"
          />
        </div>

        {/* Update Button */}
        <Button
          type="submit"
          variant="default"
          className="w-full h-12 rounded-lg"
        >
          Update Profile
        </Button>
      </form>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="destructive" className="cursor-pointer">
          Delete Account
        </Button>
        <Button variant="destructive" className="cursor-pointer">
          Sign Out
        </Button>
      </div>
    </div>
  );
};
