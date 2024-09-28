// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // Import images
// import course1 from "../../assets/courses-images/1.png";
// import course2 from "../../assets/courses-images/2.png";
// import course3 from "../../assets/courses-images/3.png";
// import course4 from "../../assets/courses-images/4.png";
// import course5 from "../../assets/courses-images/5.png";

// const MyCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Function to refresh the token
//   async function refreshToken() {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/auth/refresh-token",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       const newToken = response.data.token;
//       localStorage.setItem("token", newToken);
//       return newToken;
//     } catch (error) {
//       throw error;
//     }
//   }

//   // Function to fetch purchased courses
//   async function fetchPurchasedCourses() {
//     try {
//       let token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:3000/purchased/purchased-courses",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setCourses(uniqueCourses);
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         // Token might be expired, try refreshing it
//         try {
//           token = await refreshToken();
//           const response = await axios.get(
//             "http://localhost:3000/purchased/purchased-courses",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           const uniqueCourses = removeDuplicates(response.data);
//           setCourses(uniqueCourses);
//         } catch (refreshError) {
//           setError("Error refreshing token and fetching courses");
//           console.error(
//             "Error refreshing token and fetching courses:",
//             refreshError
//           );
//         }
//       } else {
//         setError("Error fetching purchased courses");
//         console.error("Error fetching purchased courses:", error);
//       }
//     }
//   }

//   // Function to remove duplicate courses
//   function removeDuplicates(courses) {
//     const uniqueCourses = [];
//     const courseIds = new Set();

//     for (const course of courses) {
//       if (!courseIds.has(course.id)) {
//         uniqueCourses.push(course);
//         courseIds.add(course.id);
//       }
//     }

//     return uniqueCourses;
//   }

//   useEffect(() => {
//     fetchPurchasedCourses();
//   }, []);

//   useEffect(() => {
//   }, [courses]);

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   // Map course names to imported images
//   const imageMap = {
//     "Learn About Kafka and Node.js": course1,
//     "React, but with webpack": course2,
//     "Learn About Terraform in Depth": course3,
//     "Kubernetes and Docker for deployment": course4,
//     "Create your own Serverless web app": course5,
//   };

//   const handleCourseClick = (courseId) => {
//     navigate(`/course-player/${courseId}`);
//   };

//   return (
//     <section className="py-4 flex flex-col justify-center items-center max-w-5xl mx-auto">
//       <div className="mt-36">
//           <h1 className="text-3xl font-bold text-center text-gray-100 mb-4">
//             Your Purchased Courses 🎉
//           </h1>
//           <p className="mb-12 text-center text-gray-300">Gear up your development skills to next level with these mindblowing courses</p>
//           {courses.length === 0 ? (
//             <p className="text-center text-gray-200">No courses found.</p>
//           ) : (
//             <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
//               {courses.map((course) => (
//                 <div
//                   className="bg-[#001313] overflow-hidden text-green-300 hover:text-green-400 shadow-sm shadow-green-300 rounded-sm hover:shadow-green-300 transform transition-transform duration-300 hover:scale-105"
//                   key={course.id}
//                 >
//                   <img
//                     src={imageMap[course.name]}
//                     alt={course.name}
//                     className="w-full h-auto object-cover"
//                   />
//                   <div className="p-4">
//                     <h2
//                       className="text-xl font-semibold cursor-pointer"
//                       onClick={() => handleCourseClick(course.id)}
//                     >
//                       {course.name}
//                     </h2>
//                     <p className="text-gray-200">{course.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//     </section>
//   );
// };

// export default MyCourses;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight } from 'lucide-react';

// Import images
import course1 from "../../assets/courses-images/1.png";
import course2 from "../../assets/courses-images/2.png";
import course3 from "../../assets/courses-images/3.png";
import course4 from "../../assets/courses-images/4.png";
import course5 from "../../assets/courses-images/5.png";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to refresh the token
  async function refreshToken() {
    try {
      const response = await axios.post(
        "https://edusphere-gk36.onrender.com/auth/refresh-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      return newToken;
    } catch (error) {
      throw error;
    }
  }

  // Function to fetch purchased courses
  async function fetchPurchasedCourses() {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.get(
        "https://edusphere-gk36.onrender.com/purchased/purchased-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const uniqueCourses = removeDuplicates(response.data);
      setCourses(uniqueCourses);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Token might be expired, try refreshing it
        try {
          const newToken = await refreshToken();
          const response = await axios.get(
            "https://edusphere-gk36.onrender.com/purchased/purchased-courses",
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          const uniqueCourses = removeDuplicates(response.data);
          setCourses(uniqueCourses);
        } catch (refreshError) {
          setError("Error refreshing token and fetching courses");
          console.error(
            "Error refreshing token and fetching courses:",
            refreshError
          );
        }
      } else {
        setError("Error fetching purchased courses");
        console.error("Error fetching purchased courses:", error);
      }
    }
  }

  // Function to remove duplicate courses
  function removeDuplicates(courses) {
    const uniqueCourses = [];
    const courseIds = new Set();

    for (const course of courses) {
      if (!courseIds.has(course.id)) {
        uniqueCourses.push(course);
        courseIds.add(course.id);
      }
    }

    return uniqueCourses;
  }

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  // Map course names to imported images
  const imageMap = {
    "Learn About Kafka and Node.js": course1,
    "React, but with webpack": course2,
    "Learn About Terraform in Depth": course3,
    "Kubernetes and Docker for deployment": course4,
    "Create your own Serverless web app": course5,
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course-player/${courseId}`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-2xl bg-gray-800 p-8 rounded-xl shadow-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <section className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Your Tech Journey Unfolds Here 🚀
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dive into your purchased courses and continue your path to becoming a top-tier developer. Each course is a stepping stone to greatness!
          </p>
        </section>

        {courses.length === 0 ? (
          <div className="text-center bg-gray-800 p-12 rounded-xl shadow-lg">
            <BookOpen className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <p className="text-2xl text-gray-300 mb-8">Your course library is empty. Time to embark on a new learning adventure!</p>
            <button 
              onClick={() => navigate('/courses')} 
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
            >
              Explore Courses <ChevronRight className="ml-2" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-700"
              >
                <img
                  src={imageMap[course.name]}
                  alt={course.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2
                    className="text-2xl font-semibold mb-4 text-green-400 hover:text-green-300 transition-colors duration-300 cursor-pointer"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    {course.name}
                  </h2>
                  <p className="text-gray-300 mb-6">{course.description}</p>
                  <button
                    onClick={() => handleCourseClick(course.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300"
                  >
                    Continue Learning <ChevronRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;