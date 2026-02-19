type TypingIndicatorProps = {
  names: string[];
};

export const TypingIndicator = ({ names }: TypingIndicatorProps) => {
  if (names.length === 0) {
    return <div className="h-5" />;
  }

  const sentence = names.length === 1 ? `${names[0]} is typing...` : `${names.join(', ')} are typing...`;

  return <p className="h-5 px-4 text-xs text-[rgb(var(--text-secondary))]">{sentence}</p>;
};
