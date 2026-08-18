import React, { useRef, useState } from 'react';
import { 
  Award, 
  Sparkles, 
  Star, 
  Printer, 
  Download, 
  ShieldCheck, 
  X, 
  Maximize2, 
  Copy, 
  Info, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { QuizResult } from '../types';
import { drawCertificateToCanvas } from '../utils/certCanvas';

interface CertificateProps {
  result: QuizResult;
  onClose?: () => void;
  isModal?: boolean;
}

export const Certificate: React.FC<CertificateProps> = ({ result, onClose, isModal = false }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const accuracyPercent = Math.round((result.correctCount / result.totalCount) * 100);

  // User specification:
  // >= 90%: Xuất sắc
  // 80% - 90%: Giỏi
  // 50% - 80%: Hoàn thành tốt
  // <= 50%: Hoàn thành
  let rankTitle = 'HOÀN THÀNH';
  let rankSub = 'Đạt chuẩn hoàn thành chương trình ôn tập KHTN 6';
  let badgeColor = 'from-blue-600 via-blue-700 to-indigo-800';
  let starsCount = 3;

  if (accuracyPercent >= 90) {
    rankTitle = 'XUẤT SẮC';
    rankSub = 'Thành tích học tập đặc biệt xuất sắc môn Khoa Học Tự Nhiên 6';
    badgeColor = 'from-amber-500 via-yellow-500 to-orange-500 text-slate-950 font-black';
    starsCount = 5;
  } else if (accuracyPercent >= 80) {
    rankTitle = 'GIỎI';
    rankSub = 'Thành tích học tập giỏi môn Khoa Học Tự Nhiên 6';
    badgeColor = 'from-orange-500 via-amber-600 to-red-600';
    starsCount = 4;
  } else if (accuracyPercent >= 50) {
    rankTitle = 'HOÀN THÀNH TỐT';
    rankSub = 'Danh hiệu Hoàn thành tốt chương trình ôn tập KHTN 6';
    badgeColor = 'from-blue-600 via-indigo-600 to-blue-800';
    starsCount = 3;
  }

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const safeId = (result?.id ? result.id.slice(0, 6) : Math.random().toString(36).substring(2, 8)).toUpperCase();
  const certId = `KHTN6-${year}${month}-${safeId}`;

  const showNotification = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setExportMessage({ text, type });
    setTimeout(() => {
      setExportMessage(null);
    }, 5000);
  };

  // Generate high-resolution 1920x1080 canvas
  const getCanvas = (): HTMLCanvasElement => {
    return drawCertificateToCanvas({
      result,
      rankTitle,
      rankSub,
      starsCount,
      certId,
      day,
      month,
      year
    });
  };

  // 1. Download as High-Resolution PNG Image
  const handleDownloadImage = () => {
    try {
      setIsExporting(true);
      showNotification('Đang xử lý xuất ảnh Giấy Khen HD...', 'info');

      const canvas = getCanvas();
      const cleanStudentName = result.student.fullName.trim().replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_');
      const cleanClassName = result.student.className.trim().replace(/[^a-zA-Z0-9]/g, '');
      const fileName = `Giay_Khen_KHTN6_${cleanStudentName}_Lop${cleanClassName}.png`;

      // Always populate preview image URL so user can view/save directly if popup/download is restricted
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      setPreviewImageUrl(dataUrl);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          showNotification('Đã tải ảnh Giấy Khen về máy! 🌟', 'success');
          setIsExporting(false);
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 2000);

        showNotification('Đã tải ảnh Giấy Khen về máy thành công! 🌟', 'success');
        setIsExporting(false);
      }, 'image/png');
    } catch (err) {
      console.error('Download certificate error:', err);
      const canvas = getCanvas();
      setPreviewImageUrl(canvas.toDataURL('image/png'));
      showNotification('Đã mở ảnh Giấy Khen. Hãy nhấn giữ hoặc chuột phải để lưu!', 'info');
      setIsExporting(false);
    }
  };

  // 2. Copy Image to Clipboard
  const handleCopyImage = async () => {
    try {
      setIsExporting(true);
      const canvas = getCanvas();
      canvas.toBlob(async (blob) => {
        if (blob && navigator.clipboard && window.ClipboardItem) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            setCopied(true);
            showNotification('Đã sao chép ảnh Giấy Khen! Bạn có thể dán (Ctrl+V) vào Zalo, Word, Facebook.', 'success');
            setTimeout(() => setCopied(false), 3000);
          } catch {
            setPreviewImageUrl(canvas.toDataURL('image/png'));
            showNotification('Vui lòng nhấn giữ ảnh để sao chép!', 'info');
          }
        } else {
          setPreviewImageUrl(canvas.toDataURL('image/png'));
          showNotification('Trình duyệt chưa hỗ trợ sao chép tự động, hãy nhấn giữ hoặc bấm Tải Ảnh!', 'info');
        }
        setIsExporting(false);
      }, 'image/png');
    } catch (err) {
      console.warn('Copy error', err);
      setIsExporting(false);
    }
  };

  // 3. Reliable Print via IFrame
  const handlePrint = () => {
    try {
      setIsExporting(true);
      showNotification('Đang chuẩn bị trang in chuẩn 16:9...', 'info');

      const canvas = getCanvas();
      const imgData = canvas.toDataURL('image/png', 1.0);

      const printIframe = document.createElement('iframe');
      printIframe.style.position = 'fixed';
      printIframe.style.right = '0';
      printIframe.style.bottom = '0';
      printIframe.style.width = '0';
      printIframe.style.height = '0';
      printIframe.style.border = '0';
      document.body.appendChild(printIframe);

      const frameDoc = printIframe.contentWindow?.document;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Giấy Khen KHTN 6 - ${result.student.fullName}</title>
              <style>
                @page {
                  size: landscape;
                  margin: 0;
                }
                * {
                  box-sizing: border-box;
                  margin: 0;
                  padding: 0;
                }
                body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                  background-color: #ffffff;
                }
                .cert-img {
                  width: 100vw;
                  height: auto;
                  max-height: 99vh;
                  object-fit: contain;
                  display: block;
                }
                @media print {
                  body {
                    margin: 0;
                    padding: 0;
                  }
                  .cert-img {
                    width: 100%;
                    height: 100%;
                    max-height: 100%;
                    page-break-inside: avoid;
                  }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" class="cert-img" id="cert-img-node" alt="Giấy khen" />
            </body>
          </html>
        `);
        frameDoc.close();

        const triggerPrint = () => {
          setTimeout(() => {
            try {
              printIframe.contentWindow?.focus();
              printIframe.contentWindow?.print();
              showNotification('Đã mở hộp thoại in! 🖨️', 'success');
            } catch {
              window.print();
            } finally {
              setTimeout(() => {
                if (document.body.contains(printIframe)) {
                  document.body.removeChild(printIframe);
                }
              }, 10000);
            }
          }, 300);
        };

        const imgElement = frameDoc.getElementById('cert-img-node');
        if (imgElement) {
          imgElement.onload = triggerPrint;
          setTimeout(triggerPrint, 1000);
        } else {
          triggerPrint();
        }
      } else {
        window.print();
      }
    } catch {
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  // 4. Open Modal Preview
  const handleOpenPreviewModal = () => {
    const canvas = getCanvas();
    setPreviewImageUrl(canvas.toDataURL('image/png', 1.0));
  };

  return (
    <div className="space-y-4">
      
      {/* Action Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden bg-gradient-to-r from-blue-50 via-white to-orange-50 p-4 rounded-2xl border border-blue-100 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-orange-500 text-white flex items-center justify-center shadow-md">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              Giấy Chứng Nhận Danh Dự (Tỉ lệ chuẩn 16:9)
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800">
                Full HD 1920x1080
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Trao bởi Thầy Giáo Hà AI • Hỗ trợ Tải ảnh PNG, Sao chép & In ấn
            </p>
          </div>
        </div>

        {/* Print / Download Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Main Download Button */}
          <button
            id="btn-download-cert-png"
            type="button"
            disabled={isExporting}
            onClick={handleDownloadImage}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-black shadow-md hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Đang xuất...' : 'Tải Ảnh Giấy Khen (.PNG)'}</span>
          </button>

          {/* Copy Image Button */}
          <button
            id="btn-copy-cert"
            type="button"
            disabled={isExporting}
            onClick={handleCopyImage}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
            title="Sao chép ảnh vào clipboard để dán vào Zalo/Word"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-blue-600" />}
            <span className="hidden sm:inline">{copied ? 'Đã chép!' : 'Sao chép ảnh'}</span>
          </button>

          {/* Print Button */}
          <button
            id="btn-print-cert-action"
            type="button"
            disabled={isExporting}
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-md hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50"
          >
            <Printer className="w-4 h-4" />
            <span>In Giấy Khen</span>
          </button>

          {/* View Fullscreen Modal */}
          <button
            id="btn-preview-cert-modal"
            type="button"
            onClick={handleOpenPreviewModal}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            title="Xem cỡ lớn"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {exportMessage && (
        <div className={`p-3.5 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-between shadow-lg animate-fade-in print:hidden ${
          exportMessage.type === 'success' ? 'bg-emerald-600' : exportMessage.type === 'error' ? 'bg-rose-600' : 'bg-blue-600'
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{exportMessage.text}</span>
          </div>
          <button 
            type="button" 
            onClick={() => setExportMessage(null)}
            className="text-white/80 hover:text-white text-xs ml-3 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Quick Help Tip */}
      <div className="flex items-center justify-between gap-2 px-3.5 py-2 bg-amber-50/80 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 print:hidden">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Hướng dẫn:</strong> Bấm <strong>"Tải Ảnh Giấy Khen (.PNG)"</strong> để tải file ảnh HD, hoặc bấm <strong>"Sao chép ảnh"</strong> để dán trực tiếp vào Zalo/Facebook gửi cho phụ huynh và bạn bè!
          </span>
        </div>
      </div>

      {/* 16:9 Certificate Frame (Visual DOM Representation) */}
      <div 
        ref={certificateRef}
        id="certificate-paper"
        className="certificate-printable w-full aspect-[16/9] min-h-[380px] sm:min-h-[460px] md:min-h-[520px] bg-gradient-to-br from-amber-50/70 via-white to-blue-50/50 rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-7 border-4 border-amber-400/90 shadow-2xl relative flex flex-col justify-between overflow-hidden print:w-full print:h-screen print:border-none print:shadow-none print:m-0 print:p-6 select-none"
      >
        
        {/* Background Ornamental Guilloche & Watermark */}
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Double Inner Royal Border */}
        <div className="absolute inset-2 sm:inset-3 md:inset-4 border-2 border-amber-500/70 rounded-xl sm:rounded-2xl pointer-events-none flex flex-col justify-between p-1 sm:p-2">
          <div className="w-full h-full border border-blue-900/30 rounded-lg sm:rounded-xl pointer-events-none relative">
            {/* 4 Corner Ornaments */}
            <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-amber-600" />
            <div className="absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 border-amber-600" />
            <div className="absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 border-amber-600" />
            <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-amber-600" />
          </div>
        </div>

        {/* Top Header of Certificate */}
        <div className="relative z-10 text-center pt-2 sm:pt-3">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1">
            <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="text-[9px] sm:text-[11px] md:text-xs font-black tracking-widest text-blue-900 uppercase">
              BỘ GIÁO DỤC VÀ ĐÀO TẠO • SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
            </span>
            <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-amber-500" />
          </div>

          <div className="text-[8px] sm:text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            HỆ THỐNG GIA SƯ KHOA HỌC TỰ NHIÊN LỚP 6
          </div>

          <h2 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 uppercase drop-shadow-xs font-serif">
            GIẤY CHỨNG NHẬN DANH DỰ
          </h2>
          <p className="text-[9px] sm:text-[11px] text-amber-700 font-semibold tracking-widest uppercase italic mt-0.5">
            CERTIFICATE OF ACADEMIC ACHIEVEMENT
          </p>
        </div>

        {/* Body Content */}
        <div className="relative z-10 text-center px-4 my-auto space-y-1.5 sm:space-y-2.5">
          <p className="text-[10px] sm:text-xs md:text-sm text-slate-600 font-medium">
            Chứng nhận em:
          </p>

          <h3 className="text-lg sm:text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 tracking-wide uppercase font-serif py-0.5">
            {result.student.fullName}
          </h3>

          <p className="text-[10px] sm:text-xs md:text-sm text-slate-700 font-semibold">
            Học sinh lớp: <span className="text-blue-900 font-bold px-2 py-0.5 bg-blue-100/70 rounded-md border border-blue-200">{result.student.className}</span>
          </p>

          <p className="text-[9px] sm:text-xs md:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
            Đã hoàn thành bài kiểm tra & ôn tập Khoa Học Tự Nhiên 6 với kết quả: 
            <span className="font-extrabold text-blue-900 ml-1 text-sm sm:text-base">
              {result.score.toFixed(1)}/10 điểm
            </span> 
            <span className="text-slate-500 text-[10px] sm:text-xs ml-1">
              (Đúng {result.correctCount}/{result.totalCount} câu - {accuracyPercent}%)
            </span>
          </p>

          {/* Rank Badge */}
          <div className="inline-flex flex-col items-center pt-1">
            <div className={`px-4 sm:px-6 py-1 sm:py-1.5 rounded-full text-white font-black text-xs sm:text-base md:text-lg bg-gradient-to-r ${badgeColor} shadow-md uppercase tracking-wider flex items-center gap-1.5`}>
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>XẾP LOẠI: {rankTitle}</span>
              <Sparkles className="w-4 h-4 text-amber-200" />
            </div>
            <div className="flex items-center gap-1 mt-1 text-amber-500">
              {Array.from({ length: starsCount }).map((_, i) => (
                <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 fill-amber-400 text-amber-500" />
              ))}
            </div>
            <p className="text-[9px] sm:text-[11px] text-slate-500 italic mt-0.5">
              {rankSub}
            </p>
          </div>
        </div>

        {/* Footer: Date & Signatures & Official Stamp */}
        <div className="relative z-10 grid grid-cols-3 items-end px-3 sm:px-8 pb-2 sm:pb-3 text-slate-700">
          
          {/* Left: Certificate ID */}
          <div className="text-left space-y-1">
            <div className="flex items-center gap-1 text-[8px] sm:text-[10px] text-slate-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Số hiệu: {certId}</span>
            </div>
            <p className="text-[8px] sm:text-[10px] text-slate-500">
              Kiểm tra: {result.config.mode === 'exam' ? 'Đề thi chuẩn' : 'Luyện tập'}
            </p>
          </div>

          {/* Center: Luxury Golden Embossed Medal */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1 shadow-lg flex items-center justify-center border-2 border-amber-600/40">
              <div className="w-full h-full rounded-full border border-amber-600/60 bg-amber-50 flex flex-col items-center justify-center text-center p-1">
                <Award className="w-4 sm:w-6 h-4 sm:h-6 text-amber-700" />
                <span className="text-[6px] sm:text-[8px] font-black text-amber-900 leading-tight uppercase">
                  CHÍNH THỨC
                </span>
              </div>
              {/* Ribbons */}
              <div className="absolute -bottom-2 -left-1 w-3 sm:w-4 h-6 sm:h-8 bg-amber-600 rotate-12 rounded-b-xs shadow-xs -z-10" />
              <div className="absolute -bottom-2 -right-1 w-3 sm:w-4 h-6 sm:h-8 bg-amber-600 -rotate-12 rounded-b-xs shadow-xs -z-10" />
            </div>
          </div>

          {/* Right: Signature and Red Seal */}
          <div className="text-right space-y-0.5">
            <p className="text-[8px] sm:text-[10px] text-slate-500 italic">
              Ngày {day} tháng {month} năm {year}
            </p>
            <p className="text-[9px] sm:text-[11px] font-bold text-blue-950 uppercase">
              TRƯỞNG BAN BIÊN SOẠN
            </p>
            
            {/* Signature representation */}
            <div className="relative inline-block py-1 pr-2">
              <span className="font-serif italic font-extrabold text-blue-800 text-sm sm:text-lg select-none">
                Giáo Hà AI
              </span>
              
              {/* Red Stamp Seal */}
              <div className="absolute -top-1 -right-3 sm:-right-4 w-12 sm:w-16 h-12 sm:h-16 rounded-full border-2 border-rose-600 text-rose-600 bg-rose-50/40 rotate-[-12deg] flex flex-col items-center justify-center p-0.5 opacity-90 pointer-events-none shadow-xs">
                <div className="w-full h-full rounded-full border border-dashed border-rose-500 flex flex-col items-center justify-center text-[5px] sm:text-[7px] font-black leading-tight text-center">
                  <span>★ CHỨNG THỰC ★</span>
                  <span className="text-[7px] sm:text-[9px] text-rose-700">GIÁO HÀ AI</span>
                  <span>KHTN 6 CHUẨN</span>
                </div>
              </div>
            </div>

            <p className="text-[8px] sm:text-[10px] font-bold text-slate-800">
              Thầy Giáo Hà AI
            </p>
          </div>

        </div>

      </div>

      {/* High-Resolution Certificate Modal / Lightbox */}
      {previewImageUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 text-white rounded-3xl max-w-5xl w-full p-4 sm:p-6 border border-slate-700 shadow-2xl relative space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-black text-white">
                  Ảnh Giấy Khen Chuẩn 16:9 (1920x1080 Full HD)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImageUrl(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Preview Image */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-xl bg-amber-50 flex items-center justify-center">
              <img 
                src={previewImageUrl} 
                alt={`Giấy khen ${result.student.fullName}`} 
                className="w-full h-auto object-contain max-h-[65vh]"
              />
            </div>

            {/* Instruction banner for mobile/desktop direct save */}
            <div className="p-3 bg-amber-500/20 border border-amber-400/40 rounded-xl text-amber-200 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-amber-300" />
              <span>
                <strong>Mẹo lưu ảnh trực tiếp:</strong> Bạn có thể <strong>nhấn giữ vào ảnh</strong> (trên điện thoại) hoặc <strong>chuột phải vào ảnh</strong> (trên máy tính) rồi chọn <strong>"Lưu hình ảnh"</strong>!
              </span>
            </div>

            {/* Modal Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadImage}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Lại Ảnh (.PNG)</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyImage}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer border border-slate-700"
                >
                  <Copy className="w-4 h-4 text-blue-400" />
                  <span>Sao Chép Ảnh</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>In Trực Tiếp</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setPreviewImageUrl(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
