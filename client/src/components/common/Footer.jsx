import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import NavIcon from '../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/blogs', label: 'Blogs' },
    { to: '/team', label: 'Team' },
    { to: '/privacy', label: 'Privacy' },
    { to: '/terms', label: 'Terms & Conditions' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-6 h-6" />, href: '#' },
    { icon: <Twitter className="w-6 h-6" />, href: '#' },
    { icon: <Instagram className="w-6 h-6" />, href: '#' },
    { icon: <Youtube className="w-6 h-6" />, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img className="h-10" src={NavIcon} alt="EduSphere" />
            <p className="text-gray-400 text-base">
              Empowering the next generation of web developers through expert-led courses and cutting-edge resources.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="text-gray-400 hover:text-white">
                  <span className="sr-only">{link.icon.type.name}</span>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.slice(0, 3).map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="text-base text-gray-300 hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.slice(3).map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="text-base text-gray-300 hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {currentYear} EduSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;