export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl shadow-md ${className}`}>{children}</div>;
}

