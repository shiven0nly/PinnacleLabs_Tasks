import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  return (
    <div>
      <footer className="bg-neutral-primary-soft rounded-base shadow-xs border border-default m-4">
        <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              to="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
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
              <span className="prose prose-2xl text-pretty text-primary self-center font-semibold whitespace-nowrap">
                News App
              </span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
              <li>
                <Link to="/about" className="hover:underline me-4 md:me-6">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/privacypolicy"
                  className="hover:underline me-4 md:me-6"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline me-4 md:me-6">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/news-articles" className="hover:underline">
                  News Articles
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex gap-5 justify-center mt-5">
              <li>
                <Link
                  to="/"
                  className="text-primary/80
                 hover:underline"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-primary/80
                 hover:underline"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-primary/80
                 hover:underline"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-primary/80
                 hover:underline"
                >
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-default sm:mx-auto lg:my-8" />
          <span className="block text-sm text-body sm:text-center">
            © 2026{' '}
            <Link to="/" className="hover:underline">
              News App™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
