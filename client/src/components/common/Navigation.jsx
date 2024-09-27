import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext.jsx';
import { Menu, X, LogIn, LogOut, User, Book, Home } from 'lucide-react';
import NavIcon from '../../assets/logo.png';


const Navigation = () => {
  const { isAuthenticated, hasPurchasedCourses, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { to: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { to: '/blogs', label: 'Blogs', icon: <Book className="w-5 h-5" /> },
    { to: '/courses', label: 'Courses', icon: <Book className="w-5 h-5" /> },
    { to: '/team', label: 'Meet Team', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-12 w-12" src={NavIcon} alt="EduSphere" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <>
                  {hasPurchasedCourses && (
                    <Link to="/my-courses" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      My Courses
                    </Link>
                  )}
                  <button onClick={logout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Register
                  </Link>
                  <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={toggleMenu}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                {hasPurchasedCourses && (
                  <Link to="/my-courses" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
                    My Courses
                  </Link>
                )}
                <button onClick={() => { logout(); toggleMenu(); }} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center">
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center" onClick={toggleMenu}>
                  <User className="w-5 h-5 mr-2" />
                  Register
                </Link>
                <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center" onClick={toggleMenu}>
                  <LogIn className="w-5 h-5 mr-2" />
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;