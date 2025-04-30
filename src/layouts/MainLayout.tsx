import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import FeedbackButton from '../components/FeedbackButton';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow">
        {!isHomePage && <Breadcrumbs />}
        <Outlet />
      </main>
      <Footer />
      <FeedbackButton />
    </div>
  );
};

export default MainLayout;
