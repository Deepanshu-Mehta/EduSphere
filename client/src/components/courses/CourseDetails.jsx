import React from 'react';
import { useParams } from "react-router-dom";
import { BookOpen, User, List, Loader } from 'lucide-react';

const courseDetailsData = {
  1: {
    course_name: "Real-Time Data Streaming",
    syllabus: "Learn about Kafka Architecture, Use Kafkajs with Node.js",
    instructor_bio: "John Doe is a seasoned Kafka expert...",
    prerequisites: "a little bit of Node.js knowledge, and you laptop, yes, just that.."
  },
  2: {
    course_name: "Create React App with Webpack",
    syllabus: "enhance your app, advanced state management",
    instructor_bio: "Jane Smith is a leading React developer...",
    prerequisites: "No Preq. Let's just dive in…"
  },
  3: {
    course_name: "Learn about Terraform in detail",
    syllabus: "Learn to Create CI/CD pipelines, Automate the deployment process",
    instructor_bio: "Mike Johnson has over 10 years of Terraform experience...",
    prerequisites: "Just you and your Laptop."
  },
  4: {
    course_name: "Learn in depth about Kubernetes",
    syllabus: "Create clusters, Learn the intricacies of K8s",
    instructor_bio: "Emily Davis has built numerous full stack applications...",
    prerequisites: "A basic knowledge about Node.js. Just that."
  },
  5: {
    course_name: "Create your first own server less web app",
    syllabus: "Use various AWS products like: S3 bucket, EC2 and many more..",
    instructor_bio: "Chris Wilson is a AWS guru...",
    prerequisites: "AWS account…"
  }
};

const CourseDetails = () => {
  const { id } = useParams();
  const courseDetails = courseDetailsData[id];

  if (!courseDetails) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Loader className="w-12 h-12 text-green-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
          <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            {courseDetails.course_name}
          </h2>
          
          <div className="space-y-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 flex items-center text-green-400">
                <BookOpen className="mr-2" /> What will be Covered?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {courseDetails.syllabus}
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 flex items-center text-blue-400">
                <User className="mr-2" /> Who is the Instructor?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {courseDetails.instructor_bio}
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 flex items-center text-purple-400">
                <List className="mr-2" /> What are the Prerequisites?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {courseDetails.prerequisites}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;