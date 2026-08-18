import { Chapter, LessonSummary } from '../types';

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    number: 1,
    title: 'Chương I: Mở đầu về Khoa học tự nhiên',
    topic: 'vat_li',
    iconName: 'Compass',
    lessons: [
      { id: 1, title: 'Bài 1. Giới thiệu về Khoa học tự nhiên', pageSGK: 7 },
      { id: 2, title: 'Bài 2. An toàn trong phòng thực hành', pageSGK: 11 },
      { id: 3, title: 'Bài 3. Sử dụng kính lúp', pageSGK: 13 },
      { id: 4, title: 'Bài 4. Sử dụng kính hiển vi quang học', pageSGK: 15 },
      { id: 5, title: 'Bài 5. Đo chiều dài', pageSGK: 17 },
      { id: 6, title: 'Bài 6. Đo khối lượng', pageSGK: 20 },
      { id: 7, title: 'Bài 7. Đo thời gian', pageSGK: 22 },
      { id: 8, title: 'Bài 8. Đo nhiệt độ', pageSGK: 24 },
    ],
  },
  {
    id: 2,
    number: 2,
    title: 'Chương II: Chất quanh ta',
    topic: 'hoa_hoc',
    iconName: 'Atom',
    lessons: [
      { id: 9, title: 'Bài 9. Sự đa dạng của chất', pageSGK: 28 },
      { id: 10, title: 'Bài 10. Các thể của chất và sự chuyển thể', pageSGK: 30 },
      { id: 11, title: 'Bài 11. Oxygen. Không khí', pageSGK: 36 },
    ],
  },
  {
    id: 3,
    number: 3,
    title: 'Chương III: Một số vật liệu, nguyên liệu, nhiên liệu, lương thực - thực phẩm thông dụng',
    topic: 'hoa_hoc',
    iconName: 'Layers',
    lessons: [
      { id: 12, title: 'Bài 12. Một số vật liệu', pageSGK: 42 },
      { id: 13, title: 'Bài 13. Một số nguyên liệu', pageSGK: 46 },
      { id: 14, title: 'Bài 14. Một số nhiên liệu', pageSGK: 50 },
      { id: 15, title: 'Bài 15. Một số lương thực, thực phẩm', pageSGK: 52 },
    ],
  },
  {
    id: 4,
    number: 4,
    title: 'Chương IV: Hỗn hợp. Tách chất ra khỏi hỗn hợp',
    topic: 'hoa_hoc',
    iconName: 'Filter',
    lessons: [
      { id: 16, title: 'Bài 16. Hỗn hợp các chất', pageSGK: 56 },
      { id: 17, title: 'Bài 17. Tách chất khỏi hỗn hợp', pageSGK: 60 },
    ],
  },
  {
    id: 5,
    number: 5,
    title: 'Chương V: Tế bào',
    topic: 'sinh_hoc',
    iconName: 'Dna',
    lessons: [
      { id: 18, title: 'Bài 18. Tế bào – Đơn vị cơ bản của sự sống', pageSGK: 64 },
      { id: 19, title: 'Bài 19. Cấu tạo và chức năng các thành phần của tế bào', pageSGK: 67 },
      { id: 20, title: 'Bài 20. Sự lớn lên và sinh sản của tế bào', pageSGK: 70 },
      { id: 21, title: 'Bài 21. Thực hành: Quan sát và phân biệt một số loại tế bào', pageSGK: 73 },
    ],
  },
  {
    id: 6,
    number: 6,
    title: 'Chương VI: Từ tế bào đến cơ thể',
    topic: 'sinh_hoc',
    iconName: 'Activity',
    lessons: [
      { id: 22, title: 'Bài 22. Cơ thể sinh vật', pageSGK: 75 },
      { id: 23, title: 'Bài 23. Tổ chức cơ thể đa bào', pageSGK: 79 },
      { id: 24, title: 'Bài 24. Thực hành: Quan sát và mô tả cơ thể đơn bào, cơ thể đa bào', pageSGK: 83 },
    ],
  },
  {
    id: 7,
    number: 7,
    title: 'Chương VII: Đa dạng thế giới sống',
    topic: 'sinh_hoc',
    iconName: 'TreePine',
    lessons: [
      { id: 25, title: 'Bài 25. Hệ thống phân loại sinh vật', pageSGK: 86 },
      { id: 26, title: 'Bài 26. Khoá lưỡng phân', pageSGK: 90 },
      { id: 27, title: 'Bài 27. Vi khuẩn', pageSGK: 92 },
      { id: 28, title: 'Bài 28. Thực hành: Làm sữa chua và quan sát vi khuẩn', pageSGK: 96 },
      { id: 29, title: 'Bài 29. Virus', pageSGK: 98 },
      { id: 30, title: 'Bài 30. Nguyên sinh vật', pageSGK: 102 },
      { id: 31, title: 'Bài 31. Thực hành: Quan sát nguyên sinh vật', pageSGK: 106 },
      { id: 32, title: 'Bài 32. Nấm', pageSGK: 108 },
      { id: 33, title: 'Bài 33. Thực hành: Quan sát các loại nấm', pageSGK: 112 },
      { id: 34, title: 'Bài 34. Thực vật', pageSGK: 115 },
      { id: 35, title: 'Bài 35. Thực hành: Quan sát và phân biệt một số nhóm thực vật', pageSGK: 123 },
      { id: 36, title: 'Bài 36. Động vật', pageSGK: 125 },
      { id: 37, title: 'Bài 37. Thực hành: Quan sát và nhận biết một số nhóm động vật ngoài thiên nhiên', pageSGK: 133 },
      { id: 38, title: 'Bài 38. Đa dạng sinh học', pageSGK: 135 },
      { id: 39, title: 'Bài 39. Tìm hiểu sinh vật ngoài thiên nhiên', pageSGK: 139 },
    ],
  },
  {
    id: 8,
    number: 8,
    title: 'Chương VIII: Lực trong đời sống',
    topic: 'vat_li',
    iconName: 'MoveRight',
    lessons: [
      { id: 40, title: 'Bài 40. Lực là gì?', pageSGK: 144 },
      { id: 41, title: 'Bài 41. Biểu diễn lực', pageSGK: 147 },
      { id: 42, title: 'Bài 42. Biến dạng của lò xo', pageSGK: 151 },
      { id: 43, title: 'Bài 43. Trọng lượng, lực hấp dẫn', pageSGK: 154 },
      { id: 44, title: 'Bài 44. Lực ma sát', pageSGK: 157 },
      { id: 45, title: 'Bài 45. Lực cản của nước', pageSGK: 160 },
    ],
  },
  {
    id: 9,
    number: 9,
    title: 'Chương IX: Năng lượng',
    topic: 'vat_li',
    iconName: 'Zap',
    lessons: [
      { id: 46, title: 'Bài 46. Năng lượng và sự truyền năng lượng', pageSGK: 162 },
      { id: 47, title: 'Bài 47. Một số dạng năng lượng', pageSGK: 165 },
      { id: 48, title: 'Bài 48. Sự chuyển hoá năng lượng', pageSGK: 168 },
      { id: 49, title: 'Bài 49. Năng lượng hao phí', pageSGK: 171 },
      { id: 50, title: 'Bài 50. Năng lượng tái tạo', pageSGK: 173 },
      { id: 51, title: 'Bài 51. Tiết kiệm năng lượng', pageSGK: 176 },
    ],
  },
  {
    id: 10,
    number: 10,
    title: 'Chương X: Trái Đất và Bầu trời',
    topic: 'thien_van',
    iconName: 'Globe',
    lessons: [
      { id: 52, title: 'Bài 52. Chuyển động nhìn thấy của Mặt Trời. Thiên thể', pageSGK: 179 },
      { id: 53, title: 'Bài 53. Mặt Trăng', pageSGK: 183 },
      { id: 54, title: 'Bài 54. Hệ Mặt Trời', pageSGK: 187 },
      { id: 55, title: 'Bài 55. Ngân Hà', pageSGK: 190 },
    ],
  },
];

