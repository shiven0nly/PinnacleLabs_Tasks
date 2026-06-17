import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="bg-card hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] border border-border">
      {/* Link wrapping the image */}
      <Link
        to={`/post/${post.slug}`}
        className="block h-[250px] w-full overflow-hidden"
      >
        <img
          src={post.image}
          alt="post cover"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 bg-muted"
        />
      </Link>

      {/* Content Section */}
      <div className="p-3 flex flex-col gap-2">
        {/* Post Title */}
        <p className="text-lg font-semibold line-clamp-1 text-card-foreground">
          {post.title}
        </p>

        {/* Post Category */}
        <span className="italic text-[16px] text-muted-foreground">
          {post.category}
        </span>

        {/* Read Article Button */}
        <Link
          to={`/post/${post.slug}`}
          className="border border-border text-foreground hover:bg-primary hover:text-primary-foreground text-center py-2 rounded-md mt-auto"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
