"use client"

import React, { useEffect, useRef } from 'react';

const GradientTextAnimation = ({ text = "Lenient  Tree" }) => {
  const textContainerRef = useRef(null);

  useEffect(() => {
    const container = textContainerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(".char");

    const handleMouseMove = (e) => {
      let hoveredChar = null;

      chars.forEach(char => {
        const rect = char.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          hoveredChar = char;
        }
      });

      chars.forEach(char => {
        char.classList.remove('active');
      });

      if (hoveredChar) {
        const charRect = hoveredChar.getBoundingClientRect();
        const mouseX = e.clientX - charRect.left;
        const mouseY = e.clientY - charRect.top;

        hoveredChar.style.setProperty('--mouse-x', `${mouseX}px`);
        hoveredChar.style.setProperty('--mouse-y', `${mouseY}px`);
        hoveredChar.classList.add('active');
      }
    };

    const handleMouseLeave = () => {
      chars.forEach(char => {
        char.classList.remove('active');
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [text]);

  return (
    // Only the h1 element is rendered, removing the outer div
      <h1 className="font-Urbanist text-container" ref={textContainerRef}>
      {[...text].map((char, index) => (
        <span key={index} className="char" data-char={char}>
          {char === ' ' ? '\u00A0' : char} {/* Render non-breaking space for actual spaces */}
        </span>
      ))}

      {/* Embedded CSS */}
      <style>
        

        {`
        .text-container {
          font-size:9vw;
          font-weight:400;
          display: inline-block;
          cursor: default;
          position: relative;
        }

        .char {
          display: inline-block;
          position: relative;
          color: #d2cece;
        }

        .char::before {
          content: attr(data-char);
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          pointer-events: none;
          background: radial-gradient(
            circle at var(--mouse-x, -100px) var(--mouse-y, -100px),
            #9AE600 0px,
            #bdf44e 20px,
            #cef977 35px,
            #d9f2a7 50px,
            transparent 50px
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          mask: radial-gradient(
            circle at var(--mouse-x, -100px) var(--mouse-y, -100px),
            rgba(0,0,0,1) 0px,
            rgba(0,0,0,1) 20px,
            rgba(0,0,0,0) 20px
          );
          -webkit-mask: radial-gradient(
            circle at var(--mouse-x, -100px) var(--mouse-y, -100px),
            rgba(0,0,0,1) 0px,
            rgba(0,0,0,1) 20px,
            rgba(0,0,0,0) 30px
          );
           transition: opacity 0.1s ease-out-in;
        }

        .char.active::before {
          opacity: 1;
        }

        /* Responsive font size for smaller screens */
        @media (max-width: 768px) {
          .text-container {
            font-size:10vw;
          }
        }
        @media (max-width: 480px) {
          .text-container {
            font-size: 17vw;
          }
        }
        `}
      </style>
    </h1>
  );
};

export default GradientTextAnimation;
