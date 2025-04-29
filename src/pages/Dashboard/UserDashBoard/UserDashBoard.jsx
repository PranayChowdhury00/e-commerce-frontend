import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import { FiMenu, FiX } from 'react-icons/fi';

const UserDashBoard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Header */}
            <header className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold">User Dashboard</h1>
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-600 focus:outline-none"
                >
                    {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </header>

            <div className="flex flex-col md:flex-row">
                {/* Sidebar - Hidden on mobile by default */}
                <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white shadow-xl p-4 rounded-none md:rounded-2xl`}>
                    <SidebarMenu onItemClick={() => setSidebarOpen(false)} />
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 bg-amber-50 min-h-[calc(100vh-64px)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserDashBoard;