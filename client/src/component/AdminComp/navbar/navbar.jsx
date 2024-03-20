import { useLocation } from "react-router-dom";
import { MdPublic, MdSearch } from "react-icons/md";
import styles from "./navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="p-5 w-full bg-dark-purple flex items-center justify-center flex-wrap lg:justify-between space-y-5 lg:space-y-0">
      <div className={`${styles.title} text-white font-extrabold text-xl`}>
        {pathName.split("/").pop()}
      </div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch />
          <input type="text" placeholder="Search..." className={styles.input} />
        </div>
        <div className={styles.icons}>
          <a href="https://www.google.com/">
            <MdPublic size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
