import React from "react";
import { CONTACT } from "../data/content";

const WhatsAppFloat: React.FC = () => {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-float-btn"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-teal animate-ping opacity-25" />
      <span className="relative flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-full bg-teal text-white shadow-lift hover:bg-teal-dark transition-all duration-300 hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7 md:h-8 md:w-8"
        >
          <path d="M20.52 3.48A11.85 11.85 0 0 0 12.02 0C5.4 0 .03 5.37.03 11.99c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.62a11.97 11.97 0 0 0 5.82 1.49h.01c6.62 0 11.99-5.37 11.99-11.99 0-3.2-1.25-6.21-3.5-8.4ZM12.03 21.3h-.01a9.3 9.3 0 0 1-4.74-1.3l-.34-.2-3.68.96.98-3.59-.22-.37a9.3 9.3 0 1 1 8.01 4.5Zm5.36-6.96c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.45a8.8 8.8 0 0 1-1.62-2.02c-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.58-.9-2.16-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.03 1-1.03 2.44 0 1.43 1.05 2.82 1.2 3.02.15.2 2.07 3.17 5.02 4.45.7.3 1.25.48 1.68.61.71.23 1.35.2 1.86.12.57-.08 1.74-.71 1.99-1.4.24-.7.24-1.29.17-1.41-.07-.13-.27-.2-.56-.34Z" />
        </svg>
      </span>
    </a>
  );
};

export default WhatsAppFloat;
