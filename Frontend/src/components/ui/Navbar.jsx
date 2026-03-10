import { CalendarDays, House, ListCheck, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="w-full text-white flex items-center justify-between left-1/2 -translate-x-1/2 px-10 fixed bottom-5">
      <NavLink to="/home">
        {({ isActive }) => (
          <House className={isActive && "text-green-500"} />
        )}
      </NavLink>

      <NavLink to="/alltask">
        {({ isActive }) => (
          <ListCheck className={isActive && "text-green-500"} />
        )}
      </NavLink>

      <NavLink to="/calendar">
        {({ isActive }) => (
          <CalendarDays className={isActive && "text-green-500"} />
        )}
      </NavLink>

      <NavLink to="/setting">
        {({ isActive }) => (
          <Settings className={isActive && "text-green-500"} />
        )}
      </NavLink>
    </div>
  );
};
