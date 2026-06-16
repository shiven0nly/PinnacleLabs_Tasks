import React, { useRef, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
  signOutSuccess,
  signOutFailure,
  signOutStart
} from '@/redux/user/userSlice';
import { getFilePreview, uploadFile } from '@/lib/appwrite/uploadImage';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Toaster } from 'react-hot-toast';


export const DashboardProfile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const ProfilePicRef = useRef(null);
  const dispatch = useDispatch();
  const { toast } = useToast();
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
      const updateProfile = {
        ...formData,
        profilePicture: profilePicture,
      };
      const res = await fetch(`/api/user/update/${currentUser._Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProfile),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({ title: 'Update user failed!! Please try again!' });
        dispatch(updateFailure(data.message));
      } else {
        toast({ title: 'User updated successfully!!' });
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      toast({ title: 'Update user failed!! Please try again!' });
      dispatch(updateFailure(error.message));
    }
  };

  const handleSignOut = async() => {
    try {
        dispatch(signOutStart())
        const res = await fetch("/api/user/signout", {
          method: "POST"
        })

        const data = await res.json()
        if(!res.ok){
          Toaster({title: "Internal Server Error"})
          dispatch(signOutFailure(data.message))
        }
        else {
          Toaster({title: "Signout Successfully!!"})
          dispatch(signOutSuccess(data))
        }
    } catch (error) {
      Toaster({title: "Internal Server Error"})
      dispatch(signOutFailure(error.message))
    }
  }

  const handleDeleterUser = async() =>{
    try {
        dispatch(deleteUserStart())
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        })

        const data = await res.json()

        if(!res.ok){
          dispatch(deleteUserFailure(data.message))
        } 
        else {
          Toaster({title: "Deleted User Successfully!"})
          dispatch(deleteUserSuccess())
        }
    } catch (error) {
      toast({title: "Internal Server Error"})
      dispatch(deleteUserFailure(error.message))
    }
  }

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
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={handleDeleterUser}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        <Button onClick={handleSignOut} variant="destructive" className="cursor-pointer">
          Sign Out
        </Button>
      </div>
      <p className='text-red-600'>{error}</p>
    </div>
  );
};
