import { Loader2 as Loader} from "lucide-react";

export default function Loader2({
  size = 48,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex justify-center items-center w-full h-full ${className}`}>
      <Loader className="animate-spin text-gray-600" size={size} />
    </div>
  );
}