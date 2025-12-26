import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import Avatar from "./Avatar";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full flex flex-col">
      <div className="w-full p-5 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="size-6 text-gray-600" />
          <span className="font-medium text-sm text-gray-600">Contacts</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-xs text-gray-500">Show online only</span>
          </label>
          <span className="text-xs text-gray-400">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 flex-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-gray-100 transition-colors
              ${selectedUser?._id === user._id ? "bg-gray-100" : ""}
            `}
          >
            <div className="mx-auto lg:mx-0">
              <Avatar
                fullName={user.fullName}
                profilePic={user.profilePic}
                size={48}
                showOnlineIndicator={true}
                isOnline={onlineUsers.includes(user._id)}
                />
            </div>

            {/* User info */}
            <div className="text-left min-w-0 flex-1">
              <div className="font-medium truncate text-sm text-gray-900">{user.fullName}</div>
              <div className="text-xs text-gray-500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
