import { useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";

const ChatForm = ({
  chatHistory,
  updateHistory,
  generateBotResponse,
  isDisabled,
  setIsDisabled,
  tokenLimitReach = false,
  chatMessageRef,
}: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 将函数注册到 ref
    chatMessageRef.current = setChatValue;
  }, [chatMessageRef]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tokenLimitReach) {
      alert(
        "Token limit reached, please reset chat to clear chat history before sending a new message."
      );
      return;
    }

    let userMessage = inputRef.current?.value.trim();
    if (!userMessage) return;
    inputRef.current!.value = "";

    // Update chat history with user's message
    updateHistory(false, "user", false, [{ text: userMessage }]);

    // Add a "Thinking..." placeholder for the bot's response
    setTimeout(() => {
      updateHistory(false, "model", false, [{ text: "Thinking..." }]);

      // Call the function to generate the bot's response
      generateBotResponse(
        [
          ...chatHistory,
          {
            hideInChat: false,
            role: "user",
            isError: false,
            parts: [{ text: `${userMessage}` }],
          },
        ],
        false
      );

      setIsDisabled(true);
    }, 200);
  };

  const setChatValue = (message: string) => {
    if (inputRef.current && message !== "") {
      inputRef.current.value = message;
    }
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        placeholder="Ask a question about Larkinton..."
        className="message-input"
        disabled={isDisabled}
        required
      />
      <button className="chat-form-send">
        <IoIosSend />
      </button>
    </form>
  );
};

export default ChatForm;
