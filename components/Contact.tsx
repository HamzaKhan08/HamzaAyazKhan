import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle, Mail, Linkedin, Twitter, Github } from 'lucide-react';
import { sendEmail } from '../services/emailService';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }
  
    try {
      setStatus("loading");
  
      await sendEmail({
        name: formState.name,
        email: formState.email,
        message: formState.message,
      });
  
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
  
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-zinc-100 dark:bg-black flex items-center justify-center py-20 md:py-24 px-6 md:px-12 relative overflow-hidden transition-colors duration-500">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-300/20 dark:bg-zinc-800/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-2xl relative z-10 pb-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-zinc-900 dark:text-white mb-4 md:mb-6 tracking-tighter">Let's Talk.</h2>
          <p className="text-zinc-600 dark:text-zinc-500 text-base md:text-lg mb-8">
            Have a project in mind? Let's build something extraordinary.
          </p>

          {/* Direct Email Option
          <a 
            href="mailto:hamzakhan092005@gmail.com"
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white dark:bg-zinc-900 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-indigo-500/20 dark:hover:shadow-indigo-500/20 transition-all duration-300 group"
          >
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full group-hover:bg-indigo-500 group-hover:text-white text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
                <Mail size={16} />
            </div>
            <span className="text-zinc-700 dark:text-zinc-300 font-medium text-sm md:text-base pr-2 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">hamzakhan092005@gmail.com</span>
          </a> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
          
          {/* Name Input */}
          <div className="group relative">
            <input
              type="text"
              name="name"
              id="name"
              value={formState.name}
              onChange={handleChange}
              className="block w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 py-4 text-zinc-900 dark:text-white text-lg md:text-xl focus:border-zinc-900 dark:focus:border-white focus:outline-none transition-colors peer"
              placeholder=" "
              autoComplete="off"
            />
            <label 
              htmlFor="name" 
              className="absolute left-0 top-4 text-zinc-500 text-lg md:text-xl transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-zinc-900 dark:peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-zinc-900 dark:peer-[:not(:placeholder-shown)]:text-white pointer-events-none"
            >
              Your Name
            </label>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-zinc-900 dark:bg-white transition-all duration-500 peer-focus:w-full" />
          </div>

          {/* Email Input */}
          <div className="group relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
              className="block w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 py-4 text-zinc-900 dark:text-white text-lg md:text-xl focus:border-zinc-900 dark:focus:border-white focus:outline-none transition-colors peer"
              placeholder=" "
              autoComplete="off"
            />
            <label 
              htmlFor="email" 
              className="absolute left-0 top-4 text-zinc-500 text-lg md:text-xl transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-zinc-900 dark:peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-zinc-900 dark:peer-[:not(:placeholder-shown)]:text-white pointer-events-none"
            >
              Email Address
            </label>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-zinc-900 dark:bg-white transition-all duration-500 peer-focus:w-full" />
          </div>

          {/* Message Input */}
          <div className="group relative">
            <textarea
              name="message"
              id="message"
              rows={4}
              value={formState.message}
              onChange={handleChange}
              className="block w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 py-4 text-zinc-900 dark:text-white text-lg md:text-xl focus:border-zinc-900 dark:focus:border-white focus:outline-none transition-colors peer resize-none"
              placeholder=" "
            />
            <label 
              htmlFor="message" 
              className="absolute left-0 top-4 text-zinc-500 text-lg md:text-xl transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-zinc-900 dark:peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-zinc-900 dark:peer-[:not(:placeholder-shown)]:text-white pointer-events-none"
            >
              Write your message....
            </label>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-zinc-900 dark:bg-white transition-all duration-500 peer-focus:w-full" />
          </div>

          {/* Status Message Area */}
          <AnimatePresence mode='wait'>
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-red-400"
              >
                <AlertCircle size={18} />
                <span className="text-sm">{errorMessage}</span>
              </motion.div>
            )}
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-green-500 dark:text-green-400"
              >
                <CheckCircle size={18} />
                <span className="text-sm">Message sent successfully. I'll get back to you soon.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="group relative w-full md:w-auto px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <span className="absolute inset-0 w-full h-full bg-zinc-700 dark:bg-zinc-300 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              {status === 'loading' ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Sending...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle size={18} />
                  <span>Sent</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </form>
      </div>

      <footer className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center space-y-5">
        <div className="flex items-center gap-8">
            <a 
              href="https://linkedin.com/in/hamzaayazkhan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 transform hover:scale-110"
              aria-label="LinkedIn"
            >
                <Linkedin size={20} strokeWidth={1.5} />
            </a>
            <a 
              href="https://github.com/hamzakhan08" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 transform hover:scale-110"
              aria-label="Twitter"
            >
                <Github size={20} strokeWidth={1.5} />
            </a>
        </div>
        <p className="footer-signature text-zinc-400 dark:text-zinc-800 text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300">&copy; {new Date().getFullYear()} Hamza_Ayaz_Khan.</p>
      </footer>
    </section>
  );
};

export default Contact;