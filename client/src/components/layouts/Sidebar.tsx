import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.svg";
import {
  PanelLeftClose,
  UserCircle,
  LogOut,
  LayoutDashboard,
  ListChecks,
  BookOpen,
  Wind,
  PanelLeftOpen,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
function Sidebar() {
  const {logout} = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/habits", icon: ListChecks, label: "Habits" },
    { to: "/quotes", icon: BookOpen, label: "Quotes" },
    { to: "/meditation", icon: Wind, label: "Meditations" },
  ];
  function handleLogout(){
    logout();
    navigate('/login');
  }
  return (
    <aside
      className={`border-r border-brand-200 flex flex-col h-screen transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      {/* top section */}
      <div className="flex flex-col items center justify-between ">
        <div className="w-full flex items-center gap-3 border-b border-brand-200">
          <div className="flex items-center justify-center ">
            <img src={logo} alt="Logo" className="h-[72px] w-auto" />
          </div>
          <h1 className="text-2xl font-bold">
            {isExpanded ? "ManKoSathi" : ""}
          </h1>
        </div>
        <div className="p-1 flex justify-end items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-brand-700 hover:bg-brand-100 rounded-md"
          >
            {!isExpanded ? <PanelLeftOpen /> : <PanelLeftClose size={24} />}
          </button>
        </div>
      </div>
      {/* naviagtion options */}
      <nav className="flex-grow items-center justify-start p-2 mt-2">
        <ul className="space-y-4 text-base">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.label}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors text-brand-900 font-medium ${
                    isActive
                      ? "bg-brand-500 text-white shadow-sm"
                      : "hover:bg-brand-100"
                  }`
                }
              >
                <item.icon size={20} className="flex-shrink-0" />
                <span className={`transition-opacity duration-200 `}>
                  {isExpanded ? item.label : ""}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* logout/profile section */}
      <div className="p-2 border-t border-brand-100">
        <div className={`flex items-center gap-3 mb-4 ${isExpanded?'justify-start':'justify-center'}`}>
          <UserCircle size={36} className="text-brand-700" />
          <p className="text-brand-950 font-semibold">
            {isExpanded ? "Bimal" : ""}
          </p>
        </div>
        <button 
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 p-3 bg-brand-100 rounded-md text-brand-900 font-semibold hover:bg-red-100 hover:text-red-700">
          <LogOut size={16} />
          <span>{isExpanded ? "Logout" : ""}</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
