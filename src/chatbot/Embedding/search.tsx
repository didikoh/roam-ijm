// searchSimilarVectors.ts
import { GoogleGenAI } from "@google/genai";
import axios from "axios";

type VectorItem = {
  id: number;
  name: string;
  vector: number[];
};

export async function searchSimilarVectors(
  query: string,
  topK: number = 3,
  genAI: GoogleGenAI,
  location: string
): Promise<{ name: string; score: number }[]> {

  // 1. 获取 query embedding 向量
  const embeddingResponse = await genAI.models.embedContent({
    model: "gemini-embedding-exp-03-07",
    contents: query,
    config: { taskType: "RETRIEVAL_QUERY" },
  });

  if (
    embeddingResponse &&
    embeddingResponse.embeddings &&
    embeddingResponse.embeddings.length > 0
  ) {
    const queryVec = embeddingResponse.embeddings[0].values;

    // 2. 获取后端全部向量数据
    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/gemini/get_embed.php",
      { params: { location } }
    );
    const vectors: VectorItem[] =  res.data;

    console.log("Query Vector 转换成功");

    // 3. 计算余弦相似度
    const scored = vectors
      .map((item) => ({
        name: item.name,
        score: cosineSimilarity(
          queryVec || [],
          Array.isArray(item.vector) ? item.vector : JSON.parse(item.vector)
        ), // ✅ 变成真实数组),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return scored;
  } else {
    throw new Error(`❌ No embeddings created for user query`);
  }
}

// 工具函数：余弦相似度
function cosineSimilarity(a: number[], b: number[]): number {
  console.log;
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}
