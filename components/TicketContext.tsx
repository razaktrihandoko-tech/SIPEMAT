'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type TicketPriority = 'P1 - Darurat' | 'P2 - Sedang' | 'P3 - Rutin';
export type TicketStatus = 
  | 'Menunggu Verifikasi'
  | 'Disposisi OPD'
  | 'Pengerjaan Lapangan'
  | 'Selesai & BAP Ditandatangani'
  | 'Ditolak (Spam/Hoax)';

export interface Ticket {
  id: string;
  title: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  statusStep: 1 | 2 | 3 | 4;
  reporterName: string;
  reporterNik: string;
  location: string;
  coords: string;
  distance?: string;
  description: string;
  photoBefore: string;
  photoAfter?: string;
  upvotes: number;
  isUpvotedByMe?: boolean;
  reportedAt: string;
  verifiedAt?: string;
  timeAgo?: string;
  distanceToDepot?: string;
  assignedDept?: string;
  assignedTeam?: string;
  sptNumber?: string;
  slaLimit: string;
  slaRemaining: string;
  slaStatus: 'critical' | 'warning' | 'normal';
  instruction?: string;
  materialsUsed?: string;
  technicianNote?: string;
  bapNumber?: string;
  completedAt?: string;
  aiAuthenticity?: number;
  aiDuplicateRisk?: string;
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'status' | 'statusStep' | 'upvotes' | 'reportedAt' | 'slaRemaining' | 'slaStatus'>) => string;
  toggleUpvote: (ticketId: string) => void;
  verifyTicket: (ticketId: string) => void;
  rejectTicket: (ticketId: string, reason?: string) => void;
  dispatchTicket: (ticketId: string, dept: string, team: string, slaDuration: string, instruction: string, materials: string) => void;
  startFieldWork: (ticketId: string) => void;
  completeTicketWithBAP: (ticketId: string, photoAfter: string, materials: string, note: string) => string;
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'SPM-2026-0842',
    title: 'Lubang Menganga di Jl. Teuku Umar (Depan Pasar Koga)',
    category: 'Infrastruktur Jalan',
    priority: 'P1 - Darurat',
    status: 'Pengerjaan Lapangan',
    statusStep: 3,
    reporterName: 'Budi Darmawan, S.T.',
    reporterNik: '1871032508960002',
    location: 'Jl. Teuku Umar No. 88, Kedaton (Dekat Kampus UTI)',
    coords: '-5.397140, 105.266790',
    distance: '180 meter dari Anda',
    description: 'Aspal amblas sedalam sekitar 20 cm di lajur kiri dekat halte pasar. Sangat membahayakan pengendara motor saat malam hari dan jam pulang kerja.',
    photoBefore: '/placeholder-damage.jpg',
    upvotes: 156,
    isUpvotedByMe: false,
    reportedAt: '10 Nov 2026, 08:15 WIB',
    assignedDept: 'Dinas Bina Marga & Bina Konstruksi (PUPR)',
    assignedTeam: 'Regu PU Jalan-01 (Danru: Supriyadi)',
    sptNumber: 'SPT-PUPR-2026-0419',
    slaLimit: 'Batas: 11:30 WIB (SLA 3j)',
    slaRemaining: '00:42:10 (Kritis)',
    slaStatus: 'critical',
    instruction: 'Tutup lubang aspal dengan cold mix 4 sak, ratakan menggunakan baby roller, pasang kerucut pengaman.',
    materialsUsed: '4 Sak Aspal Cold Mix (100 kg), Pemadatan Baby Roller 45 menit',
    aiAuthenticity: 98.6,
    aiDuplicateRisk: 'Sangat Rendah (0% Kemiripan)',
  },
  {
    id: 'SPM-2026-0856',
    title: 'Aspal Amblas di Jalur Angkot Kedaton',
    category: 'Infrastruktur Jalan',
    priority: 'P1 - Darurat',
    status: 'Menunggu Verifikasi',
    statusStep: 1,
    reporterName: 'Budi Darmawan, S.T.',
    reporterNik: '1871032508960002',
    location: 'Jl. Teuku Umar No. 102, Depan Rumah Sakit Advent',
    coords: '-5.380120, 105.258140',
    distance: '650 meter dari Anda',
    description: 'Bahu jalan amblas akibat rembesan drainase bawah tanah, roda kendaraan sering terperosok.',
    photoBefore: '/placeholder-damage.jpg',
    upvotes: 42,
    isUpvotedByMe: false,
    reportedAt: '10 Nov 2026, 08:35 WIB',
    slaLimit: 'Batas: 13:00 WIB (SLA 4j)',
    slaRemaining: '01:58:30',
    slaStatus: 'warning',
    aiAuthenticity: 97.4,
    aiDuplicateRisk: 'Sangat Rendah (2% Kemiripan)',
  },
  {
    id: 'SPM-2026-0818',
    title: 'Penerangan Jalan Umum (PJU) Mati di Jalur Flyover MBK',
    category: 'Penerangan Jalan (PJU)',
    priority: 'P2 - Sedang',
    status: 'Disposisi OPD',
    statusStep: 2,
    reporterName: 'Rian Hidayat',
    reporterNik: '1871021403880001',
    location: 'Jl. ZA. Pagar Alam, Flyover Mall Boemi Kedaton',
    coords: '-5.378900, 105.259800',
    distance: '1.2 km dari Anda',
    description: '3 titik lampu merkuri padam total, memicu rawan kecelakaan di turunan flyover.',
    photoBefore: '/placeholder-pju.jpg',
    upvotes: 64,
    isUpvotedByMe: false,
    reportedAt: '10 Nov 2026, 07:10 WIB',
    assignedDept: 'Dinas Perhubungan (Dishub)',
    assignedTeam: 'Regu PJU-03 (Danru: Bambang Irawan)',
    sptNumber: 'SPT-DISHUB-2026-0182',
    slaLimit: 'Batas: 13:00 WIB (SLA 6j)',
    slaRemaining: '01:15:30',
    slaStatus: 'warning',
    instruction: 'Penggantian 3 unit ballast dan bohlam LED 150W menggunakan armada Skylift.',
    aiAuthenticity: 99.1,
    aiDuplicateRisk: 'Rendah (3% Kemiripan)',
  },
  {
    id: 'SPM-2026-0775',
    title: 'Penerangan PJU Padam 3 Titik di Jl. Ryacudu Sukarame',
    category: 'Penerangan Jalan (PJU)',
    priority: 'P2 - Sedang',
    status: 'Selesai & BAP Ditandatangani',
    statusStep: 4,
    reporterName: 'Siti Aminah',
    reporterNik: '1871045209930005',
    location: 'Jl. Ryacudu, Sukarame, Bandar Lampung',
    coords: '-5.372100, 105.291200',
    distance: '3.8 km dari Anda',
    description: 'PJU mati di dekat pintu tol Sukarame, sudah dilakukan penggantian trafo.',
    photoBefore: '/placeholder-pju.jpg',
    photoAfter: '/placeholder-pju-done.jpg',
    upvotes: 115,
    isUpvotedByMe: true,
    reportedAt: '08 Nov 2026, 19:40 WIB',
    assignedDept: 'Dinas Perhubungan (Dishub)',
    assignedTeam: 'Regu PJU-03',
    sptNumber: 'SPT-DISHUB-2026-0177',
    slaLimit: 'Batas: 08 Nov 22:00 WIB',
    slaRemaining: 'Selesai 100% On-Time',
    slaStatus: 'normal',
    bapNumber: 'BAP-DISHUB-0922',
    materialsUsed: '2 Trafo Elektronik, 3 Lampu Philips LED 120W',
    technicianNote: 'PJU normal kembali menyala terang.',
    completedAt: '08 Nov 2026, 21:50 WIB',
  },
];

