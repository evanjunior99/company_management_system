'use client'
import React, { useState } from "react";
import Swal from "sweetalert2";

const AdminRequestForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const response = await fetch("http://127.0.0.1:8000/requestAccount/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add CSRF token here if required
          // "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success", data.message || "Request submitted successfully.", "success");
        setEmail("");
      } else {
        Swal.fire("Error", data.error || "Unable to submit request.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <label htmlFor="email" className="block mb-2 font-semibold">
        Enter your email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded mb-4"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Request Admin Account
      </button>
    </form>
  );
};

export default AdminRequestForm;
