import { MdOutlineLightMode } from "react-icons/md";

const Header = ({
  toggleTheme,
  darkMode,
}: {
  toggleTheme: () => void;
  darkMode: boolean;
}) => {
  return (
    <div className=" bg-primary-2 backdrop-blur-sm border-b border-primary h-16 flex items-center justify-end px-4">
      <MdOutlineLightMode
        className="text-primary"
        onClick={toggleTheme}
        style={{ color: darkMode ? "white" : "black" }}
      />
    </div>
  );
};

export default Header;
