import { ExternalLink } from 'lucide-react'
import { FC } from 'react'

interface GoogleMapInterface {
  address?: string
}

const GoogleMap: FC<GoogleMapInterface> = ({ address = "uttar pradesh" }) => {
  const query = address?.split(" ").join("+");

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    window.open(url, "_blank"); // new tab me open
  };

  return (
    <div className="mt-6 rounded-lg overflow-hidden">
      <div className="mt-6 rounded-lg overflow-hidden">

        <iframe
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          className="w-full h-[350px] md:h-[450px] lg:h-[550px]"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

      </div>

      <button
        onClick={handleDirections}
        className="w-full mt-8 cursor-pointer py-3 bg-white text-blue-600 font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        Get Directions
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
};

export default GoogleMap;
