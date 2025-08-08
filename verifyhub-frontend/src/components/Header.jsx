// src/components/Header.jsx
import React from 'react';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Project Name</h1>
        <nav>
          <a href="#about" className="mx-2 hover:underline">About</a>
          <a href="#features" className="mx-2 hover:underline">Features</a>
          <a href="#certificate" className="mx-2 hover:underline">Certificate</a>
        </nav>
      </div>
    </header>
  );
}
