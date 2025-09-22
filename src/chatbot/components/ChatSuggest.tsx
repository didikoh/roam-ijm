import { useEffect, useState } from "react";

const suggestions = [
  "Where exactly is Larkinton located?",
  "What unit types are available?",
  "What’s nearby the RTS station?",
  "Tell me about the facilities.",
  "Is this good for investors?",
  "What’s the design concept?",
  "Who is this project for?",
  "What makes this a good buy?",
  "Give me a quick overview.",
];

function shuffleCopy<T>(arr: readonly T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const ChatSuggest = ({ setChatMessageRef }: any) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    // 只在挂载时洗牌一次
    setSelected(shuffleCopy(suggestions).slice(0, 4));
  }, []);

  const handleSetMessage = (m: string) => {
    if (setChatMessageRef.current) {
      setChatMessageRef.current(m);
    } else {
      console.warn("ChatMessage setter not ready yet.");
    }
  };

  return (
    <div className="chat-suggest-container">
      {selected.map((s, i) => (
        <button
          key={i}
          className="chat-suggest"
          onClick={() => {
            handleSetMessage(s);
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
};

export default ChatSuggest;
