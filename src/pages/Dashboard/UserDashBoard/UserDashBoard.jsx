import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';

const UserDashBoard = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64  shadow-xl p-4 rounded-2xl">
                <SidebarMenu />
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-amber-50">
                <Outlet />
            </main>
        </div>
    );
};

export default UserDashBoard;
