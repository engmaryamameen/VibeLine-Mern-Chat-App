export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const getSenderPic = (loggedUser, users) => {
  const other = users[0]?._id === loggedUser?._id ? users[1] : users[0];
  return other?.pic || "";
};

// Nicknames helpers
export const getNickname = (chat, userId) => {
  const list = chat?.nicknames || [];
  const item = list.find((n) => (n.user?._id || n.user) === userId);
  return item?.name || "";
};

export const getDisplayNameForUser = (chat, userId, fallbackName) => {
  const nick = getNickname(chat, userId);
  return nick || fallbackName || "";
};

export const getOtherDisplayName = (loggedUser, chat) => {
  const other = getSenderFull(loggedUser, chat.users);
  return getDisplayNameForUser(chat, other?._id, other?.name);
};
