import { NavLink, useLocation } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";
import { useState, useEffect } from "react";
import * as GoIcons from "react-icons/go";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import sidebarConfig from "../../config/sidebar.json";
import LogoMinaraiColor from "@/assets/images/logotipo_color.svg";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  MdDashboard: MdIcons.MdDashboard,
  MdPayments: MdIcons.MdPayments,
  MdAdminPanelSettings: MdIcons.MdAdminPanelSettings,
  MdSettings: MdIcons.MdSettings,
  FaFolder: FaIcons.FaFolder,
  FaTrophy: FaIcons.FaTrophy,
  FaUserGraduate: FaIcons.FaUserGraduate,
  FaFileInvoiceDollar: FaIcons.FaFileInvoiceDollar,
  FaUsers: FaIcons.FaUsers,
  BsBank: BsIcons.BsBank,
};

const GoDotFill = GoIcons.GoDotFill;
const GoSidebarCollapse = GoIcons.GoSidebarCollapse;
const GoSidebarExpand = GoIcons.GoSidebarExpand;
const GoChevronDown = GoIcons.GoChevronDown;

export function Sidebar() {
  const { user, isSidebarCollapsed, toggleSidebar } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  // Effective state: expanded if NOT collapsed OR if collapsed AND hovered
  const isExpanded = !isSidebarCollapsed || (isSidebarCollapsed && isHovered);

  // State for collapsible sections
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>(() => {
    const initial: { [key: string]: boolean } = {};
    sidebarConfig.menu.forEach((item: any) => {
      if (item.type === 'collapsible' && item.id) {
        initial[item.id] = false;
      }
    });
    return initial;
  });

  // Automatically expand section if a child is active
  useEffect(() => {
    sidebarConfig.menu.forEach((item: any) => {
      if (item.type === 'collapsible' && item.id && item.items) {
        const hasActiveChild = item.items.some((subItem: any) => location.pathname.includes(subItem.to));
        if (hasActiveChild) {
          setExpanded(prev => ({ ...prev, [item.id]: true }));
        }
      }
    });
  }, [location.pathname]);

  const toggleSection = (section: string) => {
    if (!isExpanded) return; // Don't toggle if collapsed (though UI should prevent this)
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 rounded-md transition-colors duration-200 font-raleway text-sm whitespace-nowrap overflow-hidden ${
      isActive
        ? "bg-golden-rod-500 text-black-beauty-900 font-bold"
        : "text-gray-300 hover:bg-black-beauty-800 hover:text-white"
    }`;

  const subLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center ml-4 px-4 py-2 rounded-md text-sm transition-colors duration-200 group whitespace-nowrap overflow-hidden ${
      isActive
        ? "text-golden-rod-400 font-bold"
        : "text-gray-300 hover:text-white"
    }`;

  const headerClass = `px-4 text-lg font-bold text-gray-400 uppercase tracking-wider font-bebas overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap ${
    isExpanded 
      ? 'opacity-100 max-h-10 mt-6 mb-2' 
      : 'opacity-0 max-h-0 mt-0 mb-0'
  }`;

  // Helper for collapsible items
  const CollapsibleItem = ({ 
    title, 
    id, 
    children, 
    isActivePath,
    icon: Icon
  }: { 
    title: string; 
    id: string; 
    children: React.ReactNode; 
    isActivePath: boolean;
    icon: React.ElementType;
  }) => {
    const isOpen = expanded[id] && isExpanded;
    
    return (
      <div className="space-y-1 mt-2">
        <button
          onClick={() => isExpanded && toggleSection(id)}
          className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium font-raleway transition-colors duration-200 rounded-md
            ${isActivePath 
                ? "bg-golden-rod-500 text-black-beauty-900 font-bold" 
                : "text-gray-300 hover:text-white hover:bg-black-beauty-800"
            }`}
             title={!isExpanded ? title : undefined}
        >
          <div className="flex items-center">
            <Icon className="mr-3 text-lg min-w-[1.125rem]" />
            <span className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>{title}</span>
          </div>
          {isExpanded && (
            <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                 <GoChevronDown />
            </div>
          )}
        </button>
        
        <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
             <div className="space-y-1 mt-1">
                {children}
             </div>
        </div>
      </div>
    );
  };

  return (
    <aside 
        className={`fixed top-4 left-4 bottom-4 bg-black-beauty-900 rounded-xl shadow-2xl flex flex-col border border-black-beauty-800 scrollbar-hide z-40 transition-[width] duration-300 ease-in-out ${
            isExpanded ? 'w-64' : 'w-20'
        }`}
        onMouseEnter={() => isSidebarCollapsed && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 flex items-center justify-between">
        {/* <img src={LogoMinaraiColor} alt="Logo Minarai" className={`w-12 h-12 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}  /> */}
        <div className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 hidden'}`}>
             <img 
                src={LogoMinaraiColor} 
                alt="Minarai Dojo" 
                className="h-10 w-auto object-contain flex-shrink-0"
            />
            <h1 className="text-xl font-bold text-white font-bebas tracking-wide whitespace-nowrap">
                MINARAI DOJO
            </h1> 
        </div> 
        {isExpanded && (
          <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white focus:outline-none"
          >
              {isSidebarCollapsed ? <GoIcons.GoSidebarExpand size={20} /> : <GoIcons.GoSidebarCollapse size={20} />}
          </button>
        )}
         {!isExpanded && (
             <div className="w-full flex justify-center">
                 <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
                      <GoIcons.GoSidebarExpand size={24}/>
                 </button>
             </div>
         )}
      </div>

      <nav className="flex-1 px-2 space-y-1 overflow-y-auto scrollbar-minimalist pr-1">
        {sidebarConfig.menu.map((item: any, idx: number) => {
          // Check if item is explicitly disabled
          if (item.isEnabled === false) return null;

          // Check role restriction
          if (item.requiredRole === 'admin' && !isAdmin) return null;

          // Check if module is active
          if (item.module && !sidebarConfig.activeModules[item.module as keyof typeof sidebarConfig.activeModules]) {
            return null;
          }

          if (item.type === 'header') {
            return <div key={idx} className={headerClass}>{item.label}</div>;
          }

          const IconComponent = item.icon ? ICON_MAP[item.icon] : null;

          if (item.type === 'link' && item.to) {
            return (
              <NavLink 
                key={idx} 
                to={item.to} 
                end={item.end} 
                className={linkClass} 
                title={!isExpanded ? item.label : undefined}
              >
                {IconComponent && <IconComponent className="mr-3 text-lg min-w-[1.125rem]" />}
                <span className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                  {item.label}
                </span>
              </NavLink>
            );
          }

          if (item.type === 'collapsible' && item.id && item.items) {
            const isActivePath = item.items.some((subItem: any) => location.pathname.includes(subItem.to));
            return (
              <CollapsibleItem
                key={idx}
                title={item.label}
                id={item.id}
                isActivePath={isActivePath}
                icon={IconComponent || (() => null)}
              >
                {item.items.map((subItem: any, sIdx: number) => (
                  <NavLink 
                    key={sIdx} 
                    to={subItem.to} 
                    end={subItem.end} 
                    className={subLinkClass}
                  >
                    {({ isActive }) => (
                      <>
                        <GoDotFill className={`mr-2 text-xs ${isActive ? "text-golden-rod-400" : "text-gray-500 group-hover:text-white"}`} />
                        {subItem.label}
                      </>
                    )}
                  </NavLink>
                ))}
              </CollapsibleItem>
            );
          }

          return null;
        })}
      </nav>

      <div className="p-4 border-t border-black-beauty-800 mt-auto">
        <div className="flex items-center">
          <div className="flex-shrink-0">
             <div className="h-8 w-8 rounded-full bg-golden-rod-500 flex items-center justify-center text-black-beauty-900 font-bold transition-all duration-300">
                {user?.name?.charAt(0) || "U"}
             </div>
          </div>
          <div className={`ml-3 transition-opacity duration-300 overflow-hidden ${isExpanded ? 'opacity-100 max-w-[150px]' : 'opacity-0 w-0'}`}>
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs font-medium text-gray-400 truncate">{user?.role === 'admin' ? 'Administrador' : 'Alumno'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
