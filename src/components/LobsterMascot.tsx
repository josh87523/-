import React from 'react';

export default function LobsterMascot({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Antennae */}
      <div className="absolute -top-[10%] left-1/3 w-[3%] h-[25%] bg-red-500 rounded-full rotate-[-25deg] origin-bottom z-0"></div>
      <div className="absolute -top-[10%] right-1/3 w-[3%] h-[25%] bg-red-500 rounded-full rotate-[25deg] origin-bottom z-0"></div>

      {/* Left Legs */}
      <div className="absolute top-[45%] -left-[3%] w-[15%] h-[5%] bg-red-600 rounded-full rotate-[-20deg] z-0"></div>
      <div className="absolute top-[55%] -left-[5%] w-[15%] h-[5%] bg-red-600 rounded-full rotate-[-10deg] z-0"></div>
      <div className="absolute top-[65%] -left-[3%] w-[15%] h-[5%] bg-red-600 rounded-full rotate-[0deg] z-0"></div>

      {/* Right Legs */}
      <div className="absolute top-[45%] -right-[3%] w-[15%] h-[5%] bg-red-600 rounded-full rotate-[20deg] z-0"></div>
      <div className="absolute top-[55%] -right-[5%] w-[15%] h-[5%] bg-red-600 rounded-full rotate-[10deg] z-0"></div>
      <div className="absolute top-[65%] -right-[3%] w-[15%] h-[5%] bg-red-600 rounded-full rotate-[0deg] z-0"></div>

      {/* Left Claw */}
      <div className="absolute top-[15%] -left-[18%] w-[37%] h-[43%] z-20 hover:rotate-[-10deg] transition-transform origin-bottom-right">
        <div className="absolute bottom-[15%] right-0 w-[50%] h-[15%] bg-red-600 rounded-full rotate-[45deg] translate-x-[10%]"></div>
        <div className="absolute top-0 left-0 w-full h-[57%] bg-red-500 rounded-t-full border-t-[0.15rem] border-l-[0.15rem] border-red-600 origin-bottom-right rotate-[-15deg]"></div>
        <div className="absolute bottom-0 left-[15%] w-[83%] h-[43%] bg-red-500 rounded-b-full border-b-[0.15rem] border-l-[0.15rem] border-red-600 origin-top-right rotate-[15deg]"></div>
      </div>

      {/* Right Claw */}
      <div className="absolute top-[15%] -right-[18%] w-[37%] h-[43%] z-20 hover:rotate-[10deg] transition-transform origin-bottom-left">
        <div className="absolute bottom-[15%] left-0 w-[50%] h-[15%] bg-red-600 rounded-full rotate-[-45deg] -translate-x-[10%]"></div>
        <div className="absolute top-0 right-0 w-full h-[57%] bg-red-500 rounded-t-full border-t-[0.15rem] border-r-[0.15rem] border-red-600 origin-bottom-left rotate-[15deg]"></div>
        <div className="absolute bottom-0 right-[15%] w-[83%] h-[43%] bg-red-500 rounded-b-full border-b-[0.15rem] border-r-[0.15rem] border-red-600 origin-top-left rotate-[-15deg]"></div>
      </div>

      {/* Tail */}
      <div className="absolute -bottom-[12%] left-1/4 right-1/4 h-[25%] bg-red-600 rounded-b-3xl shadow-lg flex justify-center gap-[2%] pt-[10%] z-0 border-b-[0.15rem] border-red-700">
        <div className="w-1/3 h-[60%] bg-red-500 rounded-b-full"></div>
        <div className="w-1/3 h-[75%] bg-red-500 rounded-b-full translate-y-[15%]"></div>
        <div className="w-1/3 h-[60%] bg-red-500 rounded-b-full"></div>
      </div>

      {/* Main Body */}
      <div className="absolute inset-x-[6%] inset-y-0 bg-red-500 rounded-[45%_45%_40%_40%] shadow-2xl z-10 border-b-[0.3rem] border-red-600 overflow-hidden">
        {/* Belly highlight */}
        <div className="absolute -bottom-[6%] left-1/2 -translate-x-1/2 w-[66%] h-[50%] bg-red-400 rounded-[50%_50%_20%_20%] opacity-60 flex flex-col items-center pt-[6%] gap-[12%]">
           {/* Belly lines */}
           <div className="w-[75%] h-[2%] bg-red-500 rounded-full opacity-50"></div>
           <div className="w-full h-[2%] bg-red-500 rounded-full opacity-50"></div>
           <div className="w-[75%] h-[2%] bg-red-500 rounded-full opacity-50"></div>
        </div>

        {/* Eyes */}
        <div className="absolute top-[33%] left-[15%] w-[25%] h-[25%] bg-white rounded-full shadow-inner flex items-center justify-center">
          <div className="w-[43%] h-[43%] bg-brand-dark rounded-full translate-x-[15%] relative">
            <div className="w-[35%] h-[35%] bg-white rounded-full absolute top-[15%] left-[15%]"></div>
          </div>
        </div>
        <div className="absolute top-[33%] right-[15%] w-[25%] h-[25%] bg-white rounded-full shadow-inner flex items-center justify-center">
          <div className="w-[43%] h-[43%] bg-brand-dark rounded-full translate-x-[15%] relative">
            <div className="w-[35%] h-[35%] bg-white rounded-full absolute top-[15%] left-[15%]"></div>
          </div>
        </div>
        
        {/* Blush */}
        <div className="absolute top-[55%] left-[10%] w-[15%] h-[8%] bg-pink-400 rounded-full opacity-70 blur-[2px]"></div>
        <div className="absolute top-[55%] right-[10%] w-[15%] h-[8%] bg-pink-400 rounded-full opacity-70 blur-[2px]"></div>

        {/* Smile */}
        <div className="absolute top-[55%] left-[40%] w-[20%] h-[10%] border-b-[0.15rem] border-brand-dark rounded-b-full"></div>
      </div>
    </div>
  );
}
