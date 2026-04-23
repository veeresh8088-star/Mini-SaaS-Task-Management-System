import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <Outlet />
      </main>
      <Toaster position="top-right" />
      <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-200">
        &copy; {new Date().getFullYear()} TaskFlow SaaS. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
