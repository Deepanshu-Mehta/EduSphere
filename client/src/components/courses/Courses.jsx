import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Info, CheckCircle } from 'lucide-react';
import course1 from "../../assets/courses-images/1.png";
import course2 from "../../assets/courses-images/2.png";
import course3 from "../../assets/courses-images/3.png";
import course4 from "../../assets/courses-images/4.png";
import course5 from "../../assets/courses-images/5.png";

const courses = [
  { id: 1, name: "Learn About Kafka and Node.js", price: 30, imageUrl: course1 },
  { id: 2, name: "React, but with webpack", price: 20, imageUrl: course2 },
  { id: 3, name: "Learn About Terraform in Depth", price: 20, imageUrl: course3 },
  { id: 4, name: "Kubernetes and Docker for deployment", price: 30, imageUrl: course4 },
  { id: 5, name: "Create your own Serverless web app", price: 40, imageUrl: course5 },
];

const Courses = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("selectedItems");
    if (savedItems) {
      setSelectedItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handlePayment = async () => {
    let token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token) {
      alert("Please log in to proceed with the payment.");
      return;
    }

    try {
      const response = await fetch(
        "https://edusphere-gk36.onrender.com/checkout/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items: selectedItems }),
        }
      );

      if (response.ok) {
        const { url } = await response.json();
        window.location = url;
      } else if (response.status === 401) {
        // Token might be expired, try refreshing it
        const refreshResponse = await fetch(
          "https://edusphere-gk36.onrender.com/auth/refresh",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
          }
        );

        if (refreshResponse.ok) {
          const { token: newToken } = await refreshResponse.json();
          localStorage.setItem("token", newToken);

          // Retry payment with new token
          const retryResponse = await fetch(
            "https://edusphere-gk36.onrender.com/checkout/create-checkout-session",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newToken}`,
              },
              body: JSON.stringify({ items: selectedItems }),
            }
          );

          if (retryResponse.ok) {
            const { url } = await retryResponse.json();
            window.location = url;
          } 
        } 
      } else {
        const errorData = await response.json();
        if (errorData.purchasedCourseIds) {
          alert(
            `You have already purchased courses with IDs: ${errorData.purchasedCourseIds.join(
              ", "
            )}`
          );
        } else {
          alert(`Error: ${errorData.message}`);
        }
      }
    } catch (error) {
      console.error("Error during payment process:", error);
      alert("An error occurred during the payment process. Please try again.");
    }
  };

  const handleChange = (event) => {
    const { value, checked } = event.target;
    const id = parseInt(value);
    setSelectedItems((prev) =>
      checked
        ? [...prev, { id, quantity: 1 }]
        : prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Elevate Your Tech Skills
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our curated collection of cutting-edge courses designed to propel your career in the tech industry.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-700"
            >
              <img
                className="w-full h-48 object-cover"
                src={course.imageUrl}
                alt={course.name}
              />
              <div className="p-6">
                <h2 className="font-bold text-2xl mb-4 text-green-400">
                  {course.name}
                </h2>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-3xl font-bold text-blue-400">
                    ${course.price}
                  </span>
                  <Link to={`/course-details/${course.id}`} className="text-gray-300 hover:text-white transition-colors duration-300">
                    <Info size={24} />
                  </Link>
                </div>
                <label className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-600 mr-2"
                    value={course.id}
                    onChange={handleChange}
                    checked={selectedItems.some((item) => item.id === course.id)}
                  />
                  {selectedItems.some((item) => item.id === course.id) ? (
                    <>
                      <CheckCircle size={20} className="mr-2" />
                      Selected
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={handlePayment}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-10 rounded-full inline-flex items-center transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50 text-xl"
            disabled={selectedItems.length === 0}
          >
            <ShoppingCart size={24} className="mr-3" />
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;