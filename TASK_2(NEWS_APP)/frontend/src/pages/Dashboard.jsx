import Sidebar from '@/components/ui/Sidebar';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardProfile from '@/components/DashboardProfile';
import MobileNavbar from '@/components/ui/MobileNavbar';

export const Dashboard = () => {
  const { tab, setTab } = useState('');

  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row w-full">
        {/*SideBar*/}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/*Mobile footer Navbar*/}
        <div>
          <MobileNavbar />
        </div>
        {/*Profile*/}
        <div>{tab === 'profile' && <DashboardProfile />}</div>
      </div>
    </>
  );
};
