import { LibTrackLogoIcon } from "../logo";

interface LogoLoaderProps {
  size?: number;
  className?: string;
  text?: string;
}

const LogoLoader = ({ size = 60, className = "", text }: LogoLoaderProps) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative">
        <LibTrackLogoIcon size={size} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="border-4 border-transparent border-t-blue-600 rounded-full animate-spin"
            style={{ width: size + 8, height: size + 8 }}
          ></div>
        </div>
      </div>
      {text && (
        <p className="text-sm font-medium text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LogoLoader;

