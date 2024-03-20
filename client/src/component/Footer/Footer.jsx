import "tailwindcss-gradient";

const Footer = () => {
  return (
    <div className="text-white font-poppins w-full mt-20 bg-blue-600 flex flex-col justify-center items-center px-20 h-32 space-y-1 tracking-widest bg-gradient-to-t from-blue-600 to-black">
      <div className="flex flex-wrap">
        <p className="text-xs md:text-lg">
          &copy; 2024 Copyright <span className="font-bold">IMA-FEB-UH</span>.
        </p>
      </div>
      <div className="text-xs md:text-lg">
        <p>
          Designed By <span className="font-semibold">YourSelf</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
