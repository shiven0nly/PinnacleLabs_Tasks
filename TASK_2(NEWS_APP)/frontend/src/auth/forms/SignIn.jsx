import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/user/userSlice';

export const SignIn = () => {
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
          <p className="flex justify-center items-center text-4xl gap-3">
            <span>
              <img src="/favicon.svg" alt="logo" />
            </span>
            <span className="text-primary">News App</span>
          </p>
          <div className="flex flex-col justify-center items-start mt-10 ml-5">
            <p className="text-2xl font-semibold flex justify-start ml-10">
              Welcome, login your account
            </p>
            <p className="flex justify-start items-center text-xl font-mono mt-3 text-muted-foreground">
              Read the latest news from around the world
            </p>
          </div>
        </div>

        {/* right side */}
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="w-full max-w-md">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  alt="News App"
                  src="/favicon.svg"
                  className="mx-auto h-full w-auto text-primary"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-foreground">
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
                        className="block w-full rounded-md bg-transparent px-3 py-1.5 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground focus:outline-2 focus:-outline-offset-2 focus:outline-ring sm:text-sm/6 hover:rounded-full"
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
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-transparent px-3 py-1.5 text-base text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground focus:outline-2 focus:-outline-offset-2 focus:outline-ring sm:text-sm/6 hover:rounded-full"
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
