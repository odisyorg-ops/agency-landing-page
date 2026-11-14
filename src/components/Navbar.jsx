import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import WhatsAppCTA from '../ui/WhatsAppCTA';

const Navbar = ({
  whatsappNumber = "+8801622214734",
  whatsappMessage = "Hi! I'd love to book a call to discuss a project.",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Toggle background style after passing threshold
      setIsScrolled(currentScrollPos > 20);

      // Hide navbar when scrolling down, reveal when scrolling up
      if (prevScrollPos < currentScrollPos && currentScrollPos > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navGroups = [
    {
      label: "Home",
      href: "#",
    },
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Services",
      items: [
        { title: "Websites & SaaS", desc: "High-performance web apps & modern digital platforms.", href: "#services-web" },
        { title: "Mobile Apps", desc: "Native iOS & Android cross-platform solutions.", href: "#services-apps" },
        { title: "Custom Software", desc: "Bespoke enterprise software tailored to your workflow.", href: "#services-software" },
        { title: "Automation Engines", desc: "Automate complex business processes & tasks.", href: "#services-automation" },
        { title: "AI & ML Solutions", desc: "Intelligent agentic models & LLM integrations.", href: "#services-ai" },
      ],
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ];

  const NavItem = ({ title, desc, href }) => (
    <motion.li whileHover={{ x: 4 }}>
      <a href={href || "#"} className="group/item flex flex-col gap-1 rounded-xl p-3 transition-all hover:bg-[#536878]/15">
        <span className="flex items-center justify-between text-sm font-semibold text-black">
          {title} <ArrowRight size={14} className="-translate-x-2 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" />
        </span>
        <span className="line-clamp-2 text-[11px] font-medium text-slate-600">{desc}</span>
      </a>
    </motion.li>
  );

  return (
    <>
    <nav
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled ? 'border-b border-black/10 bg-white/85 shadow-sm backdrop-blur-xl' : 'bg-transparent'
      }`}
      style={{
        paddingBlock: isScrolled ? "clamp(0.75rem, 2vh, 1.25rem)" : "clamp(1.25rem, 3.5vh, 2rem)"
      }}
    >
      
      {/* Container wrapper set with fluid horizontal padding */}
      <div 
        className="flex items-center justify-between mx-12"
        
      >
        
        {/* LOGO */}
        <div className="flex-shrink-0">
          <a 
            href="#" 
            className="flex items-center gap-0.5 font-['Comfortaa'] font-bold text-black"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
          >
            ODISY<span className="text-[#536878]">.</span>
          </a>
        </div>

        {/* DESKTOP NAV (Hidden on smaller screens using media query via custom style/class) */}
        <div className="hidden items-center gap-2 [@media(min-width:1024px)]:flex">
          {navGroups.map((group, idx) => (
            <div 
              key={idx} 
              className="relative"
              onMouseEnter={() => group.items && setHoveredIndex(idx)}
              onMouseLeave={() => group.items && setHoveredIndex(null)}
            >
              {group.items ? (
                <button className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold transition-all cursor-pointer ${
                  hoveredIndex === idx ? 'text-[#536878]' : 'text-black hover:text-[#536878]'
                }`}>
                  {group.label}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredIndex === idx ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <a href={group.href} className="px-4 py-2 text-sm font-bold text-black transition-all hover:text-[#536878]">
                  {group.label}
                </a>
              )}

              {/* DROPDOWN MENU FOR SERVICES */}
              <AnimatePresence>
                {hoveredIndex === idx && group.items && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute left-0 top-full w-80 pt-4"
                  >
                    <div className="rounded-2xl border border-[#536878]/30 bg-white p-4 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5">
                      <ul className="space-y-1">
                        {group.items.map((item, i) => <NavItem key={i} {...item} />)}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* DESKTOP CTA ACTION BUTTON */}
        <div className="hidden items-center [@media(min-width:1024px)]:flex">
          <WhatsAppCTA
            phoneNumber={whatsappNumber}
            message={whatsappMessage}
            label="Book a call"
          />
        </div>

        {/* MOBILE MENU TOGGLE BUTTON (Visible only below 1024px) */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)} 
          aria-label="Open Menu"
          className="rounded-xl border border-black/15 p-2 text-black transition-colors hover:bg-black/5 [@media(min-width:1024px)]:hidden cursor-pointer"
        >
          <Menu size={24} />
        </button>
      </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU OVERLAY */}
       <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed inset-0 z-[150] flex flex-col overflow-y-auto bg-white text-black"
          style={{ padding: "clamp(1.5rem, 5vw, 2.5rem)" }}
        >
            {/* Header in overlay */}
            <div className="flex items-center justify-between w-full">
              <span 
                className="font-['Comfortaa'] font-bold text-black"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
              >
                ODISY<span className="text-[#536878]">.</span>
              </span>
              
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                aria-label="Close Menu"
                className="rounded-full border border-black/15 bg-black/5 p-3 text-black cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Menu Links */}
            <div className="flex flex-col space-y-6 my-auto py-8">
              {navGroups.map((group, idx) => (
                <div key={idx}>
                  {group.items ? (
                    <div className="space-y-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#536878]">
                        {group.label}
                      </p>
                      <div className="grid gap-3 pl-2 border-l border-[#536878]/20">
                        {group.items.map((item, i) => (
                          <a 
                            key={i} 
                            href={item.href} 
                            onClick={() => setIsMobileMenuOpen(false)} 
                            className="group block py-1"
                          >
                            <p className="text-base font-bold text-black active:text-[#536878]">
                              {item.title}
                            </p>
                            <p className="text-xs text-black/60">
                              {item.desc}
                            </p>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a 
                      href={group.href} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="block text-2xl font-bold text-black transition-colors hover:text-[#536878]"
                    >
                      {group.label}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA Action Footer */}
            <div className="mt-auto border-t border-black/10 pt-6 w-full">
              <WhatsAppCTA
                phoneNumber={whatsappNumber}
                message={whatsappMessage}
                label="Book a call"
              />
            </div>
         </motion.div>
      )}
    </AnimatePresence>
     </>
  );
};

export default Navbar;