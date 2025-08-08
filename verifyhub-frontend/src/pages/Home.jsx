// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <main className="container mx-auto p-8">
        {/* About Section */}
        <section id="about" className="my-12">
          <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
          <p>
            This project is designed to streamline the process of certificate generation and verification. It offers a user-friendly interface and robust features to ensure secure and efficient management of certificates.
          </p> 
        </section>

        {/* Features Section */}
        <section id="features" className="my-12">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc pl-5">
            <li>Generate certificates with customizable templates.</li>
            <li>Verify the authenticity of certificates instantly.</li>
            <li>Manage and store certificates securely.</li>
          </ul>
        </section>

        {/* Certificate Actions Section */}
        <section id="certificate" className="my-12">
          <h2 className="text-2xl font-semibold mb-4">Certificate Actions</h2>
          <div className="flex space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"  onClick={() => navigate('/generate-certificate')} >
              Generate Certificate
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" onClick={() => navigate('/verify-certificate')} >
              Verify Certificate
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
