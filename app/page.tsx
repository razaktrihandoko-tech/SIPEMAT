'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DevNav, UserRole, ALL_VIEWS } from '@/components/DevNav';
import { ToastProvider } from '@/components/ToastContext';
import { TicketProvider } from '@/components/TicketContext';
import { WargaModule } from '@/components/modules/warga/WargaModule';
import { AdminModule } from '@/components/modules/admin/AdminModule';
import { LapanganModule } from '@/components/modules/lapangan/LapanganModule';

export default function HomePage() {
  const [currentRole, setCurrentRole] = useState<UserRole>('warga');
  const [currentView, setCurrentView] = useState<string>('v1');

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    const firstView = ALL_VIEWS.find((v) => v.role === role);
    if (firstView) {
      setCurrentView(firstView.id);
    }
  };

  const handleViewChange = (viewId: string) => {
    setCurrentView(viewId);
    const target = ALL_VIEWS.find((v) => v.id === viewId);
    if (target && target.role !== currentRole) {
      setCurrentRole(target.role);
    }
  };

  return (
    <ToastProvider>
      <TicketProvider>
        <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface antialiased">
        {/* GLOBAL HEADER: Strict Requirement: Displays both Logo Kota Balam & Logo UTI side-by-side */}
        <Header
          currentRole={currentRole}
          currentView={currentView}
          onSelectRole={handleRoleChange}
          onSelectView={handleViewChange}
        />

        {/* DEVELOPER NAVIGATION BAR: Tabs / Quick Jump Dropdown for all 15 Views */}
        <DevNav
          currentRole={currentRole}
          currentView={currentView}
          onSelectRole={handleRoleChange}
          onSelectView={handleViewChange}
        />

        {/* MAIN CONTENT WORKSPACE */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-5 pb-20">
          {currentRole === 'warga' && (
            <WargaModule
              currentView={currentView}
              onNavigate={handleViewChange}
            />
          )}

          {currentRole === 'admin' && (
            <AdminModule
              currentView={currentView}
              onNavigate={handleViewChange}
            />
          )}

          {currentRole === 'lapangan' && (
            <LapanganModule
              currentView={currentView}
              onNavigate={handleViewChange}
            />
          )}
        </main>

        {/* GLOBAL FOOTER: Strict Requirement: Fixed/sticky containing exact copyright text */}
        <Footer />
      </div>
    </TicketProvider>
  </ToastProvider>
  );
}

