import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function DefaultLayout({ children }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const location = useLocation();

  const userMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-7-line"></i>,
      path: "/",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-line"></i>,
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-line"></i>,
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i className="ri-user-3-line"></i>,
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-line"></i>,
      onClick: (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/login",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      icon: <i className="ri-user-settings-line"></i>,
      path: "/",
    },
    {
      title: "Users",
      icon: <i className="ri-home-7-line"></i>,
      path: "/users",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-line"></i>,
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-line"></i>,
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i className="ri-user-3-line"></i>,
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-line"></i>,
      onClick: (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/login",
    },
  ];

  const menuToRender = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className={`layout ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar">
        <div className="menu">
          {menuToRender.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={index}
                className={`menu-item ${isActive ? "active-menu-item" : ""}`}
                onClick={(e) => {
                  if (item.onClick) {
                    item.onClick(e);
                  } else {
                    navigate(item.path);
                  }
                }}
              >
                {item.icon}
                {!collapsed && <h1 className="text-sm">{item.title}</h1>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="header flex justify-between items-center">
          <div className="text-white">
            {collapsed ? (
              <i className="ri-close-line" onClick={() => setCollapsed(!collapsed)}></i>
            ) : (
              <i className="ri-menu-2-line" onClick={() => setCollapsed(!collapsed)}></i>
            )}
          </div>
          <div>
            <h1 className="text-xl text-white">CASHMATE</h1>
          </div>
          <div>
            <h1 className="text-sm underline text-white">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
