# EduSphere

EduSphere is a comprehensive e-learning platform designed to provide a seamless educational experience for both students and instructors.

## 🚀 Features

- **User Authentication:** Secure registration, login, and token refresh
- **Course Management:** Browse, purchase, and access course content
- **Video Content Delivery:** Integrated with Vimeo for smooth video playback
- **Payment Integration:** Secure course purchases via Stripe
- **Protected Routes:** Ensure authenticated access to premium content
- **Responsive Design:** Optimized for various devices and screen sizes

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Payment:** Stripe
- **Video Hosting:** Vimeo

## 🏁 Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Deepanshu-Mehta/EduSphere.git
   cd EduSphere
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   cd client && npm install
   cd ../server && npm install
   \`\`\`

3. **Set up environment variables**
   - Create `.env` files in both `client/` and `server/` directories
   - Add necessary environment variables:
 # server/.env
 DB_HOST=your_db_host
 DB_USER=your_db_user
 DB_PASSWORD=your_db_password
 DB_NAME=your_db_name
 JWT_SECRET=your_jwt_secret
 STRIPE_SECRET_KEY=your_stripe_secret_key
 
 # client/.env
 VITE_API_URL=http://localhost:5000

4. **Start the development servers**
bash

In the root directory
npm run dev


## 🤝 Contributing

We welcome contributions to EduSphere! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📧 Contact

Deepanshu Mehta - mdeepanshu2706@gmail.com

Project Link: [https://github.com/Deepanshu-Mehta/EduSphere](https://github.com/Deepanshu-Mehta/EduSphere)
