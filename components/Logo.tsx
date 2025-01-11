export default function TravexLogo() {
  return (
    <div className="flex items-center justify-center space-x select-none">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-800 to-black rounded-full opacity-70"></div>
        <div className="absolute inset-1 bg-gray-100 rounded-full"></div>
        <div className="absolute inset-2 border-2 border-black rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-ping"></div>
        </div>
      </div>

      <span className="text-2xl font-extrabold bg-gradient-to-r from-white to-white/25 text-transparent bg-clip-text tracking-wide">
        Travex
      </span>
    </div>
  );
}