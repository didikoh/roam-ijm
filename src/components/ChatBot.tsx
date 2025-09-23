import { RiResetLeftLine } from "react-icons/ri";
import "@css/ChatBot.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ai } from "@chatbot/trainingMaterials/ai";
import { sourceData } from "@chatbot/trainingMaterials/sources";
import { promptConstruct } from "@chatbot/trainingMaterials/prompt";
import { CgClose } from "react-icons/cg";
import ChatMessage from "@chatbot/components/ChatMessage";
import ChatSuggest from "@chatbot/components/ChatSuggest";
import ChatForm from "@chatbot/components/ChatForm";
import AIIcon from "@assets/chatbot/chat.webp";
import { useAppContext } from "@context/AppContext";

const ChatBot = () => {
  const { activatedMenu, setActivatedMenu } = useAppContext();
  const [chatHistory, setChatHistory] = useState<
    { hideInChat: boolean; role: string; parts: any[] }[]
  >([]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const [isDisabled, setIsDisabled] = useState(false);
  // const [lastContext, setLastContext] = useState<any[]>([]);
  const [tokenLimitReach, setTokenLimitReach] = useState(false);
  const chatMessageRef = useRef<(msg: string) => void>(null);
  const instruction = useRef("");

  const resetChat = () => {
    const inst = ai + `\n**Data:` + sourceData;
    instruction.current = inst;
    setChatHistory([]);
    setTokenLimitReach(false);
  };

  const updateHistory = (
    hideInChat = false,
    role: any,
    isError = false,
    parts: { functionCall?: any; text?: any; functionResponse?: any }[] = [],
    _tokens: number[] = [0, 0]
  ) => {
    setChatHistory((prev: any) => [
      ...prev.filter((msg: any) => msg.parts[0].text !== "Thinking..."),
      { hideInChat, role, isError, parts },
    ]);

    return;
  };

  useEffect(() => {
    if (location == null) return;
    if (hasInitialized.current) {
      // 已经初始化过了，不做任何事
      return;
    }
    hasInitialized.current = true;

    resetChat();

    setInterval(() => {
      hasInitialized.current = false;
    }, 500);
  }, [location]);

  const generateBotResponse = async (
    localHistory: any,
    secondCalled?: boolean
  ) => {
    //Helper function to uypdate chat history
    try {
      const history = localHistory.slice(-8);
      const latestMessage = history[history.length - 1].parts[0].text;

      let shouldUseVector = false;

      const messageContent = await promptConstruct(
        secondCalled,
        shouldUseVector,
        true,
        latestMessage
      );

      const requestBody = {
        instruction: instruction.current,
        message: messageContent,
        history: history,
        use_function_call: false,
        functionDeclarations: [],
      };

      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/chatbotv3/chat.php",
        requestBody
      );

      const result = res.data;
      const resultPart = result.candidates[0].content.parts[0];

      if (result.usageMetadata.promptTokenCount > 800000) {
        setTokenLimitReach(true);
      }

      updateHistory(
        false,
        "model",
        false,
        [{ text: resultPart.text }],
        [
          result.usageMetadata.promptTokenCount,
          result.usageMetadata.candidatesTokenCount,
        ]
      );
      setIsDisabled(false);
    } catch (error: any) {
      updateHistory(false, "model", true, [
        {
          text:
            error.message || "An error occurred while generating the response.",
        },
      ]);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    // ① 每次聊天更新后自动滚动到底部
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <>
      {activatedMenu === "ai" && (
        <div className="chatBot">
          <div className="chatbot-container">
            <>
              {/* Chatbot Header */}
              <div className="chat-header">
                <div className="header-info">
                  <img src={AIIcon} alt="AI Icon" />
                  <h2 className="logo-text">AI Agent (DEMO)</h2>
                </div>
                <div className="header-btns">
                  <button
                    onClick={() => {
                      resetChat();
                    }}
                    className="chatbot-btn reset"
                  >
                    <RiResetLeftLine />
                  </button>
                  <button
                    onClick={() => {
                      setActivatedMenu("");
                    }}
                    className="chatbot-btn"
                  >
                    <CgClose />
                  </button>
                </div>
              </div>

              {/* Chatbot Body */}
              <div className="chat-body" ref={chatBodyRef}>
                <div className="message bot-message">
                  <img src={AIIcon} alt="AI Icon" />
                  <p className="message-text">
                    Hey there 👋 <br /> How can I help you today?
                  </p>
                </div>
                {chatHistory.map((chat, index) => (
                  <ChatMessage key={index} chat={chat} />
                ))}
              </div>

              {/* Chatbot Footer */}
              <div className="chat-footer">
                <ChatSuggest setChatMessageRef={chatMessageRef} />
                <ChatForm
                  chatHistory={chatHistory}
                  updateHistory={updateHistory}
                  generateBotResponse={generateBotResponse}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                  tokenLimitReach={tokenLimitReach}
                  chatMessageRef={chatMessageRef}
                />
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
