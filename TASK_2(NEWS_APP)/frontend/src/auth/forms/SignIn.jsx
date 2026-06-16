import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/user/userSlice';

export const SignIn = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    setError(null);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:5000/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to sign in');
      }

      dispatch(signInSuccess(result));
      toast.success('Signed in successfully!');
      navigate('/');
    } catch (err) {
      dispatch(signInFailure(err.message));
      setError(err.message);
      toast.error(err.message);
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* left side */}
        <div className="flex flex-col justify-center items-center h-screen border-r border-border bg-amber-200">
          <p className="flex justify-center items-center gap-3">
            <span>
              <svg
                aria-label="Logo"
                role="img"
                fill="primary"
                height="3em"
                viewBox="0 0 324 323"
                width="3em"
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
            <span className="text-primary text-4xl text-bold">News App</span>
          </p>
          <div className="flex flex-col justify-center items-start mt-10 ml-5">
            <p className="text-2xl font-semibold flex justify-start ml-10">
              Welcome, create your account
            </p>
            <p className="flex justify-start items-center text-xl font-mono mt-3 text-muted-foreground">
              Read the latest news from around the world
            </p>
          </div>
        </div>

        {/* right side */}
        <div className="flex flex-col justify-center lg:px-8 items-center">
          <div className="w-full max-w-md">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center gap-3">
                <span>
                  <svg
                    aria-label="Logo"
                    role="img"
                    fill="primary"
                    height="3em"
                    viewBox="0 0 324 323"
                    width="3em"
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
                <h2 className="mt-1 text-center text-2xl/9 font-bold tracking-tight text-foreground">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {error && (
                  <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20 text-center">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-foreground"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="joedohn@gmail.com"
                        className="block w-full rounded-md bg-transparent px-3 py-1.5 text-foreground outline-1 -outline-offset-1 outline-accent-foreground placeholder:text-muted-foreground focus:outline-2 focus:-outline-offset-2 focus:outline-ring sm:text-sm/6 hover:rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm/6 font-medium text-foreground"
                      >
                        Password
                      </label>
                      <div className="text-sm">
                        <Link
                          to="/sign-up"
                          className="font-semibold text-primary hover:text-primary/80 cursor-pointer"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="......"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-transparent px-3 py-1.5 text-foreground outline-1 -outline-offset-1 outline-accent-foreground placeholder:text-muted-foreground focus:outline-2 focus:-outline-offset-2 focus:outline-ring sm:text-sm/6 hover:rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-primary-foreground hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer disabled:opacity-50"
                    >
                      {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                  </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-muted-foreground">
                  Not a member?{' '}
                  <Link
                    to="/sign-up"
                    className="font-semibold text-primary hover:text-primary/80 cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

