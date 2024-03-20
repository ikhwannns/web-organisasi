import "tailwindcss-gradient";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DateFormatter from "../../lib/utils";
import SearchIcon from "@mui/icons-material/Search";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const about = [
  {
    name: "History",
    href: "/sejarah",
  },
  {
    name: "Structure",
    href: "/struktur",
  },
  {
    name: "Mars",
    href: "/mars",
  },
  {
    name: "Logos",
    href: "/logo",
  },
];

const products = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Work Program",
    href: "/proker",
  },
];

const Artikel = () => {
  const [artikels, setArtikels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getArtikel = async () => {
    const response = await axios.get("http://localhost:9900/artikel");
    setArtikels(response.data);
  };

  useEffect(() => {
    getArtikel();
  }, []);

  const searchFunction = (e) => {
    setSearchTerm(e.target.value);
  };

  const filtered = (artikel) => {
    return artikel.judul.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredArtikel = artikels.filter(filtered);

  return (
    <>
      <div>
        <div
          className="flex flex-row justify-between items-center p-6 w-full bg-gray-500 shadow-2xl font-poppins"
          style={{
            boxShadow: "0 0 10px 5px black",
            top: 0,
            right: 0,
            left: 0,
          }}
        >
          <a href="/" className="text-white">
            Logo
          </a>
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-lg p-2 rounded-lg hover:text-xl font-bold leading-6 transform hover:scale-110 transition duration-300 ease-in-out">
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-white"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-52 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}
                  <Disclosure as="div" className="gap-x-6">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...about].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <div className="relative">
            <input
              type="text"
              className="bg-gray-200 rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:bg-white"
              placeholder="Search..."
              onChange={searchFunction}
              value={searchTerm}
            />
            <div className="absolute top-0 left-0 flex items-center h-full pl-3">
              <button className="text-gray-500">
                <SearchIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="font-poppins bg-slate-100 mt-3">
        <div className="flex flex-col justify-center items-center md:p-0 p-3">
          <p className="text-black font-black shadow-2xl text-5xl mb-2 transform hover:scale-110 transition duration-300 ease-in-out">
            ARTIKEL
          </p>
          {filteredArtikel.map((artikel) => (
            <div
              className="flex flex-wrap md:justify-normal justify-center space-x-2 lg:space-y-0 rounded-3xl mt-5 p-3 shadow-2xl gap-3"
              key={artikel.id}
            >
              <Link
                to={`/word/${artikel.id}`}
                className="hover:scale-95 transition-all duration-300"
              >
                <img
                  src={artikel.url}
                  alt="thumbnail"
                  className="w-96 h-96 mx-auto rounded-3xl"
                />
              </Link>
              <div className="flex flex-col text-wrap w-72 md:justify-normal justify-center md:items-start items-center gap-y-3">
                <Link
                  to={`/word/${artikel.id}`}
                  className="font-extrabold text-base hover:scale-110 transition-all duration-300"
                >
                  {artikel.judul}
                </Link>
                <p className="italic text-gray-500 font-semibold">
                  <DateFormatter date={artikel.createdAt} />
                </p>
                <p className="font-extrabold text-lg">
                  {artikel.desc.slice(0, 20)}
                  <span className="tracking-widest">...</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Artikel;
