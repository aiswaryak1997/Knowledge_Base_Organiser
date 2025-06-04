export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="border p-2 rounded-xl text-sm w-full" />;
}