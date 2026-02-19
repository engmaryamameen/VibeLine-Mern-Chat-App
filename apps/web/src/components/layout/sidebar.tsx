'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@vibeline/utils';

import { useChatStore } from '@/src/store/chat.store';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const rooms = useChatStore((state) => state.rooms);
  const pathname = usePathname();

  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-72 transform border-r border-slate-800 bg-[rgb(var(--surface-panel))] px-3 py-4 transition lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <p className="px-2 text-xs font-medium uppercase tracking-[0.14em] text-[rgb(var(--text-secondary))]">Rooms</p>

        <nav aria-label="Chat rooms" className="mt-3 space-y-1">
          {rooms.map((room) => {
            const href = `/${room.id}`;
            const active = pathname === href;

            return (
              <Link
                key={room.id}
                className={cn(
                  'block rounded-xl px-3 py-2 transition',
                  active
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'text-[rgb(var(--text-secondary))] hover:bg-slate-800 hover:text-slate-100'
                )}
                href={href}
                onClick={onClose}
              >
                <p className="font-medium">#{room.name}</p>
                {room.topic && <p className="truncate text-xs opacity-80">{room.topic}</p>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {open && <button aria-label="Close sidebar" className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={onClose} type="button" />}
    </>
  );
};
