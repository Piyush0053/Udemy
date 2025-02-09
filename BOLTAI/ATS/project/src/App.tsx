import React, { useState } from 'react';
import { 
  FileText, 
  Target, 
  CheckCircle, 
  BarChart2, 
  Star, 
  Award, 
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Code,
  Zap
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed w-full bg-black/50 backdrop-blur-lg border-b border-gray-800/50 z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-gradient-x" />
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="#" className="flex items-center space-x-2 group">
                <Target className="w-8 h-8 text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Jobscan</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white relative group">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white relative group">
                Resources
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
              </a>
              <button className="px-4 py-2 text-gray-300 hover:text-white relative overflow-hidden group">
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
              <button 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative px-4 py-2 bg-blue-500 text-white rounded-lg overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  Try for Free
                  <Sparkles className={`ml-2 w-4 h-4 transition-transform duration-500 ${isHovered ? 'scale-125' : 'scale-100'}`} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white relative group"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 transform rotate-0 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="h-6 w-6 transform rotate-0 group-hover:-rotate-90 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-gray-800/50">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors">Products</a>
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors">Resources</a>
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors">Pricing</a>
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors">Login</a>
                <a href="#" className="block px-3 py-2 text-blue-400 font-medium hover:bg-blue-500/10 rounded-lg transition-colors">Try for Free</a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(147,51,234,0.1),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(0,0,0,0.4)_0%,_transparent_100%)]" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>AI-Powered Resume Optimization</span>
              </div>
              <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x">
                Land 2x more interviews with AI-powered resume optimization
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Instantly see how your resume scores against any job description and get expert recommendations to increase your chances of getting hired.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center">
                    Try Free Scan
                    <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                </button>
                <button className="group px-8 py-4 border border-gray-700 text-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-colors relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center">
                    Watch Demo
                    <Code className="ml-2 w-5 h-5 transform group-hover:rotate-12 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-blue-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-3xl animate-pulse" />
              <div className="relative bg-gray-900/80 backdrop-blur-xl p-6 rounded-xl border border-gray-800/50">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl" />
                <div className="relative grid gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Job Description
                    </label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="w-full h-32 p-3 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                      placeholder="Paste job description here..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Resume
                    </label>
                    <textarea
                      value={resume}
                      onChange={(e) => setResume(e.target.value)}
                      className="w-full h-32 p-3 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                      placeholder="Paste your resume here..."
                    />
                  </div>
                  <button className="group w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center">
                      Scan Now
                      <Zap className="ml-2 w-5 h-5 transform group-hover:scale-125 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1),_transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-6">
              <Star className="w-4 h-4 mr-2" />
              <span>Features</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Why job seekers love Jobscan
            </h2>
            <p className="text-xl text-gray-400">
              Join over 1 million job seekers who have optimized their job search with Jobscan
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8 text-blue-400" />,
                title: "ATS Resume Scanner",
                description: "Score your resume against any job description and see exactly how to improve it."
              },
              {
                icon: <BarChart2 className="w-8 h-8 text-blue-400" />,
                title: "Skills Analysis",
                description: "Get a detailed breakdown of which skills you should add to your resume."
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-blue-400" />,
                title: "AI Resume Writer",
                description: "Let AI help you write achievement-oriented bullet points for your resume."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 hover:border-blue-500/50 transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" />
                <div className="relative">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-xl relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-6">
              <Award className="w-4 h-4 mr-2" />
              <span>Testimonials</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Trusted by job seekers worldwide
            </h2>
            <div className="flex justify-center items-center space-x-2 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
              <span className="ml-2 text-gray-400">4.8/5 from 10,000+ reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group bg-black/50 backdrop-blur-xl p-6 rounded-xl border border-gray-800/50 hover:border-blue-500/50 transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" />
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur group-hover:blur-xl transition-all" />
                      <img
                        src={`https://images.unsplash.com/photo-${i === 1 ? '1472099645785-5658abf4ff4e' : i === 2 ? '1494790108377-be9c29b29330' : '1507003211169-0a1dd7228f2d'}?auto=format&fit=crop&w=100&h=100&q=80`}
                        alt="User"
                        className="relative w-12 h-12 rounded-full object-cover transform group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-gray-400">Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-gray-400">
                    "Jobscan helped me optimize my resume and land my dream job. The AI-powered suggestions were incredibly helpful!"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1),_transparent_70%)]" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-[1px] rounded-2xl">
            <div className="bg-gray-900/80 backdrop-blur-xl p-12 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" />
              <div className="relative">
                <Award className="w-16 h-16 mx-auto mb-6 text-blue-400 transform group-hover:scale-110 transition-transform" />
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Ready to land your dream job?
                </h2>
                <p className="text-xl mb-8 text-gray-400">
                  Join thousands of job seekers who have successfully optimized their job search with Jobscan.
                </p>
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg relative overflow-hidden inline-flex items-center">
                  <span className="relative z-10 flex items-center">
                    Get Started for Free
                    <ChevronRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6 group">
                <Target className="w-8 h-8 text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Jobscan</span>
              </div>
              <p className="text-gray-500">
                Optimize your resume and LinkedIn profile to get more interviews.
              </p>
            </div>
            {['Products', 'Resources', 'Company', 'Legal'].map((category) => (
              <div key={category}>
                <h3 className="font-semibold text-white mb-4">{category}</h3>
                <ul className="space-y-2">
                  {['Link 1', 'Link 2', 'Link 3', 'Link 4'].map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-blue-400 transition-colors relative group">
                        {link}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800/50 mt-12 pt-8 text-center text-gray-500">
            <p>© 2024 Jobscan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;