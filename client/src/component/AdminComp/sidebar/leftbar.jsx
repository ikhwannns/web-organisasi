import { FaHistory } from "react-icons/fa";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { FiBookOpen } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Work } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcAbout } from "react-icons/fc";
import { LogOut, reset } from "../../../features/authSlice.js";

const LeftBar = () => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  const Menus = [
    {
      title: "Dashboard",
      href: "dashboard",
      icon: <RiDashboardFill />,
    },
    {
      title: "Work Program",
      href: "workPorg",
      icon: <Work />,
    },
    {
      title: "Artikel",
      href: "writeArtikel",
      spacing: true,
      icon: <FiBookOpen />,
    },
    {
      title: "About",
      submenu: true,
      icon: <FcAbout />,
      onClick: () => setSubmenuOpen(!submenuOpen),
      submenuItems: [
        {
          icon: <CameraAltIcon />,
          title: "Documentation",
          href: "/documentation",
        },
        {
          icon: <AccountTreeIcon />,
          title: "Structure",
          href: "/structure",
        },
        {
          icon: <FaHistory />,
          title: "History",
          href: "/history",
        },
      ],
    },
  ];

  return (
    <div
      className={`bg-dark-purple h-full md:p-5 p-0.5 pt-8 ${
        open ? "md:w-72 w-44" : "md:w-20 w-11"
      } duration-300 relative`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${
          !open && "rotate-180"
        }`}
      >
        <BsArrowLeftShort />
      </button>
      <div className="inline-flex md:p-0 p-1">
        <BsFillPeopleFill
          className={`bg-amber-300 md:text-4xl text-2xl rounded cursor-pointer block float-left mr-3 duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium md:text-2xl text-xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          Admin IMMAJ
        </h1>
      </div>
      <ul className="pt-2 no-underline">
        {Menus.map((menu, index) => (
          <>
            <a href={menu.href}>
              <li
                key={index}
                className={`text-gray-300 text-sm no-underline flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                  menu.spacing ? "mt-9" : "mt-2"
                }`}
              >
                <span className="text-2xl">{menu.icon}</span>
                {menu.title === "About" ? (
                  <p
                    className={`text-base no-underline font-medium flex-1 duration-200 ${
                      !open && "hidden"
                    }`}
                    onClick={() => setSubmenuOpen(!submenuOpen)}
                  >
                    {menu.title}
                  </p>
                ) : (
                  <p
                    className={`text-base no-underline font-medium flex-1 duration-200 ${
                      !open && "hidden"
                    }`}
                  >
                    {menu.title}
                  </p>
                )}
                {menu.submenu && open && (
                  <BsChevronDown
                    className={`${
                      submenuOpen && "rotate-180"
                    } transition-all duration-300`}
                  />
                )}
              </li>

              {menu.submenu && submenuOpen && open && (
                <ul className="transition-all duration-300">
                  {menu.submenuItems.map((submenuItem, index) => (
                    <>
                      <a href={submenuItem.href}>
                        <li
                          key={index}
                          className="text-gray-300 no-underline text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md transition-all duration-300"
                        >
                          <span className="text-xl">{submenuItem.icon}</span>
                          <p>{submenuItem.title}</p>
                        </li>
                      </a>
                    </>
                  ))}
                </ul>
              )}
            </a>
          </>
        ))}
      </ul>
      <button
        onClick={logout}
        className={`mt-9 w-full text-gray-300 text-base flex items-center gap-x-4 cursor-pointer p-2 px-3 hover:bg-light-white rounded-md ${
          !open && "scale-0"
        }`}
      >
        <FiLogOut />
        Logout
      </button>
    </div>
  );
};

export default LeftBar;
