import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from  "@google/generative-ai";

const apiKey ="AIzaSyBN9orIrOmavO1deHSLmEYoSXd_72-Xp_U";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {  
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  return response.text();
}
export default run;