import React from 'react';
import { MessageCircle } from "lucide-react";

const CallToAction = ({ 
  phoneNumber = "+8801622214734", 
  defaultMessage = "Hello ODISY team! I'm interested in discussing a project for my business." 
}) => {
  const handleWhatsAppClick = () => {
    const encodedMsg = encodeURIComponent(defaultMessage);
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodedMsg}`, '_blank');
  };

  return (
    <section 
      className="relative w-full bg-white font-['Comfortaa'] overflow-hidden"
      style={{
        paddingBlock: "clamp(4rem, 12vh, 8rem)",
        paddingInline: "clamp(1rem, 4vw, 3rem)",
      }}
    >
      {/* Outer fluid wrapper replacing fixed margins */}
      <div 
        className="mx-auto w-full"
        style={{ maxWidth: "min(90vw, 76rem)" }}
      >
        <div 
          className="relative mx-auto flex flex-col items-center overflow-hidden bg-gradient-to-br from-[#536878]/15 via-[#0a0a0a] to-[#0a0a0a] text-center shadow-2xl"
          style={{
            borderRadius: "clamp(1.5rem, 4vw, 2.5rem)",
            padding: "clamp(2.5rem, 8vw, 6rem)",
          }}
        >
          
          {/* Ambient Glow Effects */}
          <div 
            className="absolute rounded-full bg-[#536878]/25 blur-3xl pointer-events-none" 
            style={{
              top: "clamp(-6rem, -15vw, -3rem)",
              left: "clamp(-6rem, -15vw, -3rem)",
              width: "clamp(16rem, 35vw, 24rem)",
              height: "clamp(16rem, 35vw, 24rem)",
            }}
          />
          <div 
            className="absolute rounded-full bg-[#536878]/20 blur-3xl pointer-events-none" 
            style={{
              bottom: "clamp(-6rem, -15vw, -3rem)",
              right: "clamp(-6rem, -15vw, -3rem)",
              width: "clamp(16rem, 35vw, 24rem)",
              height: "clamp(16rem, 35vw, 24rem)",
            }}
          />

          {/* Card Content */}
          <div className="relative z-10 flex flex-col items-center w-full">
            
            <h2 
              className="font-bold text-[#e5e4e2] font-['Comfortaa']"
              style={{
                fontSize: "clamp(1.85rem, 5.2vw, 3.75rem)",
                lineHeight: "clamp(1.15, 1.25, 1.3)",
                marginBottom: "clamp(1.25rem, 3vh, 1.75rem)",
              }}
            >
              Ready to Accelerate Your <br />
              <span className="text-[#536878]">Digital Footprint?</span>
            </h2>

            <p 
              className="text-[#e5e4e2]/70 font-['Comfortaa']"
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1.125rem)",
                lineHeight: "1.6",
                maxWidth: "min(100%, 42rem)",
                marginBottom: "clamp(2rem, 5vh, 3rem)",
              }}
            >
              Skip the lengthy contact forms. Connect directly with our lead architects on WhatsApp for instant scope discussions and immediate project onboarding.
            </p>

            {/* WhatsApp CTA Button */}
            <button 
              onClick={handleWhatsAppClick}
              className="group flex items-center bg-[#e5e4e2] font-bold text-[#0a0a0a] shadow-xl transition-all hover:bg-white hover:shadow-[#536878]/30 cursor-pointer"
              style={{
                borderRadius: "clamp(0.75rem, 2vw, 1rem)",
                paddingInline: "clamp(1.75rem, 4vw, 2.75rem)",
                paddingBlock: "clamp(1rem, 2.5vh, 1.25rem)",
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                gap: "clamp(0.5rem, 1.5vw, 0.75rem)",
              }}
            >
              <MessageCircle 
                className="text-emerald-600 transition-transform group-hover:scale-110 shrink-0" 
                style={{
                  width: "clamp(1.15rem, 2.5vw, 1.35rem)",
                  height: "clamp(1.15rem, 2.5vw, 1.35rem)",
                }}
              />
              Chat on WhatsApp Now
            </button>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;