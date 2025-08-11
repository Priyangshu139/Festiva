export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
    />
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children }) {
  return (
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {children}
    </h3>
  );
}

export function CardDescription({ children }) {
  return (
    <p className="text-gray-600 text-sm mb-3">
      {children}
    </p>
  );
}