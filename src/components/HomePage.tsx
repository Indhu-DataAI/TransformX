import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  image: string;
}

interface Vertical {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  image: string;
  projects: Project[];
}

interface HomePageProps {
  verticals: Vertical[];
  onVerticalClick: (vertical: Vertical) => void;
}

function HomePage({ verticals, onVerticalClick }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-indigo-950 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight"> BCT TransformX</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#platforms" className="text-gray-300 hover:text-white transition-colors duration-300">Platforms</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">About</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-6xl font-bold text-indigo-950 mb-8 tracking-tight">
            AI-Powered Digital Transformation
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
            Unlock the power of artificial intelligence across multiple industry verticals with our comprehensive suite of accelerators and intelligent solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-950 mb-4">6</div>
              <div className="text-gray-600 text-lg">Industry Verticals</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-950 mb-4">15+</div>
              <div className="text-gray-600 text-lg">AI Solutions</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-950 mb-4">∞</div>
              <div className="text-gray-600 text-lg">Possibilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Verticals Grid */}
      <section id="platforms" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold text-indigo-950 mb-6">Our Solutions</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive range of AI-powered solutions across different industry verticals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {verticals.map((vertical) => (
              <div 
                key={vertical.id}
                onClick={() => onVerticalClick(vertical)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={vertical.image} 
                    alt={vertical.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
                </div>
                
                <div className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="bg-indigo-950 text-white p-4 rounded-xl group-hover:bg-gray-800 transition-colors duration-300">
                      {vertical.icon}
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-indigo-950 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {vertical.title}
                  </h4>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {vertical.description}
                  </p>
                  
                  <div className="flex items-center justify-center text-indigo-950 group-hover:text-gray-800 transition-colors duration-300">
                    <span className="font-semibold mr-2">Explore Projects</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-900 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-5xl font-bold mb-8">Ready to Transform Your Business?</h3>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Discover how our AI-powered solutions can accelerate your digital transformation journey.
          </p>
          <button className="bg-white text-black px-12 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-lg transform hover:scale-105">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h4 className="text-3xl font-bold mb-6">TransformX</h4>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Leading the future of AI-powered digital transformation across industries. 
                Our comprehensive suite of accelerators empowers businesses to unlock their full potential.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                  <span className="text-black font-bold text-lg">T</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-xl font-bold mb-6">Verticals</h5>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#ai-sdlc" className="hover:text-white transition-colors duration-300">AI at SDLC</a></li>
                <li><a href="#medtech" className="hover:text-white transition-colors duration-300">Medtech</a></li>
                <li><a href="#enterprise" className="hover:text-white transition-colors duration-300">Enterprise</a></li>
                <li><a href="#retail" className="hover:text-white transition-colors duration-300">Retail</a></li>
                <li><a href="#banking" className="hover:text-white transition-colors duration-300">Banking</a></li>
                <li><a href="#public" className="hover:text-white transition-colors duration-300">Public Sector</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-xl font-bold mb-6">Company</h5>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#about" className="hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors duration-300">Careers</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                © 2025 TransformX. All rights reserved.
              </p>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <a href="#terms" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="#privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#support" className="text-gray-400 hover:text-white transition-colors duration-300">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;