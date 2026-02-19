'use client';

import { useState } from 'react';

import { SendHorizontal } from 'lucide-react';

import { Button, Input } from '@vibeline/ui';

type MessageInputProps = {
  onSend: (text: string) => void;
};

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const [text, setText] = useState('');

  const submit = () => {
    const value = text.trim();
    if (!value) return;

    onSend(value);
    setText('');
  };

  return (
    <div className="border-t border-slate-800 bg-[rgb(var(--surface-panel))] p-3">
      <div className="flex items-center gap-2">
        <Input
          aria-label="Message input"
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
          placeholder="Message room"
          value={text}
        />
        <Button aria-label="Send message" onClick={submit} type="button">
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
