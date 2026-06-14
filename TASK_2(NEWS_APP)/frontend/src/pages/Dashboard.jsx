import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/ui/Sidebar';
import { DashboardProfile } from '@/components/DashboardProfile';
import MobileNavbar from '@/components/ui/MobileNavbar';

export const Dashboard = () => {
  const [tab, setTab] = useState('');
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    console.log('Dashboard - Tab from URL:', tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  console.log('Dashboard - Current tab state:', tab);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full pb-20 md:pb-0">
        {tab === 'profile' && <DashboardProfile />}
        {!tab && (
          <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <p className="text-lg text-muted-foreground">
              Select a section from the sidebar
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
