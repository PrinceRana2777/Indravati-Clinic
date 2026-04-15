/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Stethoscope, 
  Activity, 
  HeartPulse, 
  UserRound, 
  ChevronRight, 
  ChevronLeft,
  Menu, 
  X, 
  Star,
  MessageCircle,
  Calendar,
  Award,
  ShieldCheck,
  ThumbsUp,
  ArrowRight
} from 'lucide-react';
import { CLINIC_DETAILS, SERVICES, REVIEWS } from './constants';

// --- Components ---

const Navbar = ({ activePage, setActivePage, openModal }: { activePage: string, setActivePage: (p: string) => void, openModal: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'doctor', label: 'Doctor' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 glass-nav ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => setActivePage('home')}>
          <div className="bg-medical-blue p-2 rounded-lg mr-3 shadow-md shadow-blue-100">
            <Stethoscope className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-none text-gray-900">
              {CLINIC_DETAILS.name}
            </h1>
            <p className="text-[10px] font-bold text-medical-blue uppercase tracking-wider">
              {CLINIC_DETAILS.nameHindi}
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-sm transition-all duration-300 hover:text-medical-teal relative py-1 ${
                activePage === link.id 
                  ? 'text-medical-teal font-bold' 
                  : 'text-gray-600 font-medium'
              }`}
            >
              {link.label}
              {activePage === link.id && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-medical-teal rounded-full"
                />
              )}
            </button>
          ))}
          <button 
            onClick={openModal}
            className="bg-medical-blue text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 hover:shadow-blue-200 active:scale-95"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-4 text-base font-medium border-b border-gray-50 ${
                    activePage === link.id ? 'text-medical-blue bg-blue-50' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4">
                <button 
                  onClick={() => {
                    openModal();
                    setIsOpen(false);
                  }}
                  className="w-full bg-medical-blue text-white py-3 rounded-xl font-bold"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setActivePage }: { setActivePage: (p: string) => void }) => (
  <footer className="bg-gray-900 text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center mb-6">
            <div className="bg-medical-blue p-2 rounded-lg mr-3">
              <Stethoscope className="text-white w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">{CLINIC_DETAILS.name}</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Providing high-quality medical care with a focus on patient satisfaction and trusted treatments. Led by Dr. O.P. Yadav.
          </p>
          <div className="flex space-x-4">
            <a href={`tel:${CLINIC_DETAILS.phone}`} className="bg-gray-800 p-2 rounded-full hover:bg-medical-blue transition-colors">
              <Phone size={18} />
            </a>
            <a href={`mailto:${CLINIC_DETAILS.email}`} className="bg-gray-800 p-2 rounded-full hover:bg-medical-blue transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            {['Home', 'About', 'Doctor', 'Services', 'Contact'].map((item) => (
              <li key={item}>
                <button 
                  onClick={() => setActivePage(item.toLowerCase())}
                  className="hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight size={14} className="mr-2 text-medical-blue group-hover:translate-x-1 transition-transform" />
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6">Our Timings</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex justify-between">
              <span>Morning:</span>
              <span className="text-white">{CLINIC_DETAILS.timings.morning}</span>
            </li>
            <li className="flex justify-between">
              <span>Evening:</span>
              <span className="text-white">{CLINIC_DETAILS.timings.evening}</span>
            </li>
            <li className="pt-2 text-medical-accent font-medium">
              Open Monday - Saturday
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6">Contact Info</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start">
              <MapPin size={18} className="mr-3 text-medical-blue shrink-0" />
              <span>{CLINIC_DETAILS.address}</span>
            </li>
            <li className="flex items-center">
              <Phone size={18} className="mr-3 text-medical-blue shrink-0" />
              <span>{CLINIC_DETAILS.phone}</span>
            </li>
            <li className="flex items-center">
              <Mail size={18} className="mr-3 text-medical-blue shrink-0" />
              <span>{CLINIC_DETAILS.email}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} {CLINIC_DETAILS.name}. All rights reserved. Reg No: {CLINIC_DETAILS.regNo}</p>
      </div>
    </div>
  </footer>
);

const FloatingContactWidget = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    {/* WhatsApp Button */}
    <a
      href={`https://wa.me/${CLINIC_DETAILS.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group relative"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
      <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </a>

    {/* Call Button */}
    <a
      href={`tel:${CLINIC_DETAILS.phone}`}
      className="bg-medical-blue text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group relative"
      aria-label="Call Clinic"
    >
      <Phone size={28} fill="currentColor" />
      <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap pointer-events-none">
        Call Now
      </span>
    </a>
  </div>
);

