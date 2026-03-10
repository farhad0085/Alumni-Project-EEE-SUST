export default function FullScreenLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex gap-2">
        <span className="w-3 h-3 rounded-full bg-[#003366] animate-[bounce-dot_1.4s_infinite_ease-in-out_both] [animation-delay:-0.32s]" />
        <span className="w-3 h-3 rounded-full bg-[#003366] animate-[bounce-dot_1.4s_infinite_ease-in-out_both] [animation-delay:-0.16s]" />
        <span className="w-3 h-3 rounded-full bg-[#003366] animate-[bounce-dot_1.4s_infinite_ease-in-out_both]" />
      </div>
    </div>
  );
}
