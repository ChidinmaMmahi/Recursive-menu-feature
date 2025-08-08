import { MdOutlineLightMode } from "react-icons/md";

const Header = () => {
  return (
    <div className=" bg-gray-900/90 backdrop-blur-sm border-b border-b-black h-16 flex items-center justify-end px-4">
      <MdOutlineLightMode className="text-white" />
    </div>
  );
};

export default Header;
