import AppBar from "../../component/AppBar/AppBar";
import Footer from "../../component/Footer/Footer";
import Logo from "../../assets/logo.jpg";

const Logos = () => {
  return (
    <>
      <AppBar />
      <div className=" h-lvh mt-16 lg:mt-20 font-poppins">
        <div className="top-0 left-0 right-0 h-20 lg:h-24 bg-gray-300 flex items-center justify-between px-5 lg:px-24">
          <p className="text-3xl font-medium text-slate-700">Logos</p>
          <div className="flex flex-row space-x-4 -tracking-tight">
            <a href="/" className="text-blue-700">
              Beranda
            </a>
            <span>/</span>
            <span>Logos</span>
          </div>
        </div>
        <div className="flex justify-center items-center mt-20 flex-col">
          <img
            src={Logo}
            alt="logos"
            className="rounded-full p-8 lg:p-0 lg:px-0 md:min-w-96 md:h-96 mix-blend-color-burn hover:mix-blend-normal
            hover:scale-110 transition duration-300 ease-in-out"
          />
          <main className="max-w-6xl mx-auto p-2 text-justify mt-5">
            SALURAN SIMBOL IMMAS Sejak berdirinya IMMAJ pada 17 Desember 1982,
            lambang IMMAJ telah beberapa kali (4 kali) mengalami perubahan.
            Lambang yang sekarang ini sebenarnya bukanlah lambang baru, namun
            lebih ke metamorfosa dari lambung yang lama. Alasan mendasar agar
            ada sedikit perubahan dan pencarahan yang terjadi di IMMAJ, walaupun
            ada sedikit komentar dari pendahulu-pendahulu IMMAJ akan perubahan
            lambang tersebut dengan alasan bahwa perubahan lambang bukanlah yang
            diperlukan oleh keluarga melainkan sebuah perubahan dalam tatanan
            dan jalannya organisasi Tapi menurut kanda Acha 97, tidak ada
            langkah basar yang dimulai dengan langkah kecil. Berubahnya lambang
            adalah langkah kecil untuk sebuah perubahan di IMMAJ Peruluhannya
            lambang IMMAJ hanya berubah dari awalnya kotak menjadi lingkaran
            sempurna yang sebelumnya dibuat oleh kanda Sadat 93 Tujuan perubahan
            tersebut agar keluarga besar Manajemen tidak ada lagi
            pengkotak-kotakan baik angkatan, starata sosial, suku, dan semua
            yang bisa menghambat seseorang untuk membaur ke dalam keluarga besar
            IMMAJ yang pada waktu itu sangat kental terasa. Dengan berubah
            menjadi lingkaran sempurna dengan harapan bahwa tidak ada lagi
            pengkotak-kotakan dan seluruh mahasiswa manajemen FE-UH mempunyai
            hak dan kewajiban yang sama terhadap IMMAJ. Lambang terakhir yang
            dibuat oleh kanda Acha ini dicanakan sampai sekarang yang resmi
            digunakan pada kepengurusan periode 2000-2001.
          </main>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Logos;
