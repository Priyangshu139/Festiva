'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5-second interval

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, i) => (
          <div key={i} className="w-full flex-shrink-0 relative h-96">
            <Image
              src={s.image}
              alt={s.name}
              layout="fill"
              objectFit="cover"
              className="brightness-75"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
              <h2 className="text-4xl md:text-6xl font-bold">{s.name}</h2>
              <p className="mt-4 text-lg md:text-xl max-w-2xl">{s.description}</p>
              <a href={s.href} className="mt-8 px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-full text-lg font-semibold transition-colors">
                Explore {s.name}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-4">
        <button onClick={previousSlide} className="bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button onClick={nextSlide} className="bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75">
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              onClick={() => setCurrent(i)}
              key={"circle" + i}
              className={`rounded-full w-3 h-3 cursor-pointer ${
                i === current ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}