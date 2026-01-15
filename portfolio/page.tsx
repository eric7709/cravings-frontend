'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, Linkedin, Calendar, CheckCircle, Star, ArrowRight, Sparkles } from 'lucide-react';

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('Thank you for reaching out! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const services = [
    { icon: '📧', title: 'Email Management', desc: 'Inbox zero guaranteed with smart filtering and prioritization' },
    { icon: '📅', title: 'Calendar Coordination', desc: 'Seamless scheduling across time zones and platforms' },
    { icon: '📊', title: 'Data Entry & Reports', desc: 'Accurate data management and insightful reporting' },
    { icon: '💬', title: 'Customer Support', desc: 'Professional communication with your clients' },
    { icon: '📱', title: 'Social Media Management', desc: 'Engaging content and community management' },
    { icon: '✈️', title: 'Travel Planning', desc: 'Complete itinerary coordination and booking' },
  ];

  const skills = [
    { name: 'Communication', level: 95 },
    { name: 'Organization', level: 98 },
    { name: 'Time Management', level: 92 },
    { name: 'Tech Savvy', level: 90 },
    { name: 'Problem Solving', level: 94 },
    { name: 'Attention to Detail', level: 96 },
  ];

  const tools = [
    { name: 'Trello', category: 'Project Management', icon: '📋', color: 'from-blue-500 to-blue-600' },
    { name: 'Asana', category: 'Task Management', icon: '✅', color: 'from-pink-500 to-rose-600' },
    { name: 'Slack', category: 'Communication', icon: '💬', color: 'from-blue-500 to-blue-600' },
    { name: 'Google Workspace', category: 'Productivity', icon: '📧', color: 'from-red-500 to-yellow-500' },
    { name: 'Zoom', category: 'Video Conferencing', icon: '🎥', color: 'from-blue-400 to-blue-600' },
    { name: 'Calendly', category: 'Scheduling', icon: '📅', color: 'from-teal-500 to-blue-600' },
    { name: 'Notion', category: 'Documentation', icon: '📝', color: 'from-gray-600 to-gray-800' },
    { name: 'Monday.com', category: 'Workflow', icon: '⚡', color: 'from-orange-500 to-red-600' },
    { name: 'HubSpot', category: 'CRM', icon: '🎯', color: 'from-orange-400 to-orange-600' },
    { name: 'Canva', category: 'Design', icon: '🎨', color: 'from-blue-400 to-pink-500' },
    { name: 'Dropbox', category: 'File Storage', icon: '📦', color: 'from-blue-500 to-indigo-600' },
    { name: 'QuickBooks', category: 'Accounting', icon: '💰', color: 'from-blue-500 to-emerald-600' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'CEO, TechStart Inc', text: 'Transformed my chaotic schedule into a well-oiled machine. Best decision for my business!', rating: 5 },
    { name: 'Michael Chen', role: 'Entrepreneur', text: 'Professional, efficient, and incredibly reliable. Freed up 15+ hours per week for me.', rating: 5 },
    { name: 'Emily Rodriguez', role: 'Marketing Director', text: 'Exceptional attention to detail and proactive communication. Highly recommended!', rating: 5 },
  ];

  return (
    <div className="min-h-dvh bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out',
            left: '10%',
            top: '20%',
          }}
        />
        <div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            transition: 'transform 0.3s ease-out',
            right: '10%',
            bottom: '20%',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-blue-400" />
            <span className="text-2xl font-bold bg-linear-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Elite VA
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            {['Home', 'Services', 'Skills', 'Tools', 'Testimonials', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative group text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-pink-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-blue-400"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/5 backdrop-blur-xl border-b border-white/10">
            {['Home', 'Services', 'Skills', 'Tools', 'Testimonials', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-dvh flex items-center justify-center pt-20 px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div
            className="mb-8"
            style={{
              opacity: Math.max(0, 1 - scrollY / 500),
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            <div className="inline-block mb-6 px-6 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full">
              <span className="text-blue-300 text-sm font-medium">Your Success Partner</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-linear-to-r from-blue-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight pb-2">
              Ibeh Blessing Ifunanya
            </h1>

            <p className="text-2xl md:text-4xl text-blue-300 font-semibold mb-6">
              Your Virtual Assistant
            </p>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Elevating productivity through exceptional administrative support and seamless workflow management
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#contact"
                className="group px-8 py-4 bg-linear-to-r from-blue-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#services"
                className="px-8 py-4 border-2 border-blue-400 rounded-full font-semibold hover:bg-blue-500/10 transition-all duration-300"
              >
                View Services
              </a>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { label: 'Years Experience', value: '5+', icon: '🎯', color: 'from-blue-500 to-blue-500' },
              { label: 'Happy Clients', value: '100+', icon: '😊', color: 'from-blue-500 to-pink-500' },
              { label: 'Projects Completed', value: '500+', icon: '✅', color: 'from-blue-500 to-emerald-500' },
              { label: 'Response Time', value: '<2hrs', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative p-8 bg-linear-to-br from-slate-900/80 to-blue-900/30 border border-blue-400/30 rounded-3xl backdrop-blur-md hover:scale-110 transition-all duration-500 overflow-hidden"
                style={{
                  animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                    style={{
                      animation: 'shine 2s ease-in-out infinite',
                    }}
                  />
                </div>

                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                    {stat.icon}
                  </div>

                  {/* Value with gradient */}
                  <div className={`text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>

                  {/* Progress ring decoration */}
                  <div className="absolute top-4 right-4 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity">
                    <svg className="w-8 h-8 transform -rotate-90">
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className={`text-blue-400`}
                        strokeDasharray={`${2 * Math.PI * 14}`}
                        strokeDashoffset={`${2 * Math.PI * 14 * 0.25}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Services Offered
            </h2>
            <p className="text-gray-400 text-lg">Comprehensive solutions tailored to your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="group p-8 bg-linear-to-br from-slate-900/50 to-blue-900/20 border border-blue-400/20 rounded-2xl hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm"
                style={{
                  animation: `slideUp 0.6s ease-out ${i * 0.1}s backwards`,
                }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-300">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Core Competencies
            </h2>
            <p className="text-gray-400 text-lg">Excellence in every aspect of virtual assistance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="group relative p-8 bg-linear-to-br from-slate-900/50 to-blue-900/20 border border-blue-400/20 rounded-2xl hover:border-blue-400/50 transition-all duration-500 hover:scale-105 backdrop-blur-sm overflow-hidden"
                style={{
                  animation: `fadeIn 0.6s ease-out ${i * 0.1}s backwards`,
                }}
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Circular progress indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-blue-300">{skill.name}</h3>
                    <div className="relative w-16 h-16">
                      {/* Background circle */}
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-slate-700"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="url(#gradient)"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - skill.level / 100)}`}
                          className="transition-all duration-1000 ease-out"
                          strokeLinecap="round"
                          style={{
                            animation: `drawCircle 1.5s ease-out ${i * 0.1}s backwards`,
                          }}
                        />
                      </svg>
                      {/* Percentage text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-400">{skill.level}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Linear progress bar */}
                  <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-linear-to-r from-blue-600 to-pink-600 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        animation: `expandWidth 1.5s ease-out ${i * 0.1}s backwards`,
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>

                  {/* Skill description */}
                  <div className="mt-4 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {skill.name === 'Communication' && 'Clear, professional, and responsive communication'}
                    {skill.name === 'Organization' && 'Systematic approach to managing tasks and priorities'}
                    {skill.name === 'Time Management' && 'Efficient scheduling and deadline management'}
                    {skill.name === 'Tech Savvy' && 'Proficient with modern tools and platforms'}
                    {skill.name === 'Problem Solving' && 'Creative solutions to complex challenges'}
                    {skill.name === 'Attention to Detail' && 'Meticulous accuracy in all deliverables'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SVG Gradient Definition */}
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Tools & Technologies Section */}
      <section id="tools" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Tools & Technologies
            </h2>
            <p className="text-gray-400 text-lg">Proficient in industry-leading platforms and software</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tools.map((tool, i) => (
              <div
                key={i}
                className="group relative overflow-hidden p-6 bg-linear-to-br from-slate-900/50 to-blue-900/20 border border-blue-400/20 rounded-2xl hover:border-blue-400/50 transition-all duration-500 hover:scale-105 backdrop-blur-sm"
                style={{
                  animation: `fadeIn 0.6s ease-out ${i * 0.05}s backwards`,
                }}
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-blue-300">{tool.name}</h3>
                  <p className="text-sm text-gray-400">{tool.category}</p>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                    style={{
                      animation: 'shine 2s ease-in-out infinite',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tool Categories Summary */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-linear-to-br from-blue-500/10 to-blue-600/5 border border-blue-400/20 rounded-xl text-center">
              <div className="text-3xl mb-2">💼</div>
              <div className="text-xl font-bold text-blue-300 mb-2">Project Management</div>
              <p className="text-sm text-gray-400">Organize workflows and track progress efficiently</p>
            </div>
            <div className="p-6 bg-linear-to-br from-blue-500/10 to-blue-600/5 border border-blue-400/20 rounded-xl text-center">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-xl font-bold text-blue-300 mb-2">Communication</div>
              <p className="text-sm text-gray-400">Stay connected with teams and clients seamlessly</p>
            </div>
            <div className="p-6 bg-linear-to-br from-pink-500/10 to-pink-600/5 border border-pink-400/20 rounded-xl text-center">
              <div className="text-3xl mb-2">⚙️</div>
              <div className="text-xl font-bold text-pink-300 mb-2">Automation</div>
              <p className="text-sm text-gray-400">Streamline repetitive tasks and boost productivity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Client Success Stories
            </h2>
            <p className="text-gray-400 text-lg">Real results from real partnerships</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="p-8 bg-linear-to-br from-slate-900/80 to-blue-900/20 border border-blue-400/20 rounded-2xl backdrop-blur-sm hover:border-blue-400/50 transition-all duration-500 hover:scale-105"
                style={{
                  animation: `fadeIn 0.8s ease-out ${i * 0.2}s backwards`,
                }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-blue-300">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-gray-400 text-lg">Ready to transform your workflow? Reach out today!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6 flex flex-col justify-between">
              <a
                href="mailto:hello@eliteva.com"
                className="flex items-center space-x-4 p-6 bg-linear-to-br from-slate-900/50 to-blue-900/20 border border-blue-400/20 rounded-xl hover:border-blue-400/50 transition-all duration-300 group"
              >
                <Mail className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-lg text-blue-300">hello@eliteva.com</div>
                </div>
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center space-x-4 p-6 bg-linear-to-br from-slate-900/50 to-blue-900/20 border border-blue-400/20 rounded-xl hover:border-blue-400/50 transition-all duration-300 group"
              >
                <Phone className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div className="text-lg text-blue-300">+1 (234) 567-890</div>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                className="flex items-center space-x-4 p-6 bg-linear-to-br from-slate-900/50 to-blue-900/20 border border-blue-400/20 rounded-xl hover:border-blue-400/50 transition-all duration-300 group"
              >
                <Linkedin className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-sm text-gray-400">LinkedIn</div>
                  <div className="text-lg text-blue-300">Connect with me</div>
                </div>
              </a>
            </div>

            <div className="p-8 bg-linear-to-br from-slate-900/50 to-blue-900/20 border border-blue-400/20 rounded-2xl backdrop-blur-sm h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-6 text-blue-300">Quick Inquiry</h3>
              <div className="space-y-4 flex-1 flex flex-col">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-400/30 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-400/30 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                />
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-blue-400/30 rounded-lg focus:outline-none focus:border-blue-400 transition-colors resize-none flex-1"
                />
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-linear-to-r from-blue-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-blue-500/20 text-center text-gray-400">
        <p>© 2024 Elite VA. Empowering Your Success, One Task at a Time.</p>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes expandWidth {
          from {
            width: 0%;
          }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes drawCircle {
          from {
            strokeDashoffset: ${2 * Math.PI * 28};
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;