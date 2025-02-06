import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Command, Zap, Box, Rocket, Coffee, Moon, Sun, Globe, ChevronDown, Search } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-[#1E1E20]' : 'bg-white'}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled 
          ? `${isDark ? 'bg-[#1E1E20]/80' : 'bg-white/80'} shadow-sm` 
          : `${isDark ? 'bg-[#1E1E20]' : 'bg-white'}`
        } backdrop-blur-sm z-50 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-2xl font-bold text-[#646CFF] hover:text-[#747BFF] transition-colors">⚡️ Vite</a>
            <div className="hidden md:flex space-x-6">
              <a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Guide</a>
              <a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Config</a>
              <a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Plugins</a>
              <a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Resources</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className={`flex items-center space-x-1 p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                } transition-colors`}
              >
                <Globe className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>EN</span>
                <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
              {isLanguageOpen && (
                <div className={`absolute top-full right-0 mt-2 py-2 w-48 rounded-lg shadow-lg ${
                  isDark ? 'bg-[#2A2A2D] border border-gray-800' : 'bg-white border border-gray-100'
                }`}>
                  {['English', 'Español', '简体中文', '日本語'].map((lang) => (
                    <button
                      key={lang}
                      className={`block w-full text-left px-4 py-2 ${
                        isDark 
                          ? 'text-gray-300 hover:bg-gray-800' 
                          : 'text-gray-600 hover:bg-gray-100'
                      } transition-colors`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button 
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <a 
              href="https://github.com/vitejs/vite" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <Github className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </a>
            <button className={`p-2 rounded-lg transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              <Search className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute -inset-x-20 -top-20 -bottom-20 bg-[#646CFF]/5 rounded-full blur-3xl dark:bg-[#646CFF]/10" />
            <h1 className="relative text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#646CFF] to-[#9499FF]">
                Vite
              </span>
            </h1>
          </div>
          <p className={`text-7xl font-bold mb-6 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Next Generation Frontend Tooling
          </p>
          <p className={`text-xl mb-8 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Get ready for a development environment that can finally catch up with you.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-[#646CFF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#747BFF] transition-colors flex items-center group">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
            </button>
            <button className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isDark 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}>
              Why Vite?
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`py-20 transition-colors ${isDark ? 'bg-[#2A2A2D]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-[#646CFF]" />,
                title: "Instant Server Start",
                description: "On demand file serving over native ESM, no bundling required!"
              },
              {
                icon: <Box className="w-6 h-6 text-[#646CFF]" />,
                title: "Lightning Fast HMR",
                description: "Hot Module Replacement (HMR) that stays fast regardless of app size."
              },
              {
                icon: <Rocket className="w-6 h-6 text-[#646CFF]" />,
                title: "Rich Features",
                description: "Out-of-the-box support for TypeScript, JSX, CSS and more."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg transition-colors transform hover:-translate-y-1 hover:shadow-xl duration-300 ${
                  isDark ? 'bg-[#1E1E20]' : 'bg-white'
                }`}
              >
                <div className="w-12 h-12 bg-[#646CFF]/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-2 transition-colors ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`transition-colors ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold mb-12 transition-colors ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Sponsors
          </h2>
          <div className="flex justify-center items-center space-x-8">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className={`w-24 h-24 rounded-lg flex items-center justify-center transition-colors ${
                  isDark ? 'bg-[#2A2A2D]' : 'bg-gray-100'
                }`}
              >
                <Coffee className={`w-12 h-12 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 transition-colors ${isDark ? 'bg-[#2A2A2D]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Released under the MIT License.
            </p>
            <p className={`transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Copyright © 2024-present Evan You & Vite Contributors
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;