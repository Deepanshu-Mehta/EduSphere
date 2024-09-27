import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');
    const courseIds = JSON.parse(query.get('course_id') || '[]');

    if (sessionId && courseIds.length > 0) {
      const storePurchase = async () => {
        try {
          await axios.post('http://localhost:3000/store-purchase/store-purchase', {
            courseIds: courseIds
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
        } catch (error) {
          console.error('Error storing purchase:', error);
        }
      };

      storePurchase();
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <CheckCircle className="mx-auto h-24 w-24 text-green-400" />
          <h2 className="mt-6 text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Purchase Successful!
          </h2>
          <p className="mt-2 text-xl text-gray-300">
            You've taken a big step towards your tech goals!
          </p>
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <p className="text-lg text-gray-300 mb-4">
            Your courses are now ready for you to dive in and start learning.
          </p>
          <div className="w-full h-48 overflow-hidden rounded-lg mb-6">
            <iframe
              src="https://giphy.com/embed/t3sZxY5zS5B0z5zMIz"
              width="100%"
              height="100%"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/my-courses"
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center justify-center transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
          >
            Go to My Courses <BookOpen className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/courses"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center justify-center transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
          >
            Explore More Courses <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;