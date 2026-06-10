import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer class="bg-neutral-primary-soft rounded-base shadow-xs border border-default m-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <Link
              to="/"
              class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src="/favicon.svg" class="h-7" alt="Flowbite Logo" />
              <span class="text-heading self-center text-2xl font-semibold whitespace-nowrap">
                News App
              </span>
            </Link>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
              <li>
                <Link to="/about" class="hover:underline me-4 md:me-6">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacypolicy" class="hover:underline me-4 md:me-6">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/sign-in" class="hover:underline me-4 md:me-6">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/sign-up" class="hover:underline">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex gap-5 justify-center mt-5">
              <li>
                <Link to="/" className="text-muted hover:underline">
                  Instagram
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted hover:underline">
                  Facebook
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted hover:underline">
                  Twitter
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted hover:underline">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
          <hr class="my-6 border-default sm:mx-auto lg:my-8" />
          <span class="block text-sm text-body sm:text-center">
            © 2026{' '}
            <Link to="/" class="hover:underline">
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
