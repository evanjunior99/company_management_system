'use client';

import React, { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link'; // For navigation to other pages (if using Next.js)
import Swal from 'sweetalert2'; // Import SweetAlert2

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth/loggin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        // Store JWT tokens in localStorage or sessionStorage
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);

        // Display success alert using SweetAlert
        Swal.fire({
          title: 'Success!',
          text: 'Login successful. Redirecting to the dashboard.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect to the admin dashboard after login
          if (data.role === 'admin') {
            window.location.href = '/admin';
          } else {
            // If not an admin, display an error or redirect to an employee dashboard or login page
            Swal.fire({
              title: 'Access Denied!',
              text: 'You are not authorized to access the admin dashboard.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'An error occurred. Please try again.');

        // Display error alert using SweetAlert
        Swal.fire({
          title: 'Error!',
          text: errorData.error || 'An error occurred. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
      console.error('Login failed:', error);

      // Display network error alert using SweetAlert
      Swal.fire({
        title: 'Error!',
        text: 'Network error. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
                required
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="text-red-500 text-sm text-center mt-4">{errorMessage}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 text-sm text-center text-gray-600">
          <p>
            Don't have an account?{' '}
            <Link href="/admin/accountRequest" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>
          <p className="mt-2">
            <Link href="/pages/ForgotPassword" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
