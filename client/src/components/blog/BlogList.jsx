import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const blogFiles = [
      { id: 'generate-jwt', title: 'FEWV Seconds of Learning How to Generate a JWT?', description: 'Learn how to generate a JSON Web Token (JWT) in just a few seconds.', tags: ['React', 'JavaScript'] },
      { id: 'learn-docker', title: 'FEWV Seconds of Learning How to Containerize?', description: 'Learn how to containerize your applications using Docker.', tags: ['Docker', 'Node.js'] },
      { id: 'learn-figma-react', title: 'FEWV Seconds of Learning Convert Figma to React?', description: 'Learn how to convert Figma designs to React components.', tags: ['Figma', 'React.js'] },
      { id: 'k8s-basics', title: 'Learn Kubernetes Basics in Just a Few Seconds', description: 'Get started with Kubernetes and learn the basics in just a few seconds.', tags: ['K8s', 'Node.js'] },
    ];
    setBlogs(blogFiles);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Our Blogs
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          Read our latest blogs and learn new skills in just a few seconds.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700 transition duration-300 hover:shadow-green-300/50 hover:scale-105">
              <Link to={`/blog/${blog.id}`} className="block">
                <h2 className="text-2xl font-semibold mb-4 text-green-400 hover:text-green-300">
                  {blog.title}
                </h2>
                <p className="text-gray-300 mb-4">{blog.description}</p>
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex items-center text-gray-400 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Few Seconds Read</span>
                  </div>
                  <div className="flex flex-wrap">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded mr-2 mb-2">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center text-blue-400 hover:text-blue-300">
                  <span className="mr-2">Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogList;