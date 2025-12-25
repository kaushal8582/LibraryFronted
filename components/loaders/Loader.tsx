import LogoLoader from "./LogoLoader";

const Loader = () => {
  return (
    <div className="w-full h-screen grid place-content-center bg-gray-50">
      <LogoLoader size={80} text="Loading..." />
    </div>
  );
};

export default Loader;