'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Hash, MessageSquare } from 'lucide-react';

import { cn } from '@vibeline/utils';

import { useChatStore } from '@/src/store/chat.store';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const EmptyRooms = () => (
  <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-soft">
      <MessageSquare className="h-5 w-5 text-content-muted" />
    </div>
    <p className="mt-3 text-sm font-medium text-content-primary">No rooms yet</p>
    <p className="mt-1 text-xs text-content-muted">Rooms will appear here</p>
  </div>
);

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const rooms = useChatStore((state) => state.rooms);
  const pathname = usePathname();

  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-border bg-surface-panel transition-transform duration-200 ease-out lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-12 shrink-0 items-center border-b border-border px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-content-muted">
            Channels
          </span>
        </div>

        <nav aria-label="Chat rooms" className="flex-1 overflow-y-auto py-2">
          {rooms.length === 0 ? (
            <EmptyRooms />
          ) : (
            <div className="space-y-0.5 px-2">
              {rooms.map((room) => {
                const href = `/${room.id}`;
                const active = pathname === href;

                return (
                  <Link
                    key={room.id}
                    href={href}
                    onClick={onClose}
                    className={cn(
                      'group flex items-start gap-2 rounded-lg px-2 py-1.5 transition-colors duration-150',
                      active
                        ? 'bg-accent/10 text-accent'
                        : 'text-content-secondary hover:bg-surface-hover hover:text-content-primary'
                    )}
                  >
                    <Hash
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0 transition-colors',
                        active ? 'text-accent' : 'text-content-muted group-hover:text-content-secondary'
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{room.name}</p>
                      {room.topic && (
                        <p className="truncate text-xs text-content-muted">{room.topic}</p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
      </aside>

      {open && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-20 bg-overlay/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={onClose}
          type="button"
        />
      )}
    </>
  );
};
