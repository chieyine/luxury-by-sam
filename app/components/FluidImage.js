"use client";

import { motion } from "framer-motion";

export default function FluidImage({ src, alt, className = "", style = {} }) {
  // Using an inline SVG to define the fluid displacement filter
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <svg className="hidden">
        <defs>
          <filter id="fluid-hover">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.015;0.03;0.015"
                dur="15s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              className="displacement-map"
            />
          </filter>
        </defs>
      </svg>
      
      {/* We apply the filter using regular CSS via class toggles or raw style. 
          To animate the scale of the displacement, we use CSS variables/framer motion.
          But pure CSS hover works best here for the feDisplacementMap scale attribute. */}
      <style>{`
        .fluid-target {
          filter: url(#fluid-hover);
        }
        .displacement-map {
          transition: scale 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .group:hover .displacement-map {
          scale: 40;
        }
      `}</style>
      
      <motion.div
        className="absolute inset-0 fluid-target w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110"
        style={{ backgroundImage: src ? `url(${src})` : 'none', ...style }}
      />
    </div>
  );
}
