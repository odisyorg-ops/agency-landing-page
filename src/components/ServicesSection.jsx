import React, { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import bannerPic1 from "../assets/banner (1).jpg";
import bannerPic2 from "../assets/banner (2).jpg";
import bannerPic3 from "../assets/banner (3).jpg";
import bannerPic4 from "../assets/banner (4).jpg";
import bannerPic5 from "../assets/banner (5).jpg";
import bannerPic6 from "../assets/banner (6).jpg";
import bannerPic7 from "../assets/banner (7).jpg";

const SERVICES_DATA = [
  { step: "01", title: "Websites & SaaS", images: [bannerPic1, bannerPic2, bannerPic3] },
  { step: "02", title: "Mobile Apps", images: [bannerPic4, bannerPic5, bannerPic6] },
  { step: "03", title: "Custom Software", images: [bannerPic7, bannerPic1, bannerPic2] },
  { step: "04", title: "Automation Engines", images: [bannerPic3, bannerPic4, bannerPic5] },
  { step: "05", title: "AI & ML Solutions", images: [bannerPic6, bannerPic7, bannerPic1] },
];

export const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // --- ANIMATION FUNCTIONS ---
  const spring = (stiffness = 300, damping = 28) => ({ type: "spring", stiffness, damping });

  const panelAnimation = () => ({
    closed: {
      height: 0,
      opacity: 0,
      transition: { height: spring(350, 36), opacity: { duration: 0.15 } },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: spring(),
        opacity: { duration: 0.25 },
        when: "beforeChildren",
        staggerChildren: 0.09,
      },
    },
  });

  const imageAnimation = () => ({
    closed: { opacity: 0, y: 32, scale: 0.9 },
    open: { opacity: 1, y: 0, scale: 1, transition: spring(300, 24) },
  });

  const imageHover = { y: -6, scale: 1.05, transition: spring(400, 22) };

  const panel = panelAnimation();
  const image = imageAnimation();

  return (
    <MotionConfig reducedMotion="user">
      <section 
        className="w-full bg-white font-['Comfortaa'] overflow-hidden"
        style={{
          paddingTop: "clamp(4rem, 12vh, 8rem)",
          paddingBottom: "clamp(4rem, 12vh, 8rem)",
          paddingInline: "clamp(1rem, 5vw, 4rem)",
        }}
      >
        {/* Heading */}
        <header 
          className="mx-auto flex flex-col items-center text-center"
          style={{
            marginBottom: "clamp(3rem, 8vh, 6rem)",
            maxWidth: "min(90vw, 72rem)",
          }}
        >
          <span 
            className="flex items-center rounded-md bg-slate-100 font-medium text-slate-700"
            style={{
              marginBottom: "clamp(0.75rem, 2vh, 1.25rem)",
              paddingInline: "clamp(0.5rem, 1.5vw, 0.75rem)",
              paddingBlock: "clamp(0.25rem, 0.8vh, 0.5rem)",
              fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
              gap: "clamp(0.35rem, 1vw, 0.5rem)",
            }}
          >
            <span 
              className="rounded-full bg-slate-500" 
              style={{
                width: "clamp(0.35rem, 0.8vw, 0.45rem)",
                height: "clamp(0.35rem, 0.8vw, 0.45rem)",
              }}
            />
            Services
          </span>
          
          <h2 
            className="font-['Comfortaa'] font-bold text-slate-900"
            style={{
              fontSize: "clamp(1.85rem, 5vw, 3.25rem)",
              lineHeight: "clamp(1.1, 1.2, 1.25)",
            }}
          >
            What we <span className="text-slate-400">bring</span>
            <br />
            to the table
          </h2>
        </header>

        {/* Services list */}
        <div 
          className="mx-auto border-t border-slate-200"
          style={{ maxWidth: "min(90vw, 72rem)" }}
        >
          {SERVICES_DATA.map(({ step, title, images }, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <div
                key={step}
                tabIndex={0}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className="cursor-pointer border-b border-slate-200 outline-none"
                style={{
                  paddingBlock: "clamp(1.25rem, 3.5vh, 2.25rem)",
                  paddingInline: "clamp(0.5rem, 2vw, 1.5rem)",
                }}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`transition-colors duration-300 font-semibold ${
                      isOpen ? "text-[#111111]" : "text-slate-400"
                    }`}
                    style={{
                      fontSize: "clamp(1.15rem, 3vw, 1.75rem)",
                    }}
                  >
                    {title}
                  </h3>
                  <span
                    className={`font-mono transition-colors duration-300 ${
                      isOpen ? "text-slate-500" : "text-slate-300"
                    }`}
                    style={{
                      fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                    }}
                  >
                    {step}
                  </span>
                </div>

                <motion.div
                  initial={false}
                  animate={isOpen ? "open" : "closed"}
                  variants={panel}
                  className="overflow-hidden"
                >
                  <div 
                    className="flex overflow-x-auto no-scrollbar"
                    style={{
                      paddingTop: "clamp(1rem, 2.5vh, 1.5rem)",
                      gap: "clamp(0.75rem, 2vw, 1.25rem)",
                    }}
                  >
                    {images.map((src, imgIdx) => (
                      <motion.img
                        key={imgIdx}
                        src={src}
                        alt={`${title} preview ${imgIdx + 1}`}
                        variants={image}
                        whileHover={imageHover}
                        className="shrink-0 rounded-xl object-cover shadow-md"
                        style={{
                          width: "clamp(5.5rem, 18vw, 7.5rem)",
                          height: "clamp(5.5rem, 18vw, 7.5rem)",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </MotionConfig>
  );
};

export default ServicesSection;