import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();

  const hasChildren = item.children && item.children.length > 0;

  const isSelfActive =
    item.path &&
    (location.pathname === item.path ||
      location.pathname === `${item.path}/` ||
      location.pathname.endsWith(`${item.path}`));

  const hasActiveDescendant = (
    children: MenuItemProps["item"][] | undefined
  ): boolean => {
    if (!children) return false;
    return children.some((child) => {
      if (child.path && location.pathname === child.path) {
        return true;
      }
      if (child.children) {
        return hasActiveDescendant(child.children);
      }
      return false;
    });
  };

  const childIsActive = hasActiveDescendant(item.children);

  const isHighlighted = Boolean(isSelfActive);

  useEffect(() => {
    if (item.label === "Projects" || childIsActive) {
      setIsOpen(true);
    }
  }, [item.label, childIsActive]);

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

  return (
    <div>
      <div
        onClick={handleClick}
        className={`cursor-pointer p-2 text-sidebar ${hasChildren ? "font-semibold text-sm" : "text-xs"
          } ${isHighlighted ? "text-red font-semibold" : ""}`}
      >
        <div className="flex items-center gap-2">
          {hasChildren && (isOpen ? "▼" : "▶")}
          <div>{item.label}</div>
        </div>
      </div>

      {isOpen && hasChildren && (
        <div className="pl-4">
          {item.children?.map((child, idx) => (
            <MenuItem key={idx} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