const StickyCTA = ({ openModal }: { openModal: () => void }) => (
  <div className="fixed bottom-6 left-6 z-50 hidden sm:block">
    <button
      onClick={openModal}
      className="bg-medical-blue text-white px-6 py-3 rounded-full shadow-2xl hover:bg-blue-700 transition-all flex items-center font-bold"
    >
      <Calendar size={20} className="mr-2" />
      Book Appointment
    </button>
  </div>
);

const BookingModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '+91 ',
    date: '',
    time: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `Hello Indravati Clinic, I would like to book an appointment.%0A%0A*Details:*%0A- Name: ${formState.name}%0A- Phone: ${formState.phone}%0A- Date: ${formState.date}%0A- Time: ${formState.time}`;
    const whatsappUrl = `https://wa.me/${CLINIC_DETAILS.whatsapp}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
          >
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-medical-blue to-blue-400 p-8 text-white">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-1">Book Appointment</h2>
              <p className="text-blue-50 text-sm font-medium">Indravati Clinic – Caring for You Always</p>
            </div>

            <div className="p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThumbsUp className="text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Request Received!</h4>
                  <p className="text-gray-600">We will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all"
                      value={formState.phone}
                      onChange={(e) => setFormState({...formState, phone: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Select Date</label>
                      <input 
                        type="date" 
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all text-sm"
                        value={formState.date}
                        onChange={(e) => setFormState({...formState, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Select Time</label>
                      <select 
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all text-sm"
                        value={formState.time}
                        onChange={(e) => setFormState({...formState, time: e.target.value})}
                      >
                        <option value="">Time Slot</option>
                        <option value="morning">Morning (10:00 AM - 1:30 PM)</option>
                        <option value="evening">Evening (6:00 PM - 10:00 PM)</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-medical-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mt-4"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Pages ---

const HomePage = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 lg:pb-48">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920" 
            alt="Clinic Interior" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Softer, more balanced overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-medical-blue/70 via-medical-blue/40 to-black/30"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-8 border border-white/10">
              Trusted Healthcare in Naigaon East
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
              Your Health is Our <br /> <span className="text-blue-300">Top Priority</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Experience professional medical care with {CLINIC_DETAILS.doctorName}. We provide comprehensive treatments tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setActivePage('contact')}
                className="w-full sm:w-auto bg-white text-medical-blue px-12 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 active:scale-95"
              >
                Book Appointment
              </button>
              <button 
                onClick={() => setActivePage('services')}
                className="w-full sm:w-auto bg-transparent border-2 border-white/40 backdrop-blur-md text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
              >
                Our Services
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Highlights */}
        <div className="absolute bottom-12 left-0 w-full hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Experienced Doctor", desc: "Expert care by Dr. O.P. Yadav" },
              { icon: ShieldCheck, title: "Trusted Treatment", desc: "B.A.M.S & P.G.D.E.M.S certified" },
              { icon: ThumbsUp, title: "Patient Satisfaction", desc: "Top-rated clinic in Palghar" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.2) }}
                className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 flex items-center"
              >
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  <item.icon className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold">{item.title}</h3>
                  <p className="text-blue-100 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Specialized Services</h2>
            <div className="w-20 h-1.5 bg-medical-blue mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => {
              const Icon = { Stethoscope, Activity, HeartPulse, UserRound }[service.icon] || Stethoscope;
              return (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-medical-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-medical-blue transition-colors">
                    <Icon className="text-medical-blue group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <div className="flex items-center text-[10px] font-bold text-medical-teal uppercase tracking-wider mb-4">
                    <Clock size={12} className="mr-1" />
                    Mon - Sat | 10:00 AM - 10:00 PM
                  </div>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <button 
                    onClick={() => setActivePage('services')}
                    className="text-medical-blue font-bold text-sm flex items-center hover:underline"
                  >
                    Learn More <ArrowRight size={16} className="ml-2" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
              alt="Doctor Consulting" 
              className="rounded-3xl shadow-2xl relative z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-medical-blue rounded-3xl -z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl z-20 flex items-center">
              <div className="text-4xl font-bold text-medical-blue mr-4">15+</div>
              <div className="text-sm font-bold text-gray-700 leading-tight">Years of <br /> Experience</div>
            </div>
          </div>
          
          <div>
            <span className="text-medical-blue font-bold tracking-widest uppercase text-sm">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-8">Committed to Your Health and Wellbeing</h2>
            <div className="space-y-8">
              {[
                { title: "Expert Medical Team", desc: "Led by Dr. O.P. Yadav with extensive clinical experience." },
                { title: "Modern Facilities", desc: "Equipped with the latest medical tools for accurate diagnosis." },
                { title: "Patient-Centric Care", desc: "We listen to our patients and provide personalized treatment plans." }
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <ThumbsUp className="text-green-600 w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setActivePage('about')}
              className="mt-12 bg-medical-blue text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all"
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-medical-blue text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Patients Say</h2>
            <p className="text-blue-100">Real feedback from our valued patients</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg italic mb-6">"{review.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center font-bold mr-3">
                    {review.name[0]}
                  </div>
                  <span className="font-bold">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ImageSlider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleManualAction = (action: () => void) => {
    action();
    setIsAutoPlaying(false);
    // Resume auto-playing after 5 seconds of inactivity
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [isAutoPlaying, images.length]);

  return (
    <div className="relative w-full h-full group overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover object-[50%_60%] display-block"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>

      {/* Manual Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => handleManualAction(prevSlide)}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/40 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleManualAction(nextSlide)}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/40 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => handleManualAction(() => setCurrentIndex(i))}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === currentIndex 
                ? 'bg-white w-8 shadow-lg' 
                : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

const AboutPage = () => {
  const clinicImages = [
    "https://iili.io/BOx18aS.md.jpg",
    "https://iili.io/BOx1e6l.md.jpg",
    "https://iili.io/BOx1vF2.md.jpg"
  ];

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            {/* Image Container with Border and Overflow Hidden */}
            <div className="relative z-10 w-full aspect-[4/3] overflow-hidden rounded-[30px] border-4 border-medical-blue shadow-2xl bg-gray-50 p-0">
              <ImageSlider images={clinicImages} />
            </div>
            
            {/* Decorative Background Element */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-medical-blue/10 rounded-[30px] -z-10 hidden md:block"></div>
            
            <div className="absolute -bottom-10 right-10 bg-white p-8 rounded-2xl shadow-xl z-20 max-w-xs hidden md:block border border-gray-100">
              <p className="text-gray-600 italic font-medium">
                "Our mission is to provide accessible, high-quality healthcare to every individual in our community."
              </p>
              <div className="mt-4 font-bold text-medical-blue">— Dr. O.P. Yadav</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-medical-blue font-bold tracking-widest uppercase text-sm">About Indravati Clinic</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">A Legacy of Care and Trust</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Indravati Clinic was founded with a vision to bridge the gap between traditional wisdom and modern medical practices. Named after a symbol of purity and life, we strive to provide holistic healing to all our patients.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Under the expert guidance of Dr. O.P. Yadav, the clinic has grown to become a cornerstone of healthcare in Naigaon East. We believe that every patient deserves personalized attention and a treatment plan that addresses the root cause of their health issues.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-bold text-medical-blue mb-2">15+</h4>
                <p className="text-sm font-bold text-gray-500 uppercase">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-medical-blue mb-2">10k+</h4>
                <p className="text-sm font-bold text-gray-500 uppercase">Happy Patients</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="py-24 bg-gray-50 rounded-[3rem] px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Journey</h2>
            <p className="text-gray-500 mt-2">Milestones that define our commitment</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line - Hidden on small mobile, visible on md+ */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-1 h-full bg-blue-200 rounded-full"></div>
            
            {[
              { year: "2011", title: "The Beginning", desc: "Dr. O.P. Yadav started his medical practice initially working in hospitals." },
              { year: "2012", title: "Expansion", desc: "Moved to a larger facility to accommodate more patients." },
              { year: "2018", title: "Modernization", desc: "Integrated advanced diagnostic tools and emergency care." }
            ].map((item, i) => (
              <div key={i} className={`relative flex items-center mb-12 md:mb-16 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 md:px-8">
                  <div className={`p-6 bg-white rounded-2xl shadow-sm border border-gray-100 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <span className="text-medical-blue font-bold text-xl">{item.year}</span>
                    <h3 className="text-lg font-bold mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
                {/* Dot */}
                <div className="absolute left-1.5 md:left-1/2 md:-translate-x-1/2 w-6 h-6 bg-medical-blue rounded-full border-4 border-white shadow-md z-10"></div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorPage = () => {
  return (
    <div className="pt-24 pb-24 bg-gradient-to-b from-white to-medical-light/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-medical-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-medical-teal/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-medical-blue font-bold tracking-widest uppercase text-xs mb-3 block"
          >
            Expert Care
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
          >
            Meet Our Expert
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto"
          >
            Dedicated to providing the best medical care with a focus on holistic healing and modern emergency expertise.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image & Basic Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-medical-blue/5 rounded-[3rem] blur-2xl group-hover:bg-medical-blue/10 transition-colors duration-500" />
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src="https://iili.io/Be3bXKg.md.png" 
                    alt="Dr. O.P. Yadav" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Registration Number removed from here for cleaner look */}
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-medical-light rounded-2xl flex items-center justify-center mr-4">
                    <Award className="text-medical-blue w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Chief Medical Officer</h4>
                    <p className="text-sm text-gray-500">Indravati Clinic</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-start text-sm py-3 border-b border-gray-50">
                    <span className="text-gray-500">Availability</span>
                    <div className="text-right">
                      <span className="font-bold text-medical-teal block">Mon - Sat</span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {CLINIC_DETAILS.timings.morning} & {CLINIC_DETAILS.timings.evening}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                    <span className="text-gray-500">Consultation</span>
                    <span className="font-bold text-medical-blue">{CLINIC_DETAILS.consultationFee}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Detailed Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 space-y-8"
            >
              <div>
                <h2 className="text-5xl font-bold text-gray-900 mb-2">{CLINIC_DETAILS.doctorName}</h2>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <p className="text-xl text-medical-blue font-medium">{CLINIC_DETAILS.qualification}</p>
                  <span className="px-3 py-1 bg-medical-light text-medical-blue text-[10px] font-bold rounded-full border border-medical-blue/20 uppercase tracking-wider">
                    Reg No: {CLINIC_DETAILS.regNo}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: Award, title: "Experience", desc: "15+ Years in Clinical Practice", color: "blue" },
                    { icon: Stethoscope, title: "Specializations", desc: "General Medicine, Chronic Diseases, EMS", color: "teal" },
                    { icon: MapPin, title: "Education", desc: "Mumbai University & Hinduja Hospital", color: "blue" },
                    { icon: ShieldCheck, title: "Certified", desc: "B.A.M.S & P.G.D.E.M.S Registered", color: "teal" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${item.color === 'blue' ? 'bg-blue-50 text-medical-blue group-hover:bg-medical-blue group-hover:text-white' : 'bg-teal-50 text-medical-teal group-hover:bg-medical-teal group-hover:text-white'}`}>
                        <item.icon size={20} />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-medical-blue/20 rounded-full" />
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <MessageCircle size={120} />
                  </div>
                  <h4 className="font-bold text-xl mb-4 flex items-center">
                    <span className="w-8 h-8 bg-medical-blue text-white rounded-lg flex items-center justify-center mr-3 text-xs">"</span>
                    Philosophy of Care
                  </h4>
                  <p className="text-gray-600 text-lg italic leading-relaxed relative z-10">
                    "I believe in treating the person, not just the disease. My approach combines the best of traditional Ayurvedic wisdom with modern emergency medical skills to provide truly holistic healthcare."
                  </p>
                  <div className="mt-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-medical-light flex items-center justify-center text-medical-blue font-bold text-xs">OY</div>
                    <div className="ml-3">
                      <p className="font-bold text-sm text-gray-900">{CLINIC_DETAILS.doctorName}</p>
                      <p className="text-xs text-gray-500">Chief Medical Officer</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="bg-medical-blue text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center">
                  <Calendar size={20} className="mr-2" />
                  Book Consultation
                </button>
                <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center">
                  <Phone size={20} className="mr-2" />
                  Contact Clinic
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState(SERVICES[0].id);

  const activeService = SERVICES.find(s => s.id === activeTab) || SERVICES[0];
  const Icon = { Stethoscope, Activity, HeartPulse, UserRound }[activeService.icon] || Stethoscope;

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Medical Services</h2>
          <p className="text-gray-500">Comprehensive care for you and your family</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`px-8 py-4 rounded-full font-bold transition-all ${
                activeTab === s.id 
                  ? 'bg-medical-blue text-white shadow-xl scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border border-gray-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-20 h-20 bg-medical-light rounded-[2rem] flex items-center justify-center mb-8">
                  <Icon className="text-medical-blue w-10 h-10" />
                </div>
                <h3 className="text-4xl font-bold mb-6">{activeService.title}</h3>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {activeService.description}
                </p>
                
                <div className="mb-10">
                  <h4 className="font-bold text-xl mb-4">Key Benefits</h4>
                  <ul className="space-y-4">
                    {activeService.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                          <ChevronRight size={14} className="text-green-600" />
                        </div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="mr-8">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Consultation Fee</p>
                    <p className="text-2xl font-bold text-medical-blue">{CLINIC_DETAILS.consultationFee}</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab(SERVICES[0].id)}
                    className="bg-medical-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all ml-auto"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              <div className="relative">
                <img 
                  src={`https://images.unsplash.com/photo-1505751172107-573225a9420a?auto=format&fit=crop&q=80&w=800`} 
                  alt={activeService.title} 
                  className="rounded-[2.5rem] shadow-2xl w-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-10 -left-6 bg-white p-6 rounded-3xl shadow-2xl flex items-center border border-gray-100 z-20 min-w-[300px] max-w-[90%] md:max-w-md">
                  <div className="bg-medical-light p-3 rounded-2xl mr-4 shrink-0">
                    <Clock className="text-medical-blue w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-1">Service Availability</p>
                    <p className="text-sm font-bold text-gray-900 leading-relaxed">
                      Mon – Sat <span className="text-gray-300 mx-2">|</span> 
                      <span className="text-medical-blue">{CLINIC_DETAILS.timings.morning}</span>
                      <span className="mx-1 text-gray-400">&</span>
                      <span className="text-medical-blue">{CLINIC_DETAILS.timings.evening}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  return null;
};

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `Hello Indravati Clinic, I would like to book an appointment.%0A%0A*Details:*%0A- Name: ${formState.name}%0A- Phone: ${formState.phone}%0A- Date: ${formState.date}%0A- Time: ${formState.time}%0A- Message: ${formState.message}`;
    const whatsappUrl = `https://wa.me/${CLINIC_DETAILS.whatsapp}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-500">Book your appointment or ask a question</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map & Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 h-[350px]">
              <iframe 
                src="https://www.google.com/maps?q=D2/8, Kini, Indravati Clinic, Seven Square Academy School&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Clinic Location"
              ></iframe>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Phone className="text-medical-blue" />
                </div>
                <h4 className="font-bold mb-2">Call Us</h4>
                <p className="text-gray-600 text-sm mb-4">{CLINIC_DETAILS.phone}</p>
                <a href={`tel:${CLINIC_DETAILS.phone}`} className="text-medical-blue font-bold text-sm hover:underline">Click to Call</a>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="text-medical-blue" />
                </div>
                <h4 className="font-bold mb-2">Working Hours</h4>
                <p className="text-gray-600 text-xs">Morning: {CLINIC_DETAILS.timings.morning}</p>
                <p className="text-gray-600 text-xs">Evening: {CLINIC_DETAILS.timings.evening}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-8">Book Appointment</h3>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="text-white" />
                </div>
                <h4 className="text-green-800 font-bold text-xl mb-2">Request Sent!</h4>
                <p className="text-green-700">We will call you shortly to confirm your appointment.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all"
                      placeholder="Enter your name"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all"
                      placeholder="+91 XXXXX XXXXX"
                      value={formState.phone}
                      onChange={(e) => setFormState({...formState, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all"
                      value={formState.date}
                      onChange={(e) => setFormState({...formState, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Time</label>
                    <select 
                      required
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all"
                      value={formState.time}
                      onChange={(e) => setFormState({...formState, time: e.target.value})}
                    >
                      <option value="">Select Time</option>
                      <option value="morning">Morning (10:00 AM - 1:30 PM)</option>
                      <option value="evening">Evening (6:00 PM - 10:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message (Optional)</label>
                  <textarea 
                    rows={4}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all"
                    placeholder="Tell us about your health concern"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-medical-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                >
                  Confirm Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  // Auto-popup logic
  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem('hasShownPopup');
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        sessionStorage.setItem('hasShownPopup', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage setActivePage={setActivePage} />;
      case 'about': return <AboutPage />;
      case 'doctor': return <DoctorPage />;
      case 'services': return <ServicesPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activePage={activePage} setActivePage={setActivePage} openModal={() => setIsModalOpen(true)} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setActivePage={setActivePage} />
      <FloatingContactWidget />
      <StickyCTA openModal={() => setIsModalOpen(true)} />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
