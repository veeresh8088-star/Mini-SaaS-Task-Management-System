import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, CheckSquare, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-600">
          <CheckSquare className="w-6 h-6" />
          <span>TaskFlow</span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2 text-slate-600">
                <UserIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary-600">
                Login
              </Link>
              <Link to="/signup" className="btn-primary text-sm py-1.5">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