const TicketContext = createContext<TicketContextType | null>(null);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sipemat_tickets_v1');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load tickets from cache', e);
      }
    }
    return INITIAL_TICKETS;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sipemat_tickets_v1', JSON.stringify(tickets));
      } catch (e) {
        console.error('Failed to save tickets', e);
      }
    }
  }, [tickets]);

  const addTicket = (ticketData: Omit<Ticket, 'id' | 'status' | 'statusStep' | 'upvotes' | 'reportedAt' | 'slaRemaining' | 'slaStatus'>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `SPM-2026-${randomNum}`;
    const now = new Date();
    const timeFormatted = `${now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const newTicket: Ticket = {
      ...ticketData,
      id: newId,
      status: 'Menunggu Verifikasi',
      statusStep: 1,
      upvotes: 1,
      isUpvotedByMe: true,
      reportedAt: timeFormatted,
      slaLimit: 'Batas: 3 Jam dari Lapor',
      slaRemaining: '02:59:50',
      slaStatus: ticketData.priority === 'P1 - Darurat' ? 'warning' : 'normal',
      aiAuthenticity: 98.9,
      aiDuplicateRisk: 'Sangat Rendah (0% Kemiripan)',
    };

    setTickets((prev) => [newTicket, ...prev]);
    return newId;
  };

  const toggleUpvote = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const isUp = !t.isUpvotedByMe;
          return {
            ...t,
            isUpvotedByMe: isUp,
            upvotes: isUp ? t.upvotes + 1 : Math.max(0, t.upvotes - 1),
          };
        }
        return t;
      })
    );
  };

  const verifyTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'Disposisi OPD',
            statusStep: 2,
          };
        }
        return t;
      })
    );
  };

  const rejectTicket = (ticketId: string, reason = 'Laporan terindikasi hoax/spam') => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'Ditolak (Spam/Hoax)',
            technicianNote: `Alasan penolakan: ${reason}`,
          };
        }
        return t;
      })
    );
  };

  const dispatchTicket = (
    ticketId: string,
    dept: string,
    team: string,
    slaDuration: string,
    instruction: string,
    materials: string
  ) => {
    const sptId = `SPT-${dept.includes('PUPR') ? 'PUPR' : dept.includes('Hubungan') ? 'DISHUB' : 'DLH'}-2026-${Math.floor(100 + Math.random() * 900)}`;

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'Pengerjaan Lapangan',
            statusStep: 3,
            assignedDept: dept,
            assignedTeam: team,
            sptNumber: sptId,
            slaLimit: slaDuration,
            instruction,
            materialsUsed: materials,
          };
        }
        return t;
      })
    );
  };

  const startFieldWork = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'Pengerjaan Lapangan',
            statusStep: 3,
          };
        }
        return t;
      })
    );
  };

  const completeTicketWithBAP = (
    ticketId: string,
    photoAfter: string,
    materials: string,
    note: string
  ): string => {
    const bapCode = `BAP-PUPR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const completedTime = `${now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'Selesai & BAP Ditandatangani',
            statusStep: 4,
            photoAfter,
            materialsUsed: materials,
            technicianNote: note,
            bapNumber: bapCode,
            completedAt: completedTime,
            slaRemaining: 'Selesai 100% On-Time',
            slaStatus: 'normal',
          };
        }
        return t;
      })
    );

    return bapCode;
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        toggleUpvote,
        verifyTicket,
        rejectTicket,
        dispatchTicket,
        startFieldWork,
        completeTicketWithBAP,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};

