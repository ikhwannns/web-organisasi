import "tailwindcss-gradient";

const FooterArtikel = () => {
  return (
    <div className="text-white font-poppins w-full bg-black flex flex-col justify-center items-center px-20 h-32 space-y-1 tracking-widest bg-gradient-to-t from-black to-blue-600">
      <div className="flex flex-wrap">
        <p>
          &copy; 2024 Copyright <span className="font-bold">Artikel</span>.
        </p>
      </div>
      <div className="">
        <p>
          Designed By <span className="font-semibold">YourSelf</span>
        </p>
      </div>
    </div>
  );
};

export default FooterArtikel;
