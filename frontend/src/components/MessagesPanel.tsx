import Sidebar from "./Sidebar";

const MessagesPanel = () => {
  return (
    <div className="fixed left-[54px] top-0 w-[337px] h-screen bg-white z-[999]">
      {/* Messages Header */}
      <div className="absolute left-[19px] top-[27px]">
        <h2
          className="font-bold text-[23px] leading-4 text-black"
          style={{
            fontFamily:
              "SF Pro Text, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          Messages
        </h2>
      </div>

      {/* Contacts List - Scrollable */}
      <div className="pt-20 h-full overflow-hidden">
        <Sidebar />
      </div>
    </div>
  );
};

export default MessagesPanel;

