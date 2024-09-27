import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Loader, BookOpen, Video } from 'lucide-react';

const CourseContent = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/course-content/course-content/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(response.data);
      } catch (error) {
        setError('Error fetching course content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseContent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Loader className="w-12 h-12 text-green-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="text-white text-2xl">No course content available.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            {course.name}
          </h1>
          
          <div className="bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-400">
              <BookOpen className="mr-2" /> Course Description
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">{course.description}</p>
            
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-400">
              <Video className="mr-2" /> Course Video
            </h2>
            <div className="relative pt-16:9 rounded-lg overflow-hidden">
              <video 
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={course.videoUrl} 
                controls 
                poster="/api/placeholder/640/360"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseContent;