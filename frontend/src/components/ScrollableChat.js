import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { getDisplayNameForUser } from "../config/ChatLogics";

const ScrollableChat = ({ messages }) => {
  const { user, appTheme } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={getDisplayNameForUser(m.chat || {}, m.sender._id, m.sender.name)} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender?.pic || undefined}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor:
                  m.sender._id === user._id
                    ? (appTheme === "dark" ? "#2563EB" : "#25D366")
                    : (appTheme === "dark" ? "#374151" : "#DCF8C6"),
                color: `${m.sender._id === user._id ? "white" : (appTheme === "dark" ? "#E5E7EB" : "#202C33")}`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
