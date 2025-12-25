import { LibTrackLogoIcon } from "../logo";

const ButtonLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <LibTrackLogoIcon size={20} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-transparent border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default ButtonLoader;
