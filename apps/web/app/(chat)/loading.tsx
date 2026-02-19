import { Spinner } from '@vibeline/ui';

const ChatLoading = () => (
  <div className="grid h-full place-items-center">
    <div className="flex items-center gap-3 text-sm text-[rgb(var(--text-secondary))]">
      <Spinner />
      Loading conversation...
    </div>
  </div>
);

export default ChatLoading;
