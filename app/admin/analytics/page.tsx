import React from 'react'

export default function Page() {
  return (
    <div className="flex-1 bg-white grid place-content-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold relative">
      {/* Inline Tailwind styles for animation */}
      <style>
        {`
          @layer utilities {
            @keyframes fade {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }
            .animate-fade {
              animation: fade 2s ease-in-out infinite;
            }
          }
        `}
      </style>

      <p className="animate-fade">
        COMING SOON
      </p>
    </div>
  )
}
