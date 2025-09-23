export const sitePlan = {
  siteName: "Roam-IJM",
  buildings: [
    {
      id: "Block A",
      types: ["retail", "office"],
      floors: [
        { level: 1, use: "retail" },
        { level: 2, use: "retail" },
        { level: 3, use: "office" },
        { level: 4, use: "office", label:"3A" },
        { level: 5, use: "office" },
      ],
    },
    {
      id: "Block B",
      types: [],
      floors: [
        { level: 1, use: "general" },
        { level: 2, use: "general" },
        { level: 3, use: "general" },
      ],
    },
    {
      id: "Block C",
      types: ["retail", "office"],
      floors: [
        { level: 1, use: "retail" },
        { level: 2, use: "retail" },
        { level: 3, use: "office" },
        { level: 4, use: "office", label:"3A" },
        { level: 5, use: "office" },
      ],
    },
    {
      id: "Block D",
      types: ["drive-thru"],
      floors: [
        { level: 1, use: "drive-thru" },
        { level: 2, use: "general" },
        { level: 3, use: "general" },
      ],
    },
  ],
};
