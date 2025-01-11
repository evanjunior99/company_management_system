'use client'
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const UserDashBoard = () => {
  const cards = [
    { title: "Total Tasks", value: 120, bgColor: "bg-blue-500" },
    { title: "Tasks Completed", value: 90, bgColor: "bg-green-500" },
    { title: "Pending Tasks", value: 30, bgColor: "bg-yellow-500" },
    { title: "Overdue Tasks", value: 5, bgColor: "bg-red-500" },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div className="p-4">
      {/* Dashboard Header */}
      <div
        className="text-center font-bold text-xl text-blue-600 mb-6"
        data-aos="fade-up"
      >
        User Dashboard
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md text-white ${card.bgColor}`}
            data-aos="fade-up"
            data-aos-delay={index * 200} // Delay for staggered animation
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Additional Features */}
      <div className="mt-8">
        <h2
          className="text-lg font-bold mb-4"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          Additional Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card for Upcoming Deadlines */}
          <div
            className="p-4 rounded-lg shadow-md bg-purple-500 text-white"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
            <p className="text-2xl font-bold mt-2">3</p>
            <p className="mt-1 text-sm">Due within the next week</p>
          </div>

          {/* Card for Notifications */}
          <div
            className="p-4 rounded-lg shadow-md bg-indigo-500 text-white"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            <h3 className="text-lg font-semibold">Notifications</h3>
            <p className="text-2xl font-bold mt-2">12</p>
            <p className="mt-1 text-sm">Unread notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