export const LESSON_SUMMARIES: LessonSummary[] = [
  {
    id: 1,
    title: 'Bài 1. Giới thiệu về Khoa học tự nhiên',
    chapterId: 1,
    chapterTitle: 'Chương I: Mở đầu về Khoa học tự nhiên',
    topic: 'vat_li',
    pageSGK: 7,
    summaryPoints: [
      'Khoa học tự nhiên (KHTN) nghiên cứu các hiện tượng tự nhiên, tìm ra các tính chất và quy luật của chúng.',
      'Vật sống có khả năng trao đổi chất với môi trường, lớn lên và sinh sản. Vật không sống không có các khả năng này.',
      'Các lĩnh vực chính của KHTN: Sinh học (vật sống), Hoá học (các chất và sự biến đổi), Vật lí học (chuyển động, lực, năng lượng), Khoa học Trái Đất và Thiên văn học.',
      'KHTN cung cấp tri thức khoa học, ứng dụng vào công nghệ chế tạo phương tiện nâng cao đời sống con người.'
    ],
    keyTerms: ['Khoa học tự nhiên', 'Vật sống', 'Vật không sống', 'Sinh học', 'Hoá học', 'Vật lí học', 'Thiên văn học']
  },
  {
    id: 2,
    title: 'Bài 2. An toàn trong phòng thực hành',
    chapterId: 1,
    chapterTitle: 'Chương I: Mở đầu về Khoa học tự nhiên',
    topic: 'vat_li',
    pageSGK: 11,
    summaryPoints: [
      'Cần tuân thủ tuyệt đối nội quy phòng thực hành để tránh rủi ro tai nạn (nguồn điện, nguồn nhiệt, hoá chất, vật sắc nhọn, thuỷ tinh dễ vỡ).',
      'Nhận biết các kí hiệu cảnh báo: chất dễ cháy (ngọn lửa), chất độc (đầu lâu), nguồn điện nguy hiểm (tia sét), chất ăn mòn, nhiệt độ cao, vật sắc nhọn.',
      'Khi bị hoá chất dính vào người hoặc có sự cố, phải báo ngay cho giáo viên quản lí phòng thực hành.',
      'Sau khi thực hành: thu gom chất thải đúng nơi quy định, lau dọn bàn thí nghiệm, rửa sạch tay bằng xà phòng.'
    ],
    keyTerms: ['Biển báo cấm', 'Biển cảnh báo nguy hiểm', 'Chất độc', 'Chất dễ cháy', 'Quy tắc an toàn']
  },
  {
    id: 5,
    title: 'Bài 5. Đo chiều dài',
    chapterId: 1,
    chapterTitle: 'Chương I: Mở đầu về Khoa học tự nhiên',
    topic: 'vat_li',
    pageSGK: 17,
    summaryPoints: [
      'Đơn vị đo chiều dài hợp pháp của nước ta là mét (kí hiệu: m). Các đơn vị khác: mm, cm, dm, km (1 in = 2,54 cm; 1 dặm ≈ 1,609 km).',
      'Giới hạn đo (GHĐ) là độ dài lớn nhất ghi trên thước. Độ chia nhỏ nhất (ĐCNN) là độ dài giữa hai vạch chia liên tiếp.',
      '5 bước đo chiều dài: 1. Ước lượng chiều dài → 2. Chọn thước có GHĐ và ĐCNN phù hợp → 3. Đặt thước dọc theo chiều dài cần đo, vạch số 0 ngang 1 đầu vật → 4. Đặt mắt nhìn vuông góc với cạnh thước ở đầu kia → 5. Đọc và ghi kết quả theo ĐCNN.',
      'Đo thể tích vật rắn không thấm nước dùng bình chia độ hoặc bình tràn.'
    ],
    keyTerms: ['Mét (m)', 'Giới hạn đo (GHĐ)', 'Độ chia nhỏ nhất (ĐCNN)', 'Bình chia độ', 'Bình tràn']
  },
  {
    id: 6,
    title: 'Bài 6. Đo khối lượng',
    chapterId: 1,
    chapterTitle: 'Chương I: Mở đầu về Khoa học tự nhiên',
    topic: 'vat_li',
    pageSGK: 20,
    summaryPoints: [
      'Khối lượng là số đo lượng chất của vật. Đơn vị đo khối lượng hợp pháp là kilôgam (kí hiệu: kg). 1 tạ = 100 kg, 1 tấn = 1000 kg, 1 lạng (hg) = 100 g.',
      'Dụng cụ đo khối lượng: cân Rô-béc-van, cân đòn, cân đồng hồ, cân y tế, cân điện tử.',
      'Cách dùng cân đồng hồ: 1. Ước lượng khối lượng → 2. Vặn ốc điều chỉnh kim chỉ số 0 → 3. Đặt vật lên đĩa cân → 4. Mắt nhìn vuông góc với vạch chia ở đầu kim → 5. Đọc và ghi kết quả.',
      'Với cân điện tử có nút TARE giúp trừ bì (khối lượng hộp đựng).'
    ],
    keyTerms: ['Khối lượng', 'Kilôgam (kg)', 'Cân Roberval', 'Cân đồng hồ', 'TARE (trừ bì)']
  },
  {
    id: 8,
    title: 'Bài 8. Đo nhiệt độ',
    chapterId: 1,
    chapterTitle: 'Chương I: Mở đầu về Khoa học tự nhiên',
    topic: 'vat_li',
    pageSGK: 24,
    summaryPoints: [
      'Nhiệt độ là số đo độ "nóng", "lạnh" của vật. Thang nhiệt độ Xen-xi-út (°C): nước đá đang tan là 0 °C, hơi nước đang sôi là 100 °C.',
      'Thang Fahrenheit (°F): nước đá đang tan 32 °F, nước sôi 212 °F. Công thức đổi: t(°F) = t(°C) × 1,8 + 32.',
      'Nhiệt kế hoạt động dựa trên sự nở vì nhiệt của chất lỏng (thuỷ ngân, rượu, dầu).',
      'Các loại nhiệt kế: nhiệt kế phòng thí nghiệm, nhiệt kế y tế (34 °C – 42 °C), nhiệt kế rượu, nhiệt kế điện tử, nhiệt kế hồng ngoại.'
    ],
    keyTerms: ['Nhiệt độ', 'Thang Celsius (°C)', 'Thang Fahrenheit (°F)', 'Nở vì nhiệt', 'Nhiệt kế y tế']
  },
  {
    id: 10,
    title: 'Bài 10. Các thể của chất và sự chuyển thể',
    chapterId: 2,
    chapterTitle: 'Chương II: Chất quanh ta',
    topic: 'hoa_hoc',
    pageSGK: 30,
    summaryPoints: [
      'Chất tồn tại ở 3 thể cơ bản: Rắn (hình dạng cố định, rất khó nén), Lỏng (hình dạng của phần bình chứa, khó nén, chảy được), Khí (hình dạng của bình chứa, dễ nén, lan toả mọi hướng).',
      'Sự nóng chảy: rắn → lỏng (ở nhiệt độ nóng chảy). Sự đông đặc: lỏng → rắn (ở nhiệt độ đông đặc). Nước nóng chảy và đông đặc ở 0 °C.',
      'Sự hoá hơi (gồm bay hơi và sôi): lỏng → hơi. Bay hơi xảy ra ở mọi nhiệt độ trên mặt thoáng chất lỏng; Sôi xảy ra ở nhiệt độ sôi trong toàn khối chất lỏng.',
      'Sự ngưng tụ: hơi/khí → lỏng (xảy ra ở mọi nhiệt độ khi gặp lạnh).'
    ],
    keyTerms: ['Thể rắn', 'Thể lỏng', 'Thể khí', 'Nóng chảy', 'Đông đặc', 'Bay hơi', 'Sôi', 'Ngưng tụ']
  },
  {
    id: 11,
    title: 'Bài 11. Oxygen. Không khí',
    chapterId: 2,
    chapterTitle: 'Chương II: Chất quanh ta',
    topic: 'hoa_hoc',
    pageSGK: 36,
    summaryPoints: [
      'Oxygen là chất khí không màu, không mùi, không vị, ít tan trong nước, nặng hơn không khí; duy trì sự sống (hô hấp) và sự cháy.',
      'Thành phần không khí (về thể tích): ~78% Nitrogen, ~21% Oxygen, ~1% Carbon dioxide, hơi nước và các khí khác.',
      'Vai trò không khí: điều hoà khí hậu, bảo vệ Trái Đất khỏi thiên thạch, cung cấp CO2 cho quang hợp và O2 cho hô hấp.',
      'Ô nhiễm không khí do khí thải nhà máy, phương tiện giao thông, đốt rác thải; biện pháp: trồng cây xanh, dùng năng lượng sạch, đi xe buýt điện.'
    ],
    keyTerms: ['Oxygen', 'Nitrogen', 'Hiệu ứng nhà kính', 'Mưa acid', 'Quang hợp']
  },
  {
    id: 16,
    title: 'Bài 16. Hỗn hợp các chất',
    chapterId: 4,
    chapterTitle: 'Chương IV: Hỗn hợp. Tách chất ra khỏi hỗn hợp',
    topic: 'hoa_hoc',
    pageSGK: 56,
    summaryPoints: [
      'Chất tinh khiết chỉ chứa một chất duy nhất và có những tính chất xác định (nước cất, bạc nguyên chất).',
      'Hỗn hợp chứa từ hai chất trở lên; gồm hỗn hợp đồng nhất (dung dịch) và không đồng nhất (huyền phù, nhũ tương).',
      'Dung dịch là hỗn hợp đồng nhất của dung môi và chất tan (nước đường, nước muối).',
      'Huyền phù là các hạt chất rắn lơ lửng trong chất lỏng (nước phù sa, nước bột sắn dây). Nhũ tương là các giọt chất lỏng lơ lửng trong chất lỏng khác không tan (sữa, dầu giấm khuấy đều).'
    ],
    keyTerms: ['Chất tinh khiết', 'Dung dịch', 'Dung môi', 'Chất tan', 'Huyền phù', 'Nhũ tương']
  },
  {
    id: 17,
    title: 'Bài 17. Tách chất khỏi hỗn hợp',
    chapterId: 4,
    chapterTitle: 'Chương IV: Hỗn hợp. Tách chất ra khỏi hỗn hợp',
    topic: 'hoa_hoc',
    pageSGK: 60,
    summaryPoints: [
      'Phương pháp lọc: dùng phễu lót giấy lọc để tách chất rắn không tan ra khỏi chất lỏng (lọc cát khỏi nước).',
      'Phương pháp cô cạn: đun nóng cho dung môi bay hơi hết để thu chất rắn hoà tan khó bay hơi (thu muối từ nước biển).',
      'Phương pháp chiết: dùng phễu chiết tách hai chất lỏng không hoà tan vào nhau (tách dầu ăn ra khỏi nước).',
      'Phương pháp lắng, gạn: để các hạt chất rắn nặng lắng xuống đáy rồi gạn lớp nước trong phía trên.'
    ],
    keyTerms: ['Lọc', 'Cô cạn', 'Chiết', 'Lắng', 'Gạn', 'Phễu chiết']
  },
  {
    id: 18,
    title: 'Bài 18. Tế bào – Đơn vị cơ bản của sự sống',
    chapterId: 5,
    chapterTitle: 'Chương V: Tế bào',
    topic: 'sinh_hoc',
    pageSGK: 64,
    summaryPoints: [
      'Mọi cơ thể sinh vật đều được cấu tạo từ tế bào. Tế bào thực hiện đầy đủ các quá trình sống: sinh trưởng, hấp thụ dinh dưỡng, hô hấp, cảm ứng, bài tiết, sinh sản.',
      'Kích thước tế bào rất nhỏ (hầu hết đo bằng micromét µm), phải quan sát bằng kính hiển vi.',
      'Robert Hooke (1665) là người đầu tiên phát hiện ra tế bào khi quan sát lát mỏng vỏ cây sồi.',
      'Tế bào có kích thước nhỏ để duy trì tỉ lệ diện tích bề mặt trên thể tích (S/V) lớn, giúp trao đổi chất nhanh chóng và hiệu quả.'
    ],
    keyTerms: ['Tế bào', 'Đơn vị cơ bản của sự sống', 'Robert Hooke', 'Tỉ lệ S/V']
  },
  {
    id: 19,
    title: 'Bài 19. Cấu tạo và chức năng các thành phần của tế bào',
    chapterId: 5,
    chapterTitle: 'Chương V: Tế bào',
    topic: 'sinh_hoc',
    pageSGK: 67,
    summaryPoints: [
      '3 thành phần chính của tế bào: Màng tế bào (bao bọc, kiểm soát trao đổi chất), Tế bào chất (chứa bào quan, nơi diễn ra các hoạt động sống), Nhân / Vùng nhân (chứa vật chất di truyền, trung tâm điều khiển).',
      'Tế bào nhân sơ: chưa có màng nhân ngăn cách, chỉ có vùng nhân (ở vi khuẩn). Tế bào nhân thực: đã có màng nhân bao bọc vật chất di truyền.',
      'So sánh TB động vật và TB thực vật: TB thực vật có thêm Thành tế bào (xenlulozo giúp cứng cáp), Lục lạp (chứa diệp lục quang hợp) và Không bào trung tâm lớn.'
    ],
    keyTerms: ['Màng tế bào', 'Tế bào chất', 'Nhân tế bào', 'Vùng nhân', 'Nhân sơ', 'Nhân thực', 'Lục lạp', 'Thành tế bào']
  },
  {
    id: 23,
    title: 'Bài 23. Tổ chức cơ thể đa bào',
    chapterId: 6,
    chapterTitle: 'Chương VI: Từ tế bào đến cơ thể',
    topic: 'sinh_hoc',
    pageSGK: 79,
    summaryPoints: [
      'Sơ đồ các cấp tổ chức cấu tạo cơ thể: Tế bào → Mô → Cơ quan → Hệ cơ quan → Cơ thể.',
      'Mô gồm tập hợp các tế bào có cấu tạo giống nhau, cùng thực hiện một chức năng (mô biểu bì, mô cơ, mô thần kinh ở động vật; mô giậu, mô mạch gỗ, mạch rây ở thực vật).',
      'Cơ quan cấu tạo từ nhiều mô cùng thực hiện hoạt động sống (dạ dày, tim, phổi; rễ, thân, lá, hoa).',
      'Hệ cơ quan gồm nhiều cơ quan phối hợp thực hiện quá trình sống (hệ tiêu hoá, hệ tuần hoàn, hệ hô hấp, hệ chồi, hệ rễ).'
    ],
    keyTerms: ['Tế bào', 'Mô', 'Cơ quan', 'Hệ cơ quan', 'Cơ thể đa bào']
  },
  {
    id: 27,
    title: 'Bài 27. Vi khuẩn',
    chapterId: 7,
    chapterTitle: 'Chương VII: Đa dạng thế giới sống',
    topic: 'sinh_hoc',
    pageSGK: 92,
    summaryPoints: [
      'Vi khuẩn là sinh vật đơn bào, nhân sơ, kích thước hiển vi. Có 3 dạng điển hình: hình que (trực khuẩn), hình cầu (cầu khuẩn), hình xoắn (xoắn khuẩn).',
      'Cấu tạo vi khuẩn: Vỏ nhầy, thành tế bào, màng sinh chất, tế bào chất, vùng nhân; một số có lông và roi.',
      'Vai trò có lợi: phân giải xác sinh vật, cố định đạm cho cây, lên men chế biến thực phẩm (sữa chua, muối dưa, nước mắm), sản xuất kháng sinh.',
      'Tác hại: gây hỏng thức ăn, gây bệnh tả, thương hàn, lao phổi, uốn ván, viêm da; phòng tránh bằng vệ sinh sạch sẽ, ăn chín uống sôi.'
    ],
    keyTerms: ['Vi khuẩn', 'Nhân sơ', 'Trực khuẩn', 'Cầu khuẩn', 'Lên men lactic', 'Kháng sinh']
  },
  {
    id: 29,
    title: 'Bài 29. Virus',
    chapterId: 7,
    chapterTitle: 'Chương VII: Đa dạng thế giới sống',
    topic: 'sinh_hoc',
    pageSGK: 98,
    summaryPoints: [
      'Virus là dạng sống chưa có cấu tạo tế bào, kích thước siêu hiển vi (chỉ quan sát bằng kính hiển vi điện tử), chỉ nhân lên được bên trong tế bào chủ (kí sinh nội bào bắt buộc).',
      'Cấu tạo đơn giản: Vỏ protein bên ngoài và lõi vật chất di truyền (DNA hoặc RNA); một số có thêm vỏ ngoài và gai glycoprotein.',
      'Hình dạng chính: Dạng khối (HIV, bại liệt, cúm), dạng xoắn (Ebola, dại), dạng hỗn hợp (thể thực khuẩn T4).',
      'Phòng bệnh do virus hiệu quả nhất là tiêm phòng Vaccine khi cơ thể đang khoẻ mạnh.'
    ],
    keyTerms: ['Virus', 'Chưa có cấu tạo tế bào', 'Vỏ protein', 'Lõi ADN/ARN', 'Thể thực khuẩn (Phage)', 'Vaccine']
  },
  {
    id: 40,
    title: 'Bài 40. Lực là gì?',
    chapterId: 8,
    chapterTitle: 'Chương VIII: Lực trong đời sống',
    topic: 'vat_li',
    pageSGK: 144,
    summaryPoints: [
      'Tác dụng đẩy, kéo của vật này lên vật khác gọi là lực.',
      'Tác dụng của lực: làm biến đổi tốc độ, hướng chuyển động của vật hoặc làm vật bị biến dạng (hoặc cả hai cùng lúc).',
      'Lực tiếp xúc xuất hiện khi vật gây ra lực tiếp xúc với vật chịu lực (lực đẩy xe, lực chân sút bóng, lực lò xo đẩy xe).',
      'Lực không tiếp xúc xuất hiện ngay cả khi không có sự tiếp xúc trực tiếp (lực hút của nam châm lên sắt, lực hấp dẫn/lực hút của Trái Đất lên quả táo).'
    ],
    keyTerms: ['Lực đẩy', 'Lực kéo', 'Biến đổi chuyển động', 'Biến dạng', 'Lực tiếp xúc', 'Lực không tiếp xúc']
  },
  {
    id: 41,
    title: 'Bài 41. Biểu diễn lực',
    chapterId: 8,
    chapterTitle: 'Chương VIII: Lực trong đời sống',
    topic: 'vat_li',
    pageSGK: 147,
    summaryPoints: [
      'Đơn vị đo lực là niutơn (kí hiệu: N). Dụng cụ đo lực là lực kế (lực kế lò xo).',
      '4 đặc trưng của lực (4 yếu tố): Điểm đặt (gốc), phương, chiều và độ lớn.',
      'Biểu diễn lực bằng mũi tên: Gốc đặt tại vật chịu lực; Phương và chiều trùng với phương chiều của lực; Chiều dài biểu diễn độ lớn theo tỉ xích đã chọn.'
    ],
    keyTerms: ['Niutơn (N)', 'Lực kế', 'Điểm đặt', 'Phương', 'Chiều', 'Tỉ xích biểu diễn']
  },
  {
    id: 43,
    title: 'Bài 43. Trọng lượng, lực hấp dẫn',
    chapterId: 8,
    chapterTitle: 'Chương VIII: Lực trong đời sống',
    topic: 'vat_li',
    pageSGK: 154,
    summaryPoints: [
      'Mọi vật có khối lượng đều hút nhau, lực hút này gọi là lực hấp dẫn. Isaac Newton phát hiện ra lực hấp dẫn từ hiện tượng quả táo rơi.',
      'Lực hút của Trái Đất tác dụng lên vật có phương thẳng đứng, chiều từ trên xuống dưới.',
      'Trọng lượng (kí hiệu P, đơn vị N) là độ lớn lực hút của Trái Đất tác dụng lên vật.',
      'Mối liên hệ giữa trọng lượng và khối lượng: Trọng lượng của vật trên Trái Đất gần bằng 10 lần khối lượng tính ra kilôgam (P ≈ 10 × m, với m đo bằng kg).'
    ],
    keyTerms: ['Lực hấp dẫn', 'Trọng lượng (P)', 'Khối lượng (m)', 'Phương thẳng đứng', 'P = 10m']
  },
  {
    id: 44,
    title: 'Bài 44. Lực ma sát',
    chapterId: 8,
    chapterTitle: 'Chương VIII: Lực trong đời sống',
    topic: 'vat_li',
    pageSGK: 157,
    summaryPoints: [
      'Lực ma sát là lực tiếp xúc xuất hiện ở bề mặt tiếp xúc giữa hai vật.',
      'Lực ma sát trượt: xuất hiện khi một vật trượt trên bề mặt của vật khác, cản trở chuyển động trượt.',
      'Lực ma sát nghỉ: giữ cho vật đứng yên ngay cả khi có lực kéo/đẩy tác dụng vào vật.',
      'Ma sát có ích (khía rãnh lốp xe, phanh xe, đi lại không trượt ngã); ma sát có hại (làm mòn chi tiết máy, cản trở chuyển động → bôi trơn bằng dầu mỡ, dùng ổ bi).'
    ],
    keyTerms: ['Lực ma sát trượt', 'Lực ma sát nghỉ', 'Ổ bi', 'Khía rãnh lốp xe', 'Bôi trơn']
  },
  {
    id: 48,
    title: 'Bài 48. Sự chuyển hoá năng lượng',
    chapterId: 9,
    chapterTitle: 'Chương IX: Năng lượng',
    topic: 'vat_li',
    pageSGK: 168,
    summaryPoints: [
      'Năng lượng có thể chuyển hoá từ dạng này sang dạng khác, hoặc truyền từ vật này sang vật khác.',
      'Định luật bảo toàn năng lượng: "Năng lượng không tự sinh ra hoặc tự mất đi mà chỉ chuyển hoá từ dạng này sang dạng khác hoặc truyền từ vật này sang vật khác".',
      'Ví dụ: Quả bóng rơi xuống thế năng chuyển thành động năng; Đèn pin bật sáng biến điện năng thành quang năng và nhiệt năng.'
    ],
    keyTerms: ['Chuyển hoá năng lượng', 'Định luật bảo toàn năng lượng', 'Thế năng', 'Động năng', 'Nhiệt năng']
  },
  {
    id: 54,
    title: 'Bài 54. Hệ Mặt Trời',
    chapterId: 10,
    chapterTitle: 'Chương X: Trái Đất và Bầu trời',
    topic: 'thien_van',
    pageSGK: 187,
    summaryPoints: [
      'Hệ Mặt Trời (Thái Dương hệ) gồm Mặt Trời ở trung tâm và 8 hành tinh quay xung quanh theo quỹ đạo hình elip gần tròn.',
      'Thứ tự 8 hành tinh từ gần đến xa Mặt Trời: Thuỷ tinh → Kim tinh → Trái Đất → Hoả tinh → Mộc tinh → Thổ tinh → Thiên Vương tinh → Hải Vương tinh.',
      '4 hành tinh vòng trong (đá rắn): Thuỷ tinh, Kim tinh, Trái Đất, Hoả tinh. 4 hành tinh vòng ngoài (hành tinh khí khổng lồ): Mộc tinh, Thổ tinh, Thiên Vương tinh, Hải Vương tinh.',
      'Đơn vị thiên văn: 1 AU (Astronomical Unit) ≈ 150 triệu km (khoảng cách trung bình từ Trái Đất đến Mặt Trời).'
    ],
    keyTerms: ['Hệ Mặt Trời', '8 hành tinh', 'Đơn vị thiên văn (AU)', 'Mặt Trời', 'Hành tinh khổng lồ']
  },
  {
    id: 55,
    title: 'Bài 55. Ngân Hà',
    chapterId: 10,
    chapterTitle: 'Chương X: Trái Đất và Bầu trời',
    topic: 'thien_van',
    pageSGK: 190,
    summaryPoints: [
      'Ngân Hà (Milky Way) là một tập hợp hàng trăm tỉ thiên thể (các ngôi sao, khí, bụi...) liên kết với nhau bằng lực hấp dẫn.',
      'Ngân Hà có hình xoắn ốc dạng đĩa dẹt với 4 vòng xoắn chính. Đường kính khoảng 100.000 năm ánh sáng, bề dày khoảng 300 năm ánh sáng.',
      'Hệ Mặt Trời nằm ở gần rìa của một trong 4 nhánh xoắn ốc của Ngân Hà, cách tâm khoảng 26.000 năm ánh sáng.',
      'Năm ánh sáng (ly) là quãng đường ánh sáng truyền đi trong 1 năm trong chân không (~9.500 tỉ km).'
    ],
    keyTerms: ['Ngân Hà (Milky Way)', 'Xoắn ốc 4 nhánh', 'Năm ánh sáng', 'Vị trí Hệ Mặt Trời']
  }
];
