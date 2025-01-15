import React from 'react';
import UserNavBar from './UserNavBar';
import UserSideBar from './UserSideBar';
import UserDashBoard from './UserDashBoard';

const Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin Navbar */}
      <UserNavBar />

      {/* Main content area: Sidebar and Dashboard */}
      <div className="flex flex-1">
        {/* Admin Sidebar */}
        <UserSideBar />

        {/* Admin Dashboard */}
        <div className="flex-1 p-6 overflow-auto">
          <UserDashBoard />
        </div>
      </div>
    </div>
  );
};

export default Page;
