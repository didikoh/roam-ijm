import { GoogleGenAI } from "@google/genai";

export async function embedProjects(projects: any) {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

  
  let total = projects.length;
  let successCount = 0;
  let skipCount = 0;

  for (const [index, project] of projects.entries()) {
    console.log(index + ": " + project.name);
    try {
      if (index > 13) {
        const response = await ai.models.embedContent({
          model: "gemini-embedding-exp-03-07",
          contents: JSON.stringify(project),
          config: {
            taskType: "RETRIEVAL_DOCUMENT",
          },
        });

        if (response && response.embeddings && response.embeddings.length > 0) {
          console.log("Project: ", project.name, response);

          const res = await fetch(
            import.meta.env.VITE_API_URL + "/gemini/insert_embed.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: project.name,
                vector: response.embeddings[0].values,
              }),
            }
          );

          const data = await res.json();
          if (data.success) {
            successCount++;
            console.log("向量插入完成");
            // fetchVectors(); // 重新加载
          } else {
            throw new Error(`❌ 插入失败: ${project.name}`);
          }
        } else {
          throw new Error(`❌ No embeddings created for: ${project.name}`);
        }
      } else {
        skipCount++;
        console.log("跳过项目: ", index + project.name);
      }
    } catch (error) {
      console.error("Error embedding project:", error);
      break;
    }
  }
  console.log(`✅ 向量处理完成：总共 ${total} 个项目，成功 ${successCount} 个，跳过 ${skipCount} 个`);
  // console.log(response.embeddings);
  // return response.embeddings;
}
