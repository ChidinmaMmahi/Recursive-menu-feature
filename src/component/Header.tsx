import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

// const themeIcon = (theme, toggleLight) => {
//   return (
//     <div className="hover:bg-gray-500/20 cursor-pointer p-2 rounded-full"
//       onClick={toggleLight}>
//         <MdOutlineLightMode
//           className="text-primary text-xl "
//           style={{ color: theme }}
//         />
//       </div>
//   )
// }

const Header = ({
  toggleTheme,
  toggleLight,
  toggleDark,
  darkMode,
}: {
  toggleTheme: () => void;
  toggleLight: () => void;
  toggleDark: () => void;
  darkMode: boolean;
}) => {
  const theme = darkMode ? "white" : "black";

  return (
    <div className=" bg-header backdrop-blur-sm border-b border-primary h-16 flex items-center justify-end px-4 space-x-2">
      <div className="hover:bg-gray-500/20 cursor-pointer p-2 rounded-full"
      onClick={toggleLight}>
        <MdOutlineLightMode
          className="text-primary text-xl "
          style={{ color: theme }}
        />
      </div>
      <div className="w-10 h-6 p-1 rounded-full relative cursor-pointer hover:opacity-70" onClick={toggleTheme} 
      style={{ backgroundColor: theme }}>
        {darkMode ? <div className="bg-black size-4 rounded-full absolute right-1" /> : <div className="bg-white size-4 rounded-full absolute left-1" />}
      </div>
      <div className="hover:bg-gray-500/20 cursor-pointer p-2 rounded-full"
      onClick={toggleDark}>
        <MdOutlineDarkMode
          onClick={toggleDark}
          className="text-primary text-xl"
          style={{ color: theme }}
        />
      </div>
    </div>
  );
};

export default Header;
