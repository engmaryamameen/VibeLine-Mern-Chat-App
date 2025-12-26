import { useMemo, useState } from "react";

interface AvatarProps {
  fullName: string;
  profilePic?: string | null;
  size?: number;
  className?: string;
  showOnlineIndicator?: boolean;
  isOnline?: boolean;
}

const getColorFromName = (name: string): string => {
  const colors = [
    "bg-primary",
    "bg-secondary",
    "bg-accent",
    "bg-info",
    "bg-success",
    "bg-warning",
    "bg-error",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const Avatar = ({
  fullName,
  profilePic,
  size = 40,
  className = "",
  showOnlineIndicator = false,
  isOnline = false,
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const hasProfilePic = profilePic && !imageError;

  const firstLetter = useMemo(() => {
    if (!fullName) return "?";
    return fullName.trim().charAt(0).toUpperCase();
  }, [fullName]);

  const bgColor = useMemo(() => getColorFromName(fullName), [fullName]);

  return (
    <div className={`relative ${className}`}>
      {hasProfilePic ? (
        <div
          className="rounded-full overflow-hidden flex items-center justify-center shadow-sm"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <img
            src={profilePic || ""}
            alt={fullName}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div
          className={`${bgColor} rounded-full flex items-center justify-center text-white font-semibold shadow-sm`}
          style={{ width: `${size}px`, height: `${size}px`, fontSize: `${size * 0.4}px` }}
        >
          {firstLetter}
        </div>
      )}
      {showOnlineIndicator && isOnline && (
        <span
          className="absolute bottom-0 right-0 bg-green-500 rounded-full ring-2 ring-base-100"
          style={{ width: `${size * 0.25}px`, height: `${size * 0.25}px` }}
        />
      )}
    </div>
  );
};

export default Avatar;

