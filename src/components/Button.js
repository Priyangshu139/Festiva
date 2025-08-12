import { Button as MuiButton } from '@mui/material';

export default function Button({ children, onClick, variant = 'contained', color = 'primary', className = '', ...props }) {
  return (
    <MuiButton
      onClick={onClick}
      variant={variant}
      color={color}
      className={className}
      {...props}
    >
      {children}
    </MuiButton>
  );
}