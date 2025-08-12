import { Card as MuiCard, CardContent as MuiCardContent, CardMedia, Typography } from '@mui/material';

export default function Card({ children, className = '', ...props }) {
  return (
    <MuiCard className={className} {...props}>
      {children}
    </MuiCard>
  );
}

export function CardImage({ src, alt, ...props }) {
  return (
    <CardMedia
      component="img"
      image={src}
      alt={alt}
      {...props}
    />
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <MuiCardContent className={className} {...props}>
      {children}
    </MuiCardContent>
  );
}

export function CardTitle({ children, ...props }) {
  return (
    <Typography variant="h5" component="div" gutterBottom {...props}>
      {children}
    </Typography>
  );
}

export function CardDescription({ children, ...props }) {
  return (
    <Typography variant="body2" color="text.secondary" {...props}>
      {children}
    </Typography>
  );
}