import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, BookOpen, Lightbulb, MessageSquare } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { LESSON_SUMMARIES } from '../data/chaptersData';
import { QUESTIONS_DATA } from '../data/questionsData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface AITutorChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Chào em! Thầy là **Giáo Hà AI** - Trợ lý gia sư KHTN 6 (Bộ sách Kết nối tri thức). Em có bất kỳ thắc mắc nào về bài học, định nghĩa hay cách giải bài tập Khoa học tự nhiên 6, cứ hỏi thầy nhé! 🌟',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickQuestions = [
    'Tại sao virus không phải là một tế bào hoàn chỉnh?',
    'Phân biệt chất tinh khiết, dung dịch, huyền phù và nhũ tương?',
    'Định luật bảo toàn năng lượng phát biểu thế nào?',
    'Cách đọc đúng kết quả khi dùng cân đồng hồ và thước kẻ?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Formulate response from local KHTN 6 knowledge base
    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply = '';

      // 1. Check Glossary
      const matchedTerm = GLOSSARY_TERMS.find(g => lower.includes(g.term.toLowerCase()));
      
      // 2. Check lessons
      const matchedLesson = LESSON_SUMMARIES.find(l => 
        lower.includes(l.title.toLowerCase()) || 
        l.keyTerms.some(k => lower.includes(k.toLowerCase()))
      );

      if (lower.includes('virus') && lower.includes('tế bào')) {
        reply = `🦠 **Về câu hỏi Virus & Tế bào:**\n\nVirus **chưa có cấu tạo tế bào** vì chúng chỉ gồm 2 thành phần chính:\n1. Vỏ ngoài bằng protein.\n2. Lõi vật chất di truyền (DNA hoặc RNA).\n\nVirus không có màng tế bào, tế bào chất và các bào quan chuyển hóa năng lượng. Chúng là **kí sinh nội bào bắt buộc**, chỉ có thể nhân lên khi xâm nhập vào trong tế bào vật chủ sống! *(SGK KHTN 6 - Bài 29, Trang 98)*.`;
      } else if (lower.includes('bảo toàn năng lượng') || lower.includes('dạng năng lượng')) {
        reply = `⚡ **Định luật bảo toàn năng lượng (Bài 48, SGK trang 168):**\n\n*"Năng lượng không tự sinh ra hoặc tự mất đi mà chỉ chuyển hoá từ dạng này sang dạng khác hoặc truyền từ vật này sang vật khác."*\n\n📌 **Ví dụ:** Khi quả bóng rơi từ trên cao xuống đất, thế năng giảm dần và chuyển hoá thành động năng tăng dần!`;
      } else if (lower.includes('huyền phù') || lower.includes('nhũ tương') || lower.includes('dung dịch')) {
        reply = `🧪 **Phân biệt hỗn hợp (Bài 16, SGK trang 56 - 58):**\n\n1. **Dung dịch**: Hỗn hợp đồng nhất giữa dung môi và chất tan (ví dụ: nước muối trong suốt).\n2. **Huyền phù**: Hạt chất **rắn** lơ lửng trong chất lỏng (ví dụ: nước phù sa, nước bột sắn dây).\n3. **Nhũ tương**: Các giọt chất **lỏng** phân bố lơ lửng trong chất lỏng khác không tan (ví dụ: sữa tươi, dầu giấm khuấy đều).`;
      } else if (lower.includes('đo') || lower.includes('thước') || lower.includes('cân') || lower.includes('đcnn') || lower.includes('ghđ')) {
        reply = `📏 **Quy tắc đo lường chuẩn KHTN 6 (Bài 5 & 6):**\n\n1. **Ước lượng** đại lượng cần đo.\n2. **Chọn dụng cụ** có GHĐ (giới hạn đo) và ĐCNN (độ chia nhỏ nhất) thích hợp.\n3. **Hiệu chỉnh** dụng cụ (vặn ốc cân về số 0, đặt vạch 0 của thước ngang 1 đầu vật).\n4. **Đặt mắt** nhìn vuông góc với cạnh thước / vạch chỉ thị.\n5. **Đọc và ghi kết quả** theo vạch chia gần nhất (theo ĐCNN).`;
      } else if (matchedTerm) {
        reply = `📖 **Thuật ngữ: ${matchedTerm.term}**\n\n${matchedTerm.meaning}\n\n📍 *Tham khảo: SGK KHTN 6 (Trang ${matchedTerm.page})*`;
      } else if (matchedLesson) {
        reply = `📚 **Bài học: ${matchedLesson.title}**\n\nKiến thức trọng tâm:\n${matchedLesson.summaryPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\n📍 *Tham khảo: SGK KHTN 6 (Trang ${matchedLesson.pageSGK})*`;
      } else {
        reply = `Thầy Giáo Hà AI đã ghi nhận câu hỏi của em về *" ${query} "*. Để nắm chắc kiến thức này, em hãy mở phần **"Tóm tắt Lý thuyết"** hoặc **"Tra cứu Thuật ngữ"** trên thanh menu để ôn lại từng bài học chuẩn theo SGK Kết nối tri thức nhé! 🌟 Chúc em học tốt!`;
      }

      const aiMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl h-[85vh] max-h-[750px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-emerald-800 to-teal-800 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/30 border border-emerald-400/30 flex items-center justify-center text-emerald-200 shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  Hỏi Đáp Cùng Giáo Hà AI
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-xs text-emerald-200">
                Gia sư thông minh Khoa học tự nhiên lớp 6 • Sẵn sàng hỗ trợ 24/7
              </p>
            </div>
          </div>

          <button
            id="btn-close-ai-chat"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Question suggestions */}
        <div className="p-3 bg-emerald-50/50 border-b border-emerald-100 shrink-0">
          <span className="text-[11px] font-semibold text-emerald-900 flex items-center gap-1 mb-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Câu hỏi nhanh thường gặp:
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors whitespace-nowrap text-[11px] font-medium shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/40">
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                    GH
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isAI
                    ? 'bg-white border border-slate-200 text-slate-800 whitespace-pre-line'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium'
                }`}>
                  {msg.text}
                  <span className={`block text-[10px] mt-1.5 ${isAI ? 'text-slate-400' : 'text-emerald-100'} text-right`}>
                    {msg.timestamp}
                  </span>
                </div>

                {!isAI && (
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-white shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="input-ai-chat"
              type="text"
              placeholder="Nhập câu hỏi em muốn hỏi Giáo Hà AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs sm:text-sm"
            />
            <button
              id="btn-send-ai-chat"
              type="submit"
              disabled={!input.trim()}
              className={`p-2.5 rounded-xl text-white font-bold transition-all ${
                input.trim()
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-md cursor-pointer'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
