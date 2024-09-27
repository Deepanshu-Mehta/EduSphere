
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Code, ChevronLeft, ChevronRight, Terminal, Zap, Coffee } from 'lucide-react';

// Assume these imports are available
import Jane from "./assets/testimonials-images/jane.jpg";
import Chris from "./assets/testimonials-images/chris.jpg";
import Leslie from "./assets/testimonials-images/Leslie.jpg";
import Mike from "./assets/testimonials-images/mike.jpg";
import Emily from "./assets/testimonials-images/Emily.jpg";

const HomePage = () => {
  const features = [
    { icon: <Terminal className="w-12 h-12 text-green-400" />, title: "Cutting-Edge Tech Stack", description: "Stay ahead with courses on the latest technologies and frameworks." },
    { icon: <Users className="w-12 h-12 text-blue-400" />, title: "Industry Expert Instructors", description: "Learn from professionals with real-world experience in top tech companies." },
    { icon: <Code className="w-12 h-12 text-purple-400" />, title: "Hands-on Projects", description: "Build your portfolio with practical, industry-relevant projects." },
    { icon: <Zap className="w-12 h-12 text-yellow-400" />, title: "Fast-Track Learning", description: "Accelerate your career with our focused, efficient learning paths." },
    { icon: <Coffee className="w-12 h-12 text-red-400" />, title: "24/7 Support", description: "Get help anytime with our round-the-clock mentorship and community support." },
    { icon: <BookOpen className="w-12 h-12 text-indigo-400" />, title: "Comprehensive Resources", description: "Access a vast library of supplementary materials and coding challenges." },
  ];

  const testimonials = [
    { id: 1, text: "EduSphere's advanced algorithms course helped me ace my technical interviews. I'm now working at a FAANG company!", author: "Jane Cooper", title: "Software Engineer at BigTech", image: Jane },
    { id: 2, text: "The full-stack development track gave me the confidence to build and deploy my own SaaS product. Game-changer!", author: "Chris Wilson", title: "Startup Founder & CTO", image: Chris },
    { id: 3, text: "As a CS student, EduSphere's content complemented my university courses perfectly. It gave me a real edge in practical skills.", author: "Emily Davis", title: "Computer Science Graduate", image: Emily },
    { id: 4, text: "The React and Node.js courses were instrumental in my transition from backend to full-stack development.", author: "Leslie Alexander", title: "Full-Stack Developer", image: Leslie },
    { id: 5, text: "EduSphere's DevOps and cloud computing courses fast-tracked my career. I'm now leading cloud initiatives at my company.", author: "Mike Johnson", title: "Senior DevOps Engineer", image: Mike },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="container mx-auto px-4 py-20">
        <section className="text-center mb-24">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-pulse">
            Level Up Your Tech Career with EduSphere
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300">
            Master cutting-edge technologies, build impressive projects, and accelerate your journey to becoming a top-tier developer.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/courses" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50">
              Explore Courses <ArrowRight className="ml-2" />
            </Link>
            <Link to="/blogs" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50">
              Tech Blog <ArrowRight className="ml-2" />
            </Link>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-semibold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Why Top Tech Talent Chooses EduSphere</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 border border-gray-700">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-100">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-semibold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Success Stories from EduSphere Graduates</h2>
          <div className="bg-gray-800 p-12 rounded-2xl shadow-lg relative border border-gray-700">
            <button onClick={prevTestimonial} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-colors duration-300">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button onClick={nextTestimonial} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-colors duration-300">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            <div className="text-center">
              <p className="text-2xl italic mb-8">{testimonials[currentTestimonial].text}</p>
              <div className="flex items-center justify-center">
                <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].author} className="w-20 h-20 rounded-full mr-6 border-4 border-green-400" />
                <div>
                  <p className="font-semibold text-xl text-green-400">{testimonials[currentTestimonial].author}</p>
                  <p className="text-gray-400">{testimonials[currentTestimonial].title}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-gray-800 to-gray-900 p-16 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-4xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Ready to Revolutionize Your Tech Career?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300">Join a community of ambitious developers and start your journey to becoming a tech leader today.</p>
          <Link to="/register" className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50">
            Start Your Tech Odyssey <ArrowRight className="ml-2" />
          </Link>
        </section>
      </main>
    </div>
  );
};

export default HomePage;