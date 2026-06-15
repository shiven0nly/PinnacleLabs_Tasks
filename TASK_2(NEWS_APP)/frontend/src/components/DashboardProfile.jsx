import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { updateStart } from '@/redux/user/userSlice';
import { getFilePreview, uploadFile } from '@/lib/appwrite/uploadImage';
import useToast from 'react';

export const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const ProfilePicRef = useRef(null);
  const dispatch = useDispatch();
  const toast = useToast();
  const [formData, setFormData] = useState({});

  console.log('DashboardProfile - currentUser:', currentUser);

  const uploadImage = async () => {
    if (!imageFile) {
      return currentUser.profilePicture;
    }
    try {
      const uploadedFile = await uploadFile(imageFile);
      const profilePictureUrl = getFilePreview(uploadedFile.$id);
      return profilePictureUrl;
    } catch (error) {
      toast({ title: 'Update user failed!! Please try again!' });
      console.log('Image upload failed: ', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      // wait for image upload
      const profilePicture = await uploadImage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 w-full">
      <h1 className="text-center font-bold text-3xl mb-8">
        Update Your Profile
      </h1>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
            defaultValue={currentUser.username}
            className="h-12 border rounded-md border border-primary/20 hover:rounded-xl"
            onChange={handleChange}
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
            defaultValue={currentUser.email}
            className="h-12 border rounded-lg border-primary/20 rounded-md hover:rounded-xl"
            onChange={handleChange}
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
            placeholder="Password Not Visible Here"
            className="h-12 border rounded-lg pointer-events-none caret-transparent select-default cursor-default border-primary/20"
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
