import { GoogleGenerativeAI } from '@google/generative-ai';

// Hàm xuất khẩu được gọi từ App.tsx
export const getGeminiResponse = async (prompt: string, history: {role: string, text: string}[] = []): Promise<string> => {
  // Lấy API key từ file .env an toàn
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Thiếu VITE_GEMINI_API_KEY trong môi trường.");
    return "⚠️ Lỗi hệ thống: Trợ lý AI chưa được cấp quyền truy cập (Missing API Key).";
  }

  try {
    // Khởi tạo động cơ Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Sử dụng model Flash tối ưu tốc độ và độ chính xác
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "Bạn là Trợ lý AI của dự án JWST Space Explorer. Khách hàng đang khám phá bản đồ vũ trụ DeepZoom. Hãy trả lời các câu hỏi về thiên văn học một cách ngắn gọn, sinh động, dễ hiểu bằng tiếng Việt."
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
    console.error("Lỗi giao tiếp với Gemini API:", error);
    return "⚠️ Cảm biến AI đang nhiễu sóng. Không thể phản hồi lúc này.";
  }
};