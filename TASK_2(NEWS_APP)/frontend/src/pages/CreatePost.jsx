import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getFilePreview, uploadFile } from '@/lib/appwrite/uploadImage';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({});
  console.log('Current formData:', formData);

  const [createPostError, setCreatePostError] = useState(null);
  const [ReactQuill, setReactQuill] = useState(null);

  useEffect(() => {
    import('react-quill').then((module) => {
      const ReactQuillComponent = module.default;

      if (
        ReactQuillComponent &&
        ReactQuillComponent.prototype &&
        typeof ReactQuillComponent.prototype.getEditingArea === 'function'
      ) {
        ReactQuillComponent.prototype.getEditingArea = function () {
          if (!this.editingArea) {
            throw new Error('Instantiating on missing editing area');
          }
          const element = this.editingArea;
          if (!element) {
            throw new Error('Cannot find element for editing area');
          }
          if (element.nodeType === 3) {
            throw new Error('Editing area cannot be a text node');
          }
          return element;
        };
      }

      setReactQuill(() => ReactQuillComponent);
    });
  }, []);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image!');
        toast({ title: 'Please select an image!' });
        return;
      }

      setImageUploading(true);
      setImageUploadError(null);

      const uploadedFile = await uploadFile(file);
      const postImageUrl = getFilePreview(uploadedFile.$id);

      console.log('Uploaded image URL:', postImageUrl);

      setFormData((prevData) => ({ ...prevData, image: postImageUrl }));
      
      toast({ title: 'Image Uploaded Successfully!' });
      setImageUploading(false);
    } catch (error) {
      setImageUploadError('Image upload failed');
      console.log('Image upload error:', error);

      toast({ title: 'Image upload failed!' });
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important: include cookies for authentication
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({ title: data.message || 'Something went wrong! Please try again.' });
        setCreatePostError(data.message);

        return;
      }

      if (res.ok) {
        toast({ title: 'Article Published Successfully!' });
        setCreatePostError(null);

        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast({ title: 'Something went wrong! Please try again.' });
      setCreatePostError('Something went wrong! Please try again.');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-primary">
        Create a post
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="w-full sm:w-3/4 h-12 border border-primary/60 hover:rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="w-full sm:w-1/4 h-12 border border-primary/60 hover:rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="worldnews">World News</SelectItem>
                <SelectItem value="sportsnews">Sports News</SelectItem>
                <SelectItem value="localnews">Local News</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-primary/80 border-dotted p-3">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button type="button" variant="outline" onClick={handleUploadImage}>
            {imageUploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </div>

        {imageUploadError && <p className="text-destructive">{imageUploadError}</p>}

        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        {ReactQuill ? (
          <ReactQuill
            theme="snow"
            placeholder="Write something here..."
            className="h-72 mb-12"
            required
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
          />
        ) : (
          <div className="h-72 mb-12 rounded-lg border border-dashed border-primary/40 flex items-center justify-center text-muted-foreground">
            Loading editor...
          </div>
        )}

        <Button
          type="submit"
          variant="outline"
          className="h-12 bg-secondary text-secondary-foreground font-semibold max-sm:mt-5 text-md hover:bg-secondary/80"
        >
          Publish Your Article
        </Button>

        {createPostError && (
          <p className="text-destructive mt-5">{createPostError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
