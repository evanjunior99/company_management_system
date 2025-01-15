'use client'
import React, { useState } from 'react';

interface Account {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  gender: string;
  password: string;
  confirm_password: string;
}

const CreateAccount = () => {
  const [account, setAccount] = useState<Account>({
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    gender: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (account.password !== account.confirm_password) {
      alert('Passwords do not match!');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('email', account.email);
      formData.append('first_name', account.first_name);
      formData.append('last_name', account.last_name);
      formData.append('dob', account.dob);
      formData.append('gender', account.gender);
      formData.append('password', account.password);
  
      const response = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        body: formData,
      });
  
      // Check if the response is JSON or HTML
      if (response.ok) {
        const contentType = response.headers.get('Content-Type');
        const isJson = contentType && contentType.includes('application/json');
  
        if (isJson) {
          const data = await response.json();
          alert('Account created successfully!');
          setAccount({
            first_name: '',
            last_name: '',
            email: '',
            dob: '',
            gender: '',
            password: '',
            confirm_password: '',
          });
        } else {
          const text = await response.text();
          console.error('Unexpected response format:', text);
          alert('Unexpected response from the server.');
        }
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Fields */}
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
                value={account.first_name}
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
                value={account.last_name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={account.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Other fields (DOB, Gender, Phone Number, Password) */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={account.dob}
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
                value={account.gender}
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

          {/* Password and Confirm Password */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={account.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                value={account.confirm_password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateAccount;
