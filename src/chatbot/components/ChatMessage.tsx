import AIIcon from "@assets/common/favicon.png";

const formatBoldText = (text: string, isMobile = false) => {
  const lines = text
    .split("\n")
    .map((line) =>
      line.trim().startsWith("* ") ? line.replace(/^\*\s/, "- ") : line
    );
  const normalizedText = lines.join("\n");

  // 正则：URL 或 电话号码的 pattern
  const linkPattern = /\[(https?:\/\/[^\]]+|\+\d{10,15})\]/g;

  const parts = normalizedText.split(linkPattern);
  const matches = [...normalizedText.matchAll(linkPattern)];

  const result: React.ReactNode[] = [];

  let matchIndex = 0;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (i % 2 === 1) {
      const matched = matches[matchIndex++]?.[1] ?? "";

      if (matched.startsWith("+60")) {
        const phoneNumber = matched.replace(/^\+/, "");
        result.push(
          <a
            key={`phone-${i}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                `https://wa.me/${phoneNumber}/?text=Hello,%20I%20am%20interested%20in%20IBTEC`,
                isMobile ? "_self" : "_blank"
              );
            }}
          >
            Contact Us
          </a>
        );
      } else {
        result.push(
          <a
            key={`link-${i}`}
            href={matched}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Here
          </a>
        );
      }
    } else {
      const subParts = part.split(/(\*\*.*?\*\*)/);
      subParts.forEach((sub, j) => {
        const boldMatch = sub.match(/^\*\*(.*?)\*\*$/);
        if (boldMatch) {
          result.push(<b key={`bold-${i}-${j}`}>{boldMatch[1]}</b>);
        } else {
          const lines = sub.split("\n");
          lines.forEach((line, k) => {
            if (k > 0) result.push(<br key={`br-${i}-${j}-${k}`} />);
            result.push(<span key={`text-${i}-${j}-${k}`}>{line}</span>);
          });
        }
      });
    }
  }

  return result;
};

const ChatMessage = ({ chat }: any) => {
  return (
    chat.parts[0].text && (
      <div
        className={`message ${chat.role === "model" ? 'bot-message' : 'user-message'} ${
          chat.isError ? 'error' : ""
        }`}
      >
        {chat.role === "model" && <img src={AIIcon} alt="AI Icon" />}
        <p className="message-text">
          {chat.parts[0].text
            ? formatBoldText(
                chat.parts[0].text,
                false
              )
            : "Something went wrong when show text"}
        </p>
      </div>
    )
  );
};

export default ChatMessage;
