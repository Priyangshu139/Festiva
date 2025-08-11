export default function Button({ children, onClick, variant = 'primary', className = '' }) {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-orange-500 text-orange-500 hover:bg-orange-50'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}