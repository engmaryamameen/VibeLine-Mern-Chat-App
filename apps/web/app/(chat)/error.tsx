'use client';

import { Button } from '@vibeline/ui';

const ChatError = ({ reset }: { reset: () => void }) => (
  <div className="grid h-full place-items-center p-6 text-center">
    <div className="max-w-sm space-y-4">
      <h2 className="text-xl font-semibold">Conversation failed to load</h2>
      <p className="text-sm text-[rgb(var(--text-secondary))]">Try reconnecting to the room.</p>
      <Button onClick={reset} type="button">
        Retry
      </Button>
    </div>
  </div>
);

export default ChatError;
