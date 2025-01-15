'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface AdminRequest {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  gender: string;
  role: string; // Default is 'admin'
  password: string;
  confirm_password: string;
}

const CreateAdminAccount = () => {
  const [accountRequest, setAccountRequest] = useState<AdminRequest>({
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    gender: '',
    role: 'admin',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccountRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password validation
    if (accountRequest.password !== accountRequest.confirm_password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match.',
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', accountRequest.email);
      formData.append('first_name', accountRequest.first_name);
      formData.append('last_name', accountRequest.last_name);
      formData.append('dob', accountRequest.dob);
      formData.append('gender', accountRequest.gender);
      formData.append('role', accountRequest.role);
      formData.append('password', accountRequest.password);

      const response = await fetch('http://localhost:8000/api/auth/registration/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your request has been sent to a superuser for approval.',
        });
        setAccountRequest({
          first_name: '',
          last_name: '',
          email: '',
          dob: '',
          gender: '',
          role: 'admin',
          password: '',
          confirm_password: '',
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.error || 'An unexpected error occurred.',
        });
      }
    } catch (error) {
      console.error('Error submitting admin request:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit the request. Please try again.',
      });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="First Name"
                value={accountRequest.first_name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Last Name"
                value={accountRequest.last_name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={accountRequest.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={accountRequest.dob}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={accountRequest.gender}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={accountRequest.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              value={accountRequest.confirm_password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Request
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateAdminAccount;
