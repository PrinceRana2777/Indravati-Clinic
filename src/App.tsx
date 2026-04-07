/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
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
import { CLINIC_DETAILS, SERVICES, REVIEWS, GALLERY_IMAGES } from './constants';

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
    { id: 'gallery', label: 'Gallery' },
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
            {['Home', 'About', 'Doctor', 'Services', 'Gallery', 'Contact'].map((item) => (
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

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${CLINIC_DETAILS.whatsapp}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={28} fill="currentColor" />
    <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap pointer-events-none">
      Chat with us
    </span>
  </a>
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
                        <option value="morning">Morning</option>
                        <option value="evening">Evening</option>
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
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920" 
            alt="Clinic Interior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/90 to-blue-900/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-6">
              Trusted Healthcare in Naigaon East
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Health is Our <br /> <span className="text-blue-300">Top Priority</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto mb-10 font-light">
              Experience professional medical care with {CLINIC_DETAILS.doctorName}. We provide comprehensive treatments tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setActivePage('contact')}
                className="w-full sm:w-auto bg-white text-medical-blue px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl"
              >
                Book Appointment
              </button>
              <button 
                onClick={() => setActivePage('services')}
                className="w-full sm:w-auto bg-transparent border-2 border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
              >
                Our Services
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Highlights */}
        <div className="absolute bottom-10 left-0 w-full hidden lg:block">
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
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
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

const AboutPage = () => {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800" 
              alt="Clinic Journey" 
              className="rounded-3xl shadow-2xl relative z-10 w-full"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-10 -left-10 w-full h-full border-4 border-medical-blue rounded-3xl -z-0 hidden md:block"></div>
            <div className="absolute -bottom-10 right-10 bg-white p-8 rounded-2xl shadow-xl z-20 max-w-xs hidden md:block">
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
        <div className="py-24 bg-gray-50 rounded-[3rem] px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Journey</h2>
            <p className="text-gray-500 mt-2">Milestones that define our commitment</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-blue-200 rounded-full"></div>
            
            {[
              { year: "2008", title: "The Beginning", desc: "Dr. O.P. Yadav started his medical practice with a small clinic." },
              { year: "2012", title: "Expansion", desc: "Moved to a larger facility to accommodate more patients." },
              { year: "2018", title: "Modernization", desc: "Integrated advanced diagnostic tools and emergency care." },
              { year: "2024", title: "Digital Era", desc: "Launched online appointment booking and digital records." }
            ].map((item, i) => (
              <div key={i} className={`relative flex items-center mb-16 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="w-1/2 px-8">
                  <div className={`p-6 bg-white rounded-2xl shadow-sm border border-gray-100 ${i % 2 === 0 ? 'text-right' : ''}`}>
                    <span className="text-medical-blue font-bold text-xl">{item.year}</span>
                    <h3 className="text-lg font-bold mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-medical-blue rounded-full border-4 border-white shadow-md z-10"></div>
                <div className="w-1/2"></div>
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
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet Our Expert</h2>
          <p className="text-gray-500">Dedicated to providing the best medical care</p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[500px] lg:h-auto overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800" 
                alt="Dr. O.P. Yadav" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
                <div className="text-white">
                  <p className="text-sm font-medium mb-1">Registration No.</p>
                  <p className="text-xl font-bold">{CLINIC_DETAILS.regNo}</p>
                </div>
              </div>
            </div>
            
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <span className="text-medical-blue font-bold tracking-widest uppercase text-sm mb-4">Chief Medical Officer</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{CLINIC_DETAILS.doctorName}</h2>
              <p className="text-lg text-gray-500 font-medium mb-8">{CLINIC_DETAILS.qualification}</p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center">
                  <div className="bg-blue-50 p-3 rounded-xl mr-4">
                    <Award className="text-medical-blue w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Experience</h4>
                    <p className="text-gray-600 text-sm">15+ Years in Clinical Practice</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-50 p-3 rounded-xl mr-4">
                    <Stethoscope className="text-medical-blue w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Specializations</h4>
                    <p className="text-gray-600 text-sm">General Medicine, Emergency Care, Chronic Diseases</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-50 p-3 rounded-xl mr-4">
                    <MapPin className="text-medical-blue w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Education</h4>
                    <p className="text-gray-600 text-sm">Mumbai University & Hinduja Hospital</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold mb-3">Philosophy</h4>
                <p className="text-gray-600 text-sm italic">
                  "I believe in treating the person, not just the disease. My approach combines the best of traditional Ayurvedic wisdom with modern emergency medical skills."
                </p>
              </div>
            </div>
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
                    <p className="text-2xl font-bold text-medical-blue">{activeService.price}</p>
                  </div>
                  <button className="bg-medical-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all ml-auto">
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
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center border border-gray-100">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <Clock className="text-medical-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Available</p>
                    <p className="text-sm font-bold">Mon - Sat</p>
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
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Clinic Gallery</h2>
          <p className="text-gray-500">A glimpse into our professional environment</p>
        </div>

        <div className="masonry-grid gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="masonry-item relative overflow-hidden rounded-3xl group cursor-pointer"
            >
              <img 
                src={img} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-medical-blue/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white p-4 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500">
                  <ChevronRight className="text-medical-blue" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
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
            <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.662489115664!2d72.8465!3d19.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a96999999999%3A0x9999999999999999!2sNaigaon%20East!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
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
                      <option value="evening">Evening (5:30 PM - 10:30 PM)</option>
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
      case 'gallery': return <GalleryPage />;
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
      <WhatsAppButton />
      <StickyCTA openModal={() => setIsModalOpen(true)} />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
