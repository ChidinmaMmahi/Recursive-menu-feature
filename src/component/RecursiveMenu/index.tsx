import { useState } from "react";
import { useNavigate } from "react-router-dom";

type MenuItemProps = {
  item: {
    id?: string;
    label: string;
    children?: MenuItemProps["item"][];
    path?: string;
  };
};

const MenuItem = ({ item }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!item.children || item.children.length === 0) {
      if (item.path) {
        navigate(item.path);
      } else {
        navigate("/NotFoundPage");
      }
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  const hasChildren = item.children && item.children.length > 0;

  return (
    <aside className="">
      <div
        onClick={handleClick}
        className={`${
          hasChildren
            ? "font-semibold text-gray-500 text-sm"
            : "text-gray-400 text-xs"
        } cursor-pointer p-2 hover:text-[#666666]`}
      >
        <div className="flex items-center gap-2">
          {hasChildren && (isOpen ? "▼" : "▶")}
          <div>{item.label}</div>
        </div>
      </div>

      {isOpen && hasChildren && (
        <div className="ml-4">
          {item.children?.map((child, idx) => (
            <MenuItem key={idx} item={child} />
          ))}
        </div>
      )}
    </aside>
  );
};

export default MenuItem;
