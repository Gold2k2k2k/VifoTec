import { GoogleGenerativeAI } from '@google/generative-ai';

// Lấy các API key từ file .env (cách nhau bởi dấu phẩy)
const getApiKeys = () => {
  const envKeys = import.meta.env.VITE_GEMINI_API_KEYS || import.meta.env.VITE_GEMINI_API_KEY;
  if (!envKeys) return [];
  return envKeys.split(',').map((k: string) => k.trim());
};

// Hàm xuất khẩu được gọi từ App.tsx
export const getGeminiResponse = async (prompt: string, history: {role: string, text: string}[] = []): Promise<string> => {
  const API_KEYS = getApiKeys();
  
  if (API_KEYS.length === 0) {
    console.error("Thiếu VITE_GEMINI_API_KEYS trong môi trường.");
    return "⚠️ Lỗi hệ thống: Trợ lý AI chưa được cấp quyền truy cập (Missing API Key).";
  }

  // Lấy ngẫu nhiên 1 key trong danh sách để cân bằng tải
  const apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];

  try {
    // Khởi tạo động cơ Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Sử dụng model Gemini Flash Lite mới nhất theo yêu cầu
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.1-flash-lite", // Sử dụng chính xác model user yêu cầu
      systemInstruction: "Bạn là Trợ lý AI trên Trạm Không Gian JWST Space Explorer. Bạn là một AI thông minh, hỗ trợ phân tích dữ liệu thiên văn, không gian và các bản đồ sao từ NASA MAST. Hãy trả lời các câu hỏi về thiên văn học một cách ngắn gọn, sinh động, dễ hiểu bằng tiếng Việt. Phong cách giao tiếp: Chuyên nghiệp, viễn tưởng, súc tích (như AI trên tàu vũ trụ TARS hoặc J.A.R.V.I.S)."
    });

    const formattedHistory = history.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error("Lỗi giao tiếp với Gemini API (thử dùng fallback model...):", error);
    
    // Fallback nếu model mới chưa available
    try {
      const fallbackModel = new GoogleGenerativeAI(apiKey).getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "Bạn là Trợ lý AI trên Trạm Không Gian JWST Space Explorer. Bạn là một AI thông minh, hỗ trợ phân tích dữ liệu thiên văn, không gian. Hãy trả lời các câu hỏi về thiên văn học một cách ngắn gọn, sinh động, dễ hiểu bằng tiếng Việt."
      });
      const fallbackChat = fallbackModel.startChat({ history: history.map(msg => ({ role: msg.role === 'ai' ? 'model' : 'user', parts: [{ text: msg.text }] })) });
      const result = await fallbackChat.sendMessage(prompt);
      return result.response.text();
    } catch (fallbackError) {
      console.error("Lỗi fallback:", fallbackError);
      return "⚠️ [SYSTEM ERROR]: Liên kết với lõi máy chủ AI lượng tử bị ngắt do nhiễu loạn không gian. Vui lòng thử lại sau.";
    }
  }
};