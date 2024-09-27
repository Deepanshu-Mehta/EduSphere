// import React from 'react';
// import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

// // Assume these imports are available
// import Jane from "./assets/testimonials-images/jane.jpg";
// import Chris from "./assets/testimonials-images/chris.jpg";
// import Leslie from "./assets/testimonials-images/Leslie.jpg";
// import Mike from "./assets/testimonials-images/mike.jpg";
// import Emily from "./assets/testimonials-images/Emily.jpg";

// const people = [
//   {
//     name: "Leslie Alexander",
//     role: "Front-End Developer",
//     imageUrl: Leslie,
//     bio: "Leslie is a talented front-end developer with a keen eye for design and user experience.",
//     socialLinks: {
//       github: "https://github.com/lesliealexander",
//       linkedin: "https://linkedin.com/in/lesliealexander",
//       twitter: "https://twitter.com/lesliealexander"
//     }
//   },
//   {
//     name: "Jane Cooper",
//     role: "AWS Certified Solutions Architect",
//     imageUrl: Jane,
//     bio: "Jane is our cloud expert, specializing in AWS architecture and implementation.",
//     socialLinks: {
//       github: "https://github.com/janecooper",
//       linkedin: "https://linkedin.com/in/janecooper",
//       twitter: "https://twitter.com/janecooper"
//     }
//   },
//   {
//     name: "Mike Johnson",
//     role: "Terraform Expert",
//     imageUrl: Mike,
//     bio: "Mike brings extensive experience in infrastructure as code, particularly with Terraform.",
//     socialLinks: {
//       github: "https://github.com/mikejohnson",
//       linkedin: "https://linkedin.com/in/mikejohnson",
//       twitter: "https://twitter.com/mikejohnson"
//     }
//   },
//   {
//     name: "Emily Davis",
//     role: "DevOps Engineer",
//     imageUrl: Emily,
//     bio: "Emily excels in bridging the gap between development and operations, streamlining our processes.",
//     socialLinks: {
//       github: "https://github.com/emilydavis",
//       linkedin: "https://linkedin.com/in/emilydavis",
//       twitter: "https://twitter.com/emilydavis"
//     }
//   },
//   {
//     name: "Chris Wilson",
//     role: "Software Engineer",
//     imageUrl: Chris,
//     bio: "Chris is a versatile software engineer with a passion for clean, efficient code.",
//     socialLinks: {
//       github: "https://github.com/chriswilson",
//       linkedin: "https://linkedin.com/in/chriswilson",
//       twitter: "https://twitter.com/chriswilson"
//     }
//   },
// ];

// export default function Team() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
//             Our Dedicated Team
//           </h2>
//           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//             EduSphere has a team of passionate individuals who are dedicated to
//             helping you learn new skills and advance your career.
//           </p>
//         </div>
//         <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
//           {people.map((person) => (
//             <div key={person.name} className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 overflow-hidden border border-gray-700">
//               <div className="p-6">
//                 <img
//                   src={person.imageUrl}
//                   alt={person.name}
//                   className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-green-400"
//                 />
//                 <h3 className="text-2xl font-semibold text-center text-green-400 mb-2">
//                   {person.name}
//                 </h3>
//                 <p className="text-gray-400 text-center mb-4">{person.role}</p>
//                 <p className="text-gray-300 text-center mb-6">{person.bio}</p>
//                 <div className="flex justify-center space-x-4">
//                   <a href={person.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
//                     <GithubIcon size={24} />
//                   </a>
//                   <a href={person.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
//                     <LinkedinIcon size={24} />
//                   </a>
//                   <a href={person.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
//                     <TwitterIcon size={24} />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon, ChevronDown, ChevronUp } from 'lucide-react';

// Assume these imports are available
import Jane from "./assets/testimonials-images/jane.jpg";
import Chris from "./assets/testimonials-images/chris.jpg";
import Leslie from "./assets/testimonials-images/Leslie.jpg";
import Mike from "./assets/testimonials-images/mike.jpg";
import Emily from "./assets/testimonials-images/Emily.jpg";

const people = [
  {
    name: "Leslie Alexander",
    role: "Front-End Developer",
    imageUrl: Leslie,
    bio: "Leslie is a talented front-end developer with a keen eye for design and user experience. With 5+ years of experience in React and Vue.js, she creates stunning and intuitive user interfaces that elevate our courses.",
    skills: ["React", "Vue.js", "CSS/SASS", "UI/UX Design"],
    socialLinks: {
      github: "https://github.com/lesliealexander",
      linkedin: "https://linkedin.com/in/lesliealexander",
      twitter: "https://twitter.com/lesliealexander"
    }
  },
  {
    name: "Jane Cooper",
    role: "AWS Certified Solutions Architect",
    imageUrl: Jane,
    bio: "Jane is our cloud expert, specializing in AWS architecture and implementation. She brings 7+ years of experience in designing scalable and secure cloud infrastructures for enterprises.",
    skills: ["AWS", "Cloud Architecture", "DevOps", "Serverless"],
    socialLinks: {
      github: "https://github.com/janecooper",
      linkedin: "https://linkedin.com/in/janecooper",
      twitter: "https://twitter.com/janecooper"
    }
  },
  {
    name: "Mike Johnson",
    role: "Terraform Expert",
    imageUrl: Mike,
    bio: "Mike brings extensive experience in infrastructure as code, particularly with Terraform. He's passionate about automating cloud deployments and optimizing infrastructure efficiency.",
    skills: ["Terraform", "IaC", "Multi-cloud", "CI/CD"],
    socialLinks: {
      github: "https://github.com/mikejohnson",
      linkedin: "https://linkedin.com/in/mikejohnson",
      twitter: "https://twitter.com/mikejohnson"
    }
  },
  {
    name: "Emily Davis",
    role: "DevOps Engineer",
    imageUrl: Emily,
    bio: "Emily excels in bridging the gap between development and operations, streamlining our processes. With her expertise, we ensure smooth deployments and robust system reliability.",
    skills: ["Kubernetes", "Docker", "Jenkins", "Monitoring"],
    socialLinks: {
      github: "https://github.com/emilydavis",
      linkedin: "https://linkedin.com/in/emilydavis",
      twitter: "https://twitter.com/emilydavis"
    }
  },
  {
    name: "Chris Wilson",
    role: "Software Engineer",
    imageUrl: Chris,
    bio: "Chris is a versatile software engineer with a passion for clean, efficient code. He specializes in backend development and has contributed significantly to our course content on algorithms and data structures.",
    skills: ["Python", "Java", "Algorithms", "System Design"],
    socialLinks: {
      github: "https://github.com/chriswilson",
      linkedin: "https://linkedin.com/in/chriswilson",
      twitter: "https://twitter.com/chriswilson"
    }
  },
];

const TeamMember = ({ person }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 overflow-hidden border border-gray-700">
      <div className="p-6">
        <img
          src={person.imageUrl}
          alt={person.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-green-400 shadow-lg"
        />
        <h3 className="text-2xl font-semibold text-center text-green-400 mb-2">
          {person.name}
        </h3>
        <p className="text-gray-300 text-center mb-4">{person.role}</p>
        <p className="text-gray-400 text-center mb-4 line-clamp-2">
          {person.bio}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {person.skills.map((skill, index) => (
            <span key={index} className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href={person.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
            <GithubIcon size={24} />
          </a>
          <a href={person.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
            <LinkedinIcon size={24} />
          </a>
          <a href={person.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
            <TwitterIcon size={24} />
          </a>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center text-green-400 hover:text-green-300 transition-colors duration-300"
        >
          {isExpanded ? (
            <>
              <span className="mr-2">Less info</span>
              <ChevronUp size={20} />
            </>
          ) : (
            <>
              <span className="mr-2">More info</span>
              <ChevronDown size={20} />
            </>
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="px-6 pb-6 text-gray-300">
          <p>{person.bio}</p>
        </div>
      )}
    </div>
  );
};

export default function Team() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-4 animate-pulse">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            At EduSphere, our team of industry veterans is passionate about empowering the next generation of tech leaders. Learn from the best in the field.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <TeamMember key={person.name} person={person} />
          ))}
        </div>
      </div>
    </div>
  );
}