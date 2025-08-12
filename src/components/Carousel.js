'use client';

import { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';

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
    <Box sx={{ position: 'relative', overflow: 'hidden', height: '400px' }}>
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.5s ease-out',
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, i) => (
          <Box
            key={i}
            sx={{
              minWidth: '100%',
              position: 'relative',
              height: '400px',
              backgroundImage: `url(${s.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: 'white',
              p: 4,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.4)',
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                {s.name}
              </Typography>
              <Typography variant="h6" component="p" sx={{ maxWidth: '600px', mb: 4 }}>
                {s.description}
              </Typography>
              <Box
                component="a"
                href={s.href}
                sx={{
                  px: 4,
                  py: 2,
                  bgcolor: 'orange.600',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '24px',
                  fontWeight: 'medium',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    bgcolor: 'orange.700',
                  },
                }}
              >
                Explore {s.name}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={previousSlide}
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <ChevronRightIcon />
      </IconButton>

      <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1 }}>
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setCurrent(i)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: i === current ? 'white' : 'grey.400',
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}