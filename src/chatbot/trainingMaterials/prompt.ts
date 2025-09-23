export const promptConstruct = (
  secondCalled = true,
  shouldUseVector = false,
  chatIndividualProject = false,
  latestMessage?: string
) => {
  if (chatIndividualProject) {
    const prompt = `Please use the given information to answer the question with detail:
      
      Question:
      ${latestMessage}`;
    return prompt;
  }

  const prompt = secondCalled
    ? `Please use the given information to answer the question with detail:
      
      Question:
      ${latestMessage}`
    : shouldUseVector
    ? `
  The user asked about property projects. Based on the question, 
  please determine which project they are asking about, and call the function "focus_project" 
  with the exact project name from the context (not your own suggestion).

  Only use the names from the provided context. Do not guess or hallucinate names.

  Question:
  ${latestMessage}`
    : `
    Based on the question, please determine which project they are asking about, and call the function "focus_project" 
    with the exact project name from the context (not your own suggestion).
    Only use the names from the provided projects data. Do not guess or hallucinate names.

    Question:
    ${latestMessage}`;
  return prompt;
};
