import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_URL+"/chatbotv3/";

/** Structure of each chat message – extend to match your backend expectation */

export interface SaveChatPayload {
  chatId: string;
  sessionId: string;
  projectName: string;
  messages: any[];
  visitorId: string;
  tokens:number[];
}

/** Response shape from save_chat.php */
export interface SaveChatResponse {
  status: "inserted" | "updated";
  chatId: string;
}

export async function saveChat(payload: SaveChatPayload) {
  const response = await axios.post<SaveChatResponse>(
    API_ENDPOINT + "save_chat.php",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function saveChatCountDate() {
  const response = await axios.post<any>(API_ENDPOINT + "count_today.php", {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export async function getChat(chatId:string) {
  const response = await axios.post<any>(API_ENDPOINT + "get_chat.php", {chatId:chatId}, {
    headers: { "Content-Type": "application/json" },
  });
  const data = response.data;
  // console.log(data);
  if(data.success === false) return [];
  const parsedMessages = JSON.parse(data.data.messages);
  return parsedMessages;
}
