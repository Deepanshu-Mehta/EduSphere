import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BookOpen, User, MessageSquare, Loader } from 'lucide-react';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const [videoId, setVideoId] = useState(null);
  const [courseDetails, setCourseDetails] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/course-content/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setVideoId(response.data.vimeoVideoId);
        setCourseDetails(response.data);
      } catch (error) {
        setError('Error fetching course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Loader className="w-12 h-12 text-green-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {videoId && (
            <div className="relative pb-9/16 mb-8">
              <iframe
                src={`https://player.vimeo.com/video/${videoId}`}
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Course Video"
              ></iframe>
            </div>
          )}
          
          <div className="bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border border-gray-700">
            <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              {courseDetails.name}
            </h1>
            
            {courseDetails.description && (
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center text-green-400">
                  <BookOpen className="mr-2" /> Course Description
                </h3>
                <p className="text-gray-300">{courseDetails.description}</p>
              </div>
            )}
            
            {courseDetails.syllabus && (
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center text-blue-400">
                  <BookOpen className="mr-2" /> Syllabus
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {courseDetails.syllabus.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {courseDetails.instructor_bio && (
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center text-purple-400">
                  <User className="mr-2" /> Instructor Bio
                </h3>
                <p className="text-gray-300">{courseDetails.instructor_bio}</p>
              </div>
            )}
            
            {courseDetails.testimonials && (
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-4 flex items-center text-yellow-400">
                  <MessageSquare className="mr-2" /> Testimonials
                </h3>
                <div className="space-y-4">
                  {courseDetails.testimonials.split('\n').map((item, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-300 italic">"{item}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursePlayer;