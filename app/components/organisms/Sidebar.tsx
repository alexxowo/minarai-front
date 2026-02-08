import { NavLink, useLocation } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";
import { useState, useEffect } from "react";
import { GoChevronRight, GoChevronDown, GoDotFill, GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { MdDashboard, MdPayments, MdAdminPanelSettings, MdSettings } from "react-icons/md";
import { FaFolder, FaTrophy, FaUserGraduate, FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import { BsBank } from "react-icons/bs";

export function Sidebar() {
  const { user, isSidebarCollapsed, toggleSidebar } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  // Effective state: expanded if NOT collapsed OR if collapsed AND hovered
  const isExpanded = !isSidebarCollapsed || (isSidebarCollapsed && isHovered);

  // State for collapsible sections
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    students: false,
    payments: false,
    invoices: false,
    treasury: false,
    operations: false,
  });

  // Automatically expand section if a child is active
  useEffect(() => {
    if (location.pathname.includes('/dashboard/students')) setExpanded(p => ({ ...p, students: true }));
    if (location.pathname.includes('/dashboard/payments')) setExpanded(p => ({ ...p, payments: true }));
    if (location.pathname.includes('/dashboard/invoices')) setExpanded(p => ({ ...p, invoices: true }));
    if (location.pathname.includes('/dashboard/treasury')) setExpanded(p => ({ ...p, treasury: true }));
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
        <h1 className={`text-2xl font-bold text-golden-rod-500 font-bebas tracking-wide transition-opacity duration-300 whitespace-nowrap overflow-hidden ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
          MINARAI DOJO
        </h1>
        {isExpanded && (
            <button
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-white focus:outline-none"
            >
                {isSidebarCollapsed ? <GoSidebarExpand size={20} /> : <GoSidebarCollapse size={20} />}
            </button>
        )}
         {!isExpanded && (
             <div className="w-full flex justify-center">
                 <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
                      <GoSidebarExpand size={24}/>
                 </button>
             </div>
         )}
      </div>

      <nav className="flex-1 px-2 space-y-1 overflow-y-auto scrollbar-minimalist pr-1">
        <div className={headerClass}>Auto Gestión</div>
        <NavLink to="/dashboard" end className={linkClass} title={!isExpanded ? "Panel de Control" : undefined}>
          <MdDashboard className="mr-3 text-lg min-w-[1.125rem]" />
          <span className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>Panel de Control</span>
        </NavLink>
        <NavLink to="/dashboard/documents" className={linkClass} title={!isExpanded ? "Mis Documentos" : undefined}>
          <FaFolder className="mr-3 text-lg min-w-[1.125rem]" />
          <span className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>Mis Documentos</span>
        </NavLink>
        <NavLink to="/dashboard/achievements" className={linkClass} title={!isExpanded ? "Mis Logros" : undefined}>
          <FaTrophy className="mr-3 text-lg min-w-[1.125rem]" />
          <span className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>Mis Logros</span>
        </NavLink>

        <CollapsibleItem 
            title="Pagos" 
            id="user-payments" 
            isActivePath={location.pathname.includes('/dashboard/my-payments')}
            icon={MdPayments}
        >
        <NavLink to="/dashboard/my-payments" end className={subLinkClass}>
            {({ isActive }) => (
            <>
                <GoDotFill className={`mr-2 text-xs ${isActive ? "text-golden-rod-400" : "text-gray-500 group-hover:text-white"}`} />
                Listado
            </>
            )}
        </NavLink>
        </CollapsibleItem>

        {isAdmin && (
          <>
            <div className={headerClass}>Gestión</div>
            
            <NavLink to="/dashboard/admin" end className={linkClass} title={!isExpanded ? "Panel Administrativo" : undefined}>
                <MdAdminPanelSettings className="mr-3 text-lg min-w-[1.125rem]" />
                <span className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>Panel Administrativo</span>
            </NavLink>

            <NavLink to="/dashboard/users" className={linkClass} title={!isExpanded ? "Usuarios" : undefined}>
              <FaUsers className="mr-3 text-lg min-w-[1.125rem]" />
              <span className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>Usuarios</span>
            </NavLink>
            
            <CollapsibleItem 
                title="Alumnos" 
                id="students" 
                isActivePath={location.pathname.includes('/dashboard/students')}
                icon={FaUserGraduate}
            >
              <NavLink to="/dashboard/students" className={subLinkClass}>
                {({ isActive }) => (
                  <>
                    <GoDotFill className={`mr-2 text-xs ${isActive ? "text-golden-rod-400" : "text-gray-500 group-hover:text-white"}`} />
                    Listado
                  </>
                )}
              </NavLink>
            </CollapsibleItem>

            <CollapsibleItem 
                title="Pagos" 
                id="payments" 
                isActivePath={location.pathname.includes('/dashboard/payments')}
                icon={MdPayments}
            >
              <NavLink to="/dashboard/payments" end className={subLinkClass}>
                {({ isActive }) => (
                  <>
                    <GoDotFill className={`mr-2 text-xs ${isActive ? "text-golden-rod-400" : "text-gray-500 group-hover:text-white"}`} />
                    Listado
                  </>
                )}
              </NavLink>
              <NavLink to="/dashboard/payments/pending" className={subLinkClass}>
                {({ isActive }) => (
                  <>
                    <GoDotFill className={`mr-2 text-xs ${isActive ? "text-golden-rod-400" : "text-gray-500 group-hover:text-white"}`} />
                    Pendientes
                  </>
                )}
              </NavLink>
            </CollapsibleItem>

            <CollapsibleItem 
                title="Recibos" 
                id="invoices" 
                isActivePath={location.pathname.includes('/dashboard/invoices')}
                icon={FaFileInvoiceDollar}
            >
              <NavLink to="/dashboard/invoices/create" className={subLinkClass}>
                {({ isActive }) => (
                  <>
                    <GoDotFill className={`mr-2 text-xs ${isActive ? "text-golden-rod-400" : "text-gray-500 group-hover:text-white"}`} />
                    Emitir Factura
                  </>
                )}
              </NavLink>
              <NavLink to="/dashboard/invoices" end className={subLinkClass}>
                {({ isActive }) => (
                  <>
                    <GoDotFill className={`mr-2 text-xs ${isActive ? "text-golden-rod-400" : "text-gray-500 group-hover:text-white"}`} />
                    Listado
                  </>
                )}
              </NavLink>
            </CollapsibleItem>

            <CollapsibleItem 
                title="Operaciones" 
                id="operations" 
                isActivePath={location.pathname.includes('/dashboard/management')}
                icon={FaTrophy}
            >
              <NavLink to="/dashboard/management/bulk-operations" className={subLinkClass}>
                {({ isActive }) => (
                  <>
                    <GoDotFill className={`mr-2 text-xs ${isActive ? "text-golden-rod-400" : "text-gray-500 group-hover:text-white"}`} />
                    Masivos
                  </>
                )}
              </NavLink>
            </CollapsibleItem>

            <div className={headerClass}>Ajustes</div>

            <NavLink 
              to="/dashboard/system" 
              className={linkClass}
              title={!isExpanded ? "Sistema" : undefined}
            >
              {({ isActive }) => (
                <>
                  <MdSettings className={`mr-3 text-lg transition-all duration-300 min-w-[1.125rem] ${isActive ? "text-black-beauty-900" : "text-gray-400 group-hover:text-white"}`} />
                  <span className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Sistema</span>
                </>
              )}
            </NavLink>

            <CollapsibleItem 
                title="Tesorería" 
                id="treasury" 
                isActivePath={location.pathname.includes('/dashboard/treasury')}
                icon={BsBank}
            >
              <NavLink to="/dashboard/treasury/payment-methods" className={subLinkClass}>
                {({ isActive }) => (
                  <>
                    <GoDotFill className={`mr-2 text-xs ${isActive ? "text-golden-rod-400" : "text-gray-500 group-hover:text-white"}`} />
                    Métodos de Pago
                  </>
                )}
              </NavLink>
              <NavLink to="/dashboard/treasury/accounts" className={subLinkClass}>
                {({ isActive }) => (
                  <>
                    <GoDotFill className={`mr-2 text-xs ${isActive ? "text-golden-rod-400" : "text-gray-500 group-hover:text-white"}`} />
                    Cuentas
                  </>
                )}
              </NavLink>
            </CollapsibleItem>
          </>
        )}


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
