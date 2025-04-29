import banner from '/homeGardenBanner.jpg';

const HomeGardenBanner = () => {
  return (
    <div className="relative h-96 w-full overflow-hidden  shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-600 opacity-90"></div>
      <div className="absolute inset-0 flex items-center justify-between px-8">
        <div className="max-w-md text-white">
          <h1 className="text-4xl font-bold mb-4">Transform Your Living Spaces</h1>
          <p className="text-xl mb-6">Discover premium home essentials and garden must-haves to create your perfect oasis.</p>
          <button className="bg-white text-green-800 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition duration-300">
            Shop Now
          </button>
        </div>
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white bg-opacity-20 rounded-full"></div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white bg-opacity-30 rounded-full"></div>
            <img 
              src={banner} 
              alt="Home and garden items" 
              className="relative z-10 w-64 h-64 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGardenBanner;