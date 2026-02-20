import Link from 'next/link';
import { MessageSquare, Hash, ArrowRight } from 'lucide-react';

export const EmptyChatState = () => (
  <div className="flex h-full flex-col items-center justify-center p-6">
    <div className="flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
        <MessageSquare className="h-8 w-8 text-accent" />
      </div>

      <h2 className="mt-6 text-xl font-semibold text-content-primary">
        Welcome to VibeLine
      </h2>

      <p className="mt-2 max-w-sm text-sm text-content-secondary">
        Select a channel from the sidebar to start chatting, or jump into the General channel to get started.
      </p>

      <Link
        href="/general"
        className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-surface-bg transition-colors hover:bg-accent-hover"
      >
        <Hash className="h-4 w-4" />
        <span>Open General</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  </div>
);
