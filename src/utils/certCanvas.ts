import { QuizResult } from '../types';

interface DrawCertOptions {
  result: QuizResult;
  rankTitle: string;
  rankSub: string;
  starsCount: number;
  certId: string;
  day: string;
  month: string;
  year: number;
}

export function drawCertificateToCanvas(options: DrawCertOptions): HTMLCanvasElement {
  const { result, rankTitle, rankSub, starsCount, certId, day, month, year } = options;
  const accuracyPercent = Math.round((result.correctCount / result.totalCount) * 100);

  const width = 1920;
  const height = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Background Parchment
  const bgGradient = ctx.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, '#FFFDF7');
  bgGradient.addColorStop(0.5, '#FFFFFF');
  bgGradient.addColorStop(1, '#FFF9EB');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Background subtle decorative pattern
  ctx.save();
  ctx.strokeStyle = 'rgba(217, 119, 6, 0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i < width; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 200, height);
    ctx.stroke();
  }
  ctx.restore();

  // 2. Outer Luxury Borders
  // Outer thick Gold Border
  ctx.save();
  ctx.lineWidth = 16;
  const goldGradient = ctx.createLinearGradient(0, 0, width, height);
  goldGradient.addColorStop(0, '#B45309');
  goldGradient.addColorStop(0.25, '#F59E0B');
  goldGradient.addColorStop(0.5, '#FDE68A');
  goldGradient.addColorStop(0.75, '#F59E0B');
  goldGradient.addColorStop(1, '#92400E');
  ctx.strokeStyle = goldGradient;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Inner Thin Gold Border
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#D97706';
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // Navy Inner Frame
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(30, 58, 138, 0.4)';
  ctx.strokeRect(60, 60, width - 120, height - 120);

  // 4 Corner Ornaments
  const cornerSize = 70;
  const drawCorner = (x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = '#B45309';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(cornerSize, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, cornerSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(16, 16, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  drawCorner(60, 60, 0);
  drawCorner(width - 60, 60, Math.PI / 2);
  drawCorner(width - 60, height - 60, Math.PI);
  drawCorner(60, height - 60, -Math.PI / 2);
  ctx.restore();

  // 3. Top School Header
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = 'bold 22px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#1E3A8A'; // Deep Navy
  ctx.letterSpacing = '3px';
  ctx.fillText('BỘ GIÁO DỤC VÀ ĐÀO TẠO • SGK KẾT NỐI TRI THỨC VỚI CUỘC SỐNG', width / 2, 120);

  // Divider lines
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 400, 135);
  ctx.lineTo(width / 2 + 400, 135);
  ctx.stroke();

  ctx.font = 'bold 20px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText('HỆ THỐNG GIA SƯ KHOA HỌC TỰ NHIÊN LỚP 6', width / 2, 175);

  // 4. Main Certificate Title
  ctx.font = '900 64px "Times New Roman", Times, Georgia, serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText('GIẤY CHỨNG NHẬN DANH DỰ', width / 2, 255);

  ctx.font = 'italic bold 22px Georgia, serif';
  ctx.fillStyle = '#B45309';
  ctx.fillText('CERTIFICATE OF ACADEMIC ACHIEVEMENT', width / 2, 295);

  // 5. Student Body Information
  ctx.font = '22px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#4B5563';
  ctx.fillText('Chứng nhận em:', width / 2, 355);

  // Big Student Name
  ctx.font = 'bold 54px "Times New Roman", Georgia, serif';
  const nameGrad = ctx.createLinearGradient(width / 2 - 300, 0, width / 2 + 300, 0);
  nameGrad.addColorStop(0, '#B45309');
  nameGrad.addColorStop(0.5, '#EA580C');
  nameGrad.addColorStop(1, '#C2410C');
  ctx.fillStyle = nameGrad;
  ctx.fillText(result.student.fullName.toUpperCase(), width / 2, 425);

  // Class line
  ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#1E293B';
  ctx.fillText(`Học sinh lớp: ${result.student.className}`, width / 2, 475);

  // Achievement text
  ctx.font = '24px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#334155';
  ctx.fillText(
    `Đã hoàn thành bài kiểm tra & ôn tập Khoa Học Tự Nhiên 6 với kết quả:`,
    width / 2,
    530
  );

  ctx.font = 'bold 32px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#1D4ED8';
  ctx.fillText(
    `${result.score.toFixed(1)}/10 Điểm  (Đúng ${result.correctCount}/${result.totalCount} câu - ${accuracyPercent}%)`,
    width / 2,
    580
  );

  // 6. Rank Badge Pill
  const pillW = 460;
  const pillH = 64;
  const pillX = width / 2 - pillW / 2;
  const pillY = 630;

  // Badge gradient
  let bGrad1 = '#1E40AF';
  let bGrad2 = '#3B82F6';
  if (accuracyPercent >= 90) {
    bGrad1 = '#B45309';
    bGrad2 = '#F59E0B';
  } else if (accuracyPercent >= 80) {
    bGrad1 = '#C2410C';
    bGrad2 = '#F97316';
  } else if (accuracyPercent >= 50) {
    bGrad1 = '#1E40AF';
    bGrad2 = '#2563EB';
  }

  const badgeGrad = ctx.createLinearGradient(pillX, 0, pillX + pillW, 0);
  badgeGrad.addColorStop(0, bGrad1);
  badgeGrad.addColorStop(1, bGrad2);
  ctx.fillStyle = badgeGrad;

  // Round Rect for Pill
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 32);
  ctx.fill();

  ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`★ XẾP LOẠI: ${rankTitle} ★`, width / 2, pillY + 42);

  // Stars
  const starSize = 22;
  const starSpacing = 36;
  const startX = width / 2 - ((starsCount - 1) * starSpacing) / 2;
  ctx.fillStyle = '#F59E0B';
  ctx.font = `${starSize}px system-ui`;
  for (let i = 0; i < starsCount; i++) {
    ctx.fillText('★', startX + i * starSpacing, 735);
  }

  ctx.font = 'italic 20px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText(rankSub, width / 2, 775);

  // 7. Bottom Left: ID & Verification
  ctx.textAlign = 'left';
  ctx.font = 'bold 18px monospace';
  ctx.fillStyle = '#64748B';
  ctx.fillText(`🛡️ Số hiệu: ${certId}`, 130, 930);
  ctx.font = '18px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(`Chế độ: ${result.config.mode === 'exam' ? 'Đề thi chuẩn' : 'Luyện tập'}`, 130, 960);

  // 8. Bottom Center: Golden Medal
  ctx.save();
  const medalX = width / 2;
  const medalY = 910;
  const medalR = 56;

  // Ribbons
  ctx.fillStyle = '#B45309';
  ctx.beginPath();
  ctx.moveTo(medalX - 25, medalY + 20);
  ctx.lineTo(medalX - 35, medalY + 80);
  ctx.lineTo(medalX - 15, medalY + 70);
  ctx.lineTo(medalX - 5, medalY + 80);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(medalX + 25, medalY + 20);
  ctx.lineTo(medalX + 35, medalY + 80);
  ctx.lineTo(medalX + 15, medalY + 70);
  ctx.lineTo(medalX + 5, medalY + 80);
  ctx.fill();

  // Medal circle
  const medalGrad = ctx.createRadialGradient(medalX, medalY, 5, medalX, medalY, medalR);
  medalGrad.addColorStop(0, '#FEF08A');
  medalGrad.addColorStop(0.6, '#F59E0B');
  medalGrad.addColorStop(1, '#B45309');
  ctx.fillStyle = medalGrad;
  ctx.beginPath();
  ctx.arc(medalX, medalY, medalR, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#78350F';
  ctx.stroke();

  // Inner medal
  ctx.fillStyle = '#FFFBEB';
  ctx.beginPath();
  ctx.arc(medalX, medalY, medalR - 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#92400E';
  ctx.font = 'bold 24px system-ui';
  ctx.fillText('★ 6 ★', medalX, medalY + 2);
  ctx.font = 'bold 12px system-ui';
  ctx.fillText('CHÍNH THỨC', medalX, medalY + 20);
  ctx.restore();

  // 9. Bottom Right: Date, Signature & Red Stamp
  ctx.textAlign = 'right';
  ctx.font = 'italic 20px Georgia, serif';
  ctx.fillStyle = '#475569';
  ctx.fillText(`Ngày ${day} tháng ${month} năm ${year}`, width - 130, 875);

  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText('TRƯỞNG BAN BIÊN SOẠN', width - 130, 910);

  // Calligraphy signature
  ctx.font = 'italic bold 42px "Brush Script MT", "Times New Roman", cursive, serif';
  ctx.fillStyle = '#1E3A8A';
  ctx.fillText('Giáo Hà AI', width - 150, 970);

  ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#334155';
  ctx.fillText('Thầy Giáo Hà AI', width - 130, 1010);

  // Red Official Stamp
  ctx.save();
  const stampX = width - 190;
  const stampY = 945;
  ctx.translate(stampX, stampY);
  ctx.rotate(-0.2);

  ctx.strokeStyle = 'rgba(220, 38, 38, 0.85)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 52, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(220, 38, 38, 0.7)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(0, 0, 44, 0, Math.PI * 2);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(220, 38, 38, 0.9)';
  ctx.font = 'bold 12px system-ui';
  ctx.fillText('★ CHỨNG THỰC ★', 0, -22);
  ctx.font = 'bold 18px system-ui';
  ctx.fillText('GIÁO HÀ AI', 0, 2);
  ctx.font = 'bold 11px system-ui';
  ctx.fillText('KHTN 6 CHUẨN', 0, 24);
  ctx.restore();

  return canvas;
}
