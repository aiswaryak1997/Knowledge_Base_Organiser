export function Tabs({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function TabsList({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex gap-2 mb-2 ${className}`}>{children}</div>;
}

export function TabsTrigger({ children, onClick, value, disabled = false }: 
    { children: React.ReactNode; value: string; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-full text-sm font-medium border ${
        disabled ? 'bg-gray-200 text-gray-500' : 'bg-white text-emerald-600 border-emerald-600'
      }`}
    >
      {children}
    </button>
  );
}
