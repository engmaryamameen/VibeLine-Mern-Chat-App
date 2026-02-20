'use client';

import { useState, useRef, useCallback } from 'react';
import { SendHorizontal, Paperclip, Smile } from 'lucide-react';

import { cn } from '@vibeline/utils';

type MessageInputProps = {
  onSend: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const MessageInput = ({
  onSend,
  placeholder = 'Write a message...',
  disabled = false
}: MessageInputProps) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(() => {
    const value = text.trim();
    if (!value || disabled) return;

    onSend(value);
    setText('');

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  }, [text, disabled, onSend]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);

    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  };

  const canSend = text.trim().length > 0 && !disabled;

  return (
    <div className="border-t border-border bg-surface-panel px-4 py-3">
      <div
        className={cn(
          'flex items-end gap-2 rounded-lg border bg-surface-elevated px-3 py-2 transition-colors duration-150',
          isFocused ? 'border-accent' : 'border-border hover:border-border-strong'
        )}
      >
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-content-muted transition-colors hover:bg-surface-hover hover:text-content-secondary"
          aria-label="Attach file"
        >
          <Paperclip className="h-4 w-4" />
        </button>

        <textarea
          ref={inputRef}
          aria-label="Message input"
          className="max-h-40 min-h-[32px] flex-1 resize-none bg-transparent text-sm text-content-primary placeholder:text-content-muted focus:outline-none"
          disabled={disabled}
          onBlur={() => setIsFocused(false)}
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          value={text}
        />

        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-content-muted transition-colors hover:bg-surface-hover hover:text-content-secondary"
          aria-label="Add emoji"
        >
          <Smile className="h-4 w-4" />
        </button>

        <button
          type="button"
          aria-label="Send message"
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-all duration-150',
            canSend
              ? 'bg-accent text-surface-bg hover:bg-accent-hover'
              : 'cursor-not-allowed text-content-muted'
          )}
          disabled={!canSend}
          onClick={handleSubmit}
        >
          <SendHorizontal className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-2 text-xs text-content-muted">
        Press <kbd className="rounded bg-surface-soft px-1 py-0.5 font-mono text-[10px]">Enter</kbd> to send, <kbd className="rounded bg-surface-soft px-1 py-0.5 font-mono text-[10px]">Shift + Enter</kbd> for new line
      </p>
    </div>
  );
};
