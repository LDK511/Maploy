import { useState, useEffect, useRef } from "react";
import "./App.css";

const DESTINATIONS = [
  {
    id: "tokyo",
    name: "도쿄",
    country: "일본",
    emoji: "🏯",
    tag: "문화 & 미식",
    desc: "전통과 첨단이 공존하는 도시",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=90",
    color: "#E8D5C4",
    accent: "#8B4513",
    budget: { low: 800000, mid: 1500000, high: 2500000 },
    highlights: ["아사쿠사 센소지", "시부야 스크램블", "신주쿠 가부키초", "하라주쿠 다케시타 거리"],
    food: ["라멘", "스시", "타코야키", "말차 디저트"],
    tips: ["IC 카드(Suica)를 첫날 구매하세요", "지하철 24시간 운행 안함 주의", "편의점 음식도 훌륭해요"],
    plans: {
      3: [
        { day: 1, title: "도착 & 아사쿠사 탐방", morning: "나리타/하네다 공항 도착, 호텔 체크인", afternoon: "아사쿠사 센소지 & 나카미세 거리 쇼핑", evening: "스카이트리 야경 감상 & 모츠나베 저녁" },
        { day: 2, title: "시부야 & 하라주쿠", morning: "메이지 신궁 산책", afternoon: "하라주쿠 다케시타 거리 & 오모테산도", evening: "시부야 스크램블 교차로 & 이자카야 체험" },
        { day: 3, title: "자유 시간 & 귀국", morning: "신주쿠 쇼핑 & 기념품 구매", afternoon: "공항 이동", evening: "귀국" },
      ],
      5: [
        { day: 1, title: "도착 & 아사쿠사", morning: "공항 도착 & 체크인", afternoon: "아사쿠사 센소지 탐방", evening: "스카이트리 전망대 & 스미다 강변 산책" },
        { day: 2, title: "시부야 & 하라주쿠", morning: "메이지 신궁", afternoon: "하라주쿠 & 오모테산도", evening: "시부야 야경 & 이자카야" },
        { day: 3, title: "신주쿠 & 아키하바라", morning: "신주쿠 교엔 정원", afternoon: "아키하바라 전자 거리", evening: "가부키초 & 로봇 레스토랑" },
        { day: 4, title: "오다이바 & 긴자", morning: "오다이바 팀랩 플래닛", afternoon: "긴자 쇼핑", evening: "쓰키지 시장 저녁 식사" },
        { day: 5, title: "기념품 & 귀국", morning: "마지막 쇼핑", afternoon: "공항 이동", evening: "귀국" },
      ],
      7: [
        { day: 1, title: "도착 & 아사쿠사", morning: "공항 도착", afternoon: "아사쿠사 센소지", evening: "스카이트리 야경" },
        { day: 2, title: "시부야 & 하라주쿠", morning: "메이지 신궁", afternoon: "하라주쿠", evening: "시부야 이자카야" },
        { day: 3, title: "닛코 당일치기", morning: "닛코 도쇼구 신사", afternoon: "케곤 폭포", evening: "도쿄 귀환" },
        { day: 4, title: "아키하바라 & 우에노", morning: "우에노 공원 & 박물관", afternoon: "아키하바라", evening: "아메요코 시장" },
        { day: 5, title: "오다이바 & 긴자", morning: "팀랩 플래닛", afternoon: "긴자", evening: "쓰키지 시장" },
        { day: 6, title: "하코네 당일치기", morning: "후지산 뷰포인트", afternoon: "온천 체험", evening: "도쿄 귀환" },
        { day: 7, title: "기념품 & 귀국", morning: "신주쿠 마지막 쇼핑", afternoon: "공항 이동", evening: "귀국" },
      ],
    },
  },
  {
    id: "paris",
    name: "파리",
    country: "프랑스",
    emoji: "🗼",
    tag: "낭만 & 예술",
    desc: "예술과 낭만의 도시",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=90",
    color: "#C8D8E8",
    accent: "#2C4A7C",
    budget: { low: 1500000, mid: 2500000, high: 4000000 },
    highlights: ["에펠탑", "루브르 박물관", "몽마르트 언덕", "샹젤리제 거리"],
    food: ["크루아상", "에스카르고", "라따뚜이", "마카롱"],
    tips: ["메트로 카르네(10장 묶음) 구매 추천", "박물관은 사전 예약 필수", "소매치기 주의"],
    plans: {
      3: [
        { day: 1, title: "에펠탑 & 샹젤리제", morning: "에펠탑 방문 (오전 일찍)", afternoon: "샹젤리제 거리 산책 & 쇼핑", evening: "세느강 크루즈 & 야경" },
        { day: 2, title: "루브르 & 마레 지구", morning: "루브르 박물관 (3~4시간)", afternoon: "마레 지구 카페 & 갤러리", evening: "몽마르트 언덕 일몰 감상" },
        { day: 3, title: "오르세 & 귀국", morning: "오르세 미술관", afternoon: "기념품 쇼핑", evening: "귀국" },
      ],
      5: [
        { day: 1, title: "도착 & 에펠탑", morning: "CDG 공항 도착 & 체크인", afternoon: "에펠탑 & 트로카데로 광장", evening: "세느강 크루즈" },
        { day: 2, title: "루브르 & 마레", morning: "루브르 박물관", afternoon: "마레 지구 탐방", evening: "몽마르트 야경" },
        { day: 3, title: "베르사유 궁전", morning: "베르사유 궁전 & 정원", afternoon: "베르사유 마을 산책", evening: "파리 귀환 & 비스트로" },
        { day: 4, title: "오르세 & 생제르맹", morning: "오르세 미술관", afternoon: "생제르맹 데프레 카페 투어", evening: "샹젤리제 야경" },
        { day: 5, title: "기념품 & 귀국", morning: "마지막 카페 & 쇼핑", afternoon: "공항 이동", evening: "귀국" },
      ],
      7: [
        { day: 1, title: "도착 & 에펠탑", morning: "공항 도착", afternoon: "에펠탑", evening: "세느강 크루즈" },
        { day: 2, title: "루브르 & 마레", morning: "루브르 박물관", afternoon: "마레 지구", evening: "몽마르트" },
        { day: 3, title: "베르사유", morning: "베르사유 궁전", afternoon: "베르사유 정원", evening: "파리 귀환" },
        { day: 4, title: "오르세 & 생제르맹", morning: "오르세 미술관", afternoon: "생제르맹 카페 투어", evening: "샹젤리제" },
        { day: 5, title: "몽생미셸 당일치기", morning: "몽생미셸 수도원", afternoon: "해변 산책", evening: "파리 귀환" },
        { day: 6, title: "퐁피두 & 피카소", morning: "퐁피두 센터", afternoon: "피카소 미술관", evening: "고급 레스토랑 디너" },
        { day: 7, title: "기념품 & 귀국", morning: "마지막 쇼핑", afternoon: "공항 이동", evening: "귀국" },
      ],
    },
  },
  {
    id: "bali",
    name: "발리",
    country: "인도네시아",
    emoji: "🌴",
    tag: "휴양 & 자연",
    desc: "신들의 섬, 열대의 낙원",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=90",
    color: "#C8E6C9",
    accent: "#2E7D32",
    budget: { low: 600000, mid: 1200000, high: 2000000 },
    highlights: ["우붓 라이스 테라스", "울루와뚜 사원", "쿠타 비치", "탄롯 사원"],
    food: ["나시고렝", "미고렝", "사테", "바비굴링"],
    tips: ["우기(11~3월) 피하세요", "오토바이 렌트가 이동 편해요", "사원 방문 시 사롱 착용 필수"],
    plans: {
      3: [
        { day: 1, title: "도착 & 쿠타 비치", morning: "응우라라이 공항 도착 & 체크인", afternoon: "쿠타 비치 & 서핑 체험", evening: "스미냑 선셋 바 & 해산물 저녁" },
        { day: 2, title: "우붓 문화 탐방", morning: "우붓 원숭이 숲 & 왕궁", afternoon: "뜨갈랄랑 라이스 테라스", evening: "우붓 전통 케착 댄스 공연" },
        { day: 3, title: "사원 & 귀국", morning: "탄롯 사원 일출", afternoon: "기념품 쇼핑", evening: "귀국" },
      ],
      5: [
        { day: 1, title: "도착 & 쿠타", morning: "공항 도착 & 체크인", afternoon: "쿠타 비치 산책", evening: "스미냑 레스토랑" },
        { day: 2, title: "우붓 탐방", morning: "우붓 원숭이 숲", afternoon: "라이스 테라스 & 왕궁", evening: "케착 댄스 공연" },
        { day: 3, title: "울루와뚜 & 짐바란", morning: "울루와뚜 사원 & 절벽", afternoon: "빙인 비치 서핑", evening: "짐바란 씨푸드 BBQ" },
        { day: 4, title: "스파 & 휴식", morning: "발리니즈 스파 & 마사지", afternoon: "수영장 & 리조트 휴식", evening: "루프탑 바 선셋" },
        { day: 5, title: "기념품 & 귀국", morning: "쇼핑 & 기념품", afternoon: "공항 이동", evening: "귀국" },
      ],
      7: [
        { day: 1, title: "도착 & 쿠타", morning: "공항 도착", afternoon: "쿠타 비치", evening: "스미냑 저녁" },
        { day: 2, title: "우붓", morning: "원숭이 숲", afternoon: "라이스 테라스", evening: "케착 댄스" },
        { day: 3, title: "울루와뚜", morning: "울루와뚜 사원", afternoon: "서핑", evening: "짐바란 씨푸드" },
        { day: 4, title: "누사페니다", morning: "케링킹 비치", afternoon: "엔젤 빌라봉", evening: "발리 귀환" },
        { day: 5, title: "스파 & 휴식", morning: "발리니즈 스파", afternoon: "리조트 휴식", evening: "루프탑 선셋" },
        { day: 6, title: "탄롯 & 뇨만", morning: "탄롯 사원", afternoon: "꾸따 아트 마켓", evening: "파인다이닝 디너" },
        { day: 7, title: "기념품 & 귀국", morning: "마지막 쇼핑", afternoon: "공항 이동", evening: "귀국" },
      ],
    },
  },
  {
    id: "newyork",
    name: "뉴욕",
    country: "미국",
    emoji: "🗽",
    tag: "도시 & 문화",
    desc: "잠들지 않는 도시",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&q=90",
    color: "#E8E0F0",
    accent: "#4A235A",
    budget: { low: 2000000, mid: 3500000, high: 6000000 },
    highlights: ["자유의 여신상", "센트럴 파크", "타임스퀘어", "메트로폴리탄 박물관"],
    food: ["뉴욕 피자", "베이글", "핫도그", "치즈케이크"],
    tips: ["지하철 OMNY 카드 이용", "팁 문화 (15~20%) 필수", "미리 뮤지컬 예약 추천"],
    plans: {
      3: [
        { day: 1, title: "맨해튼 핵심 관광", morning: "자유의 여신상 크루즈", afternoon: "월스트리트 & 브루클린 브리지", evening: "타임스퀘어 야경 & 브로드웨이 뮤지컬" },
        { day: 2, title: "센트럴 파크 & 박물관", morning: "센트럴 파크 산책", afternoon: "메트로폴리탄 박물관", evening: "5번가 쇼핑 & 루프탑 바" },
        { day: 3, title: "브루클린 & 귀국", morning: "브루클린 윌리엄스버그", afternoon: "공항 이동", evening: "귀국" },
      ],
      5: [
        { day: 1, title: "도착 & 타임스퀘어", morning: "JFK 도착 & 체크인", afternoon: "타임스퀘어 & 42번가", evening: "브로드웨이 뮤지컬" },
        { day: 2, title: "자유의 여신상 & 월스트리트", morning: "자유의 여신상 크루즈", afternoon: "월스트리트 & 9/11 메모리얼", evening: "하이라인 파크 & 첼시 마켓" },
        { day: 3, title: "센트럴 파크 & 박물관", morning: "센트럴 파크", afternoon: "메트로폴리탄 박물관", evening: "어퍼 웨스트 사이드 레스토랑" },
        { day: 4, title: "브루클린 & 소호", morning: "브루클린 브리지 & 덤보", afternoon: "소호 쇼핑", evening: "루프탑 바 야경" },
        { day: 5, title: "기념품 & 귀국", morning: "마지막 쇼핑", afternoon: "공항 이동", evening: "귀국" },
      ],
      7: [
        { day: 1, title: "도착 & 타임스퀘어", morning: "공항 도착", afternoon: "타임스퀘어", evening: "브로드웨이" },
        { day: 2, title: "자유의 여신상", morning: "여신상 크루즈", afternoon: "월스트리트", evening: "하이라인 파크" },
        { day: 3, title: "센트럴 파크", morning: "센트럴 파크", afternoon: "메트로폴리탄", evening: "어퍼 웨스트 사이드" },
        { day: 4, title: "브루클린", morning: "브루클린 브리지", afternoon: "덤보 & 윌리엄스버그", evening: "루프탑 바" },
        { day: 5, title: "코니아일랜드 & 퀸즈", morning: "코니아일랜드 비치", afternoon: "플러싱 코리아타운", evening: "재즈 바" },
        { day: 6, title: "현대미술관 & 소호", morning: "MoMA", afternoon: "소호 & 트라이베카", evening: "고급 파인다이닝" },
        { day: 7, title: "기념품 & 귀국", morning: "마지막 쇼핑", afternoon: "공항 이동", evening: "귀국" },
      ],
    },
  },
  {
    id: "barcelona",
    name: "바르셀로나",
    country: "스페인",
    emoji: "🎭",
    tag: "건축 & 예술",
    desc: "가우디의 도시, 지중해의 열정",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1920&q=90",
    color: "#FAE8C8",
    accent: "#8B4500",
    budget: { low: 1200000, mid: 2000000, high: 3500000 },
    highlights: ["사그라다 파밀리아", "파크 구엘", "라 람블라 거리", "고딕 지구"],
    food: ["파에야", "타파스", "하몽", "상그리아"],
    tips: ["사그라다 파밀리아 사전 예약 필수", "라 람블라 소매치기 주의", "시에스타 시간 (오후 2~5시) 대부분 상점 닫음"],
    plans: {
      3: [
        { day: 1, title: "가우디 건축 투어", morning: "사그라다 파밀리아 (오전 예약)", afternoon: "파크 구엘", evening: "그라시아 거리 타파스 투어" },
        { day: 2, title: "고딕 지구 & 해변", morning: "고딕 지구 & 피카소 미술관", afternoon: "바르셀로네타 해변", evening: "항구 씨푸드 & 플라멩코 공연" },
        { day: 3, title: "몬주익 & 귀국", morning: "몬주익 성 & 전망", afternoon: "기념품 쇼핑", evening: "귀국" },
      ],
      5: [
        { day: 1, title: "도착 & 람블라", morning: "공항 도착 & 체크인", afternoon: "라 람블라 거리 산책", evening: "고딕 지구 저녁" },
        { day: 2, title: "가우디 건축", morning: "사그라다 파밀리아", afternoon: "파크 구엘", evening: "그라시아 타파스" },
        { day: 3, title: "해변 & 피카소", morning: "피카소 미술관", afternoon: "바르셀로네타 해변", evening: "항구 씨푸드" },
        { day: 4, title: "몬주익 & 쇼핑", morning: "몬주익 성", afternoon: "그라시아 거리 쇼핑", evening: "플라멩코 공연" },
        { day: 5, title: "기념품 & 귀국", morning: "마지막 쇼핑", afternoon: "공항 이동", evening: "귀국" },
      ],
      7: [
        { day: 1, title: "도착 & 람블라", morning: "공항 도착", afternoon: "라 람블라", evening: "고딕 지구" },
        { day: 2, title: "가우디 건축", morning: "사그라다 파밀리아", afternoon: "파크 구엘", evening: "그라시아 타파스" },
        { day: 3, title: "해변 & 피카소", morning: "피카소 미술관", afternoon: "바르셀로네타 해변", evening: "항구 씨푸드" },
        { day: 4, title: "몬세라트 당일치기", morning: "몬세라트 수도원", afternoon: "산악 하이킹", evening: "바르셀로나 귀환" },
        { day: 5, title: "몬주익 & 쇼핑", morning: "몬주익 성", afternoon: "그라시아 쇼핑", evening: "플라멩코 공연" },
        { day: 6, title: "시체스 해변", morning: "시체스 해변 당일치기", afternoon: "지중해 수영", evening: "바르셀로나 귀환 & 파인다이닝" },
        { day: 7, title: "기념품 & 귀국", morning: "마지막 쇼핑", afternoon: "공항 이동", evening: "귀국" },
      ],
    },
  },
  {
    id: "istanbul",
    name: "이스탄불",
    country: "튀르키예",
    emoji: "🕌",
    tag: "역사 & 문화",
    desc: "동서양이 만나는 고대 도시",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=90",
    color: "#F0E0D0",
    accent: "#7B3F00",
    budget: { low: 700000, mid: 1300000, high: 2200000 },
    highlights: ["아야소피아", "블루 모스크", "그랜드 바자르", "보스포러스 해협"],
    food: ["케밥", "바클라바", "터키쉬 딜라이트", "터키 차이"],
    tips: ["이스탄불 카드 교통카드 구매", "그랜드 바자르 흥정 필수", "모스크 방문 시 복장 규정 준수"],
    plans: {
      3: [
        { day: 1, title: "술탄아흐멧 지구", morning: "아야소피아 & 블루 모스크", afternoon: "톱카프 궁전", evening: "보스포러스 크루즈 & 씨푸드 저녁" },
        { day: 2, title: "그랜드 바자르 & 갈라타", morning: "그랜드 바자르 쇼핑", afternoon: "갈라타 타워 전망", evening: "탁심 광장 & 이스티클랄 거리" },
        { day: 3, title: "돌마바흐체 & 귀국", morning: "돌마바흐체 궁전", afternoon: "기념품 쇼핑", evening: "귀국" },
      ],
      5: [
        { day: 1, title: "도착 & 술탄아흐멧", morning: "공항 도착 & 체크인", afternoon: "아야소피아 & 블루 모스크", evening: "보스포러스 크루즈" },
        { day: 2, title: "궁전 & 바자르", morning: "톱카프 궁전", afternoon: "그랜드 바자르", evening: "탁심 광장" },
        { day: 3, title: "갈라타 & 베식타스", morning: "갈라타 타워", afternoon: "돌마바흐체 궁전", evening: "베식타스 씨푸드" },
        { day: 4, title: "아시아 사이드", morning: "카드쾨이 아시아 지구", afternoon: "프린스 제도 크루즈", evening: "로컬 메이하네 저녁" },
        { day: 5, title: "기념품 & 귀국", morning: "이집션 바자르 쇼핑", afternoon: "공항 이동", evening: "귀국" },
      ],
      7: [
        { day: 1, title: "도착 & 술탄아흐멧", morning: "공항 도착", afternoon: "아야소피아", evening: "보스포러스 크루즈" },
        { day: 2, title: "궁전 & 바자르", morning: "톱카프 궁전", afternoon: "그랜드 바자르", evening: "탁심 광장" },
        { day: 3, title: "갈라타 & 베식타스", morning: "갈라타 타워", afternoon: "돌마바흐체 궁전", evening: "씨푸드" },
        { day: 4, title: "아시아 사이드", morning: "카드쾨이", afternoon: "프린스 제도", evening: "로컬 저녁" },
        { day: 5, title: "카파도키아 당일치기", morning: "열기구 투어", afternoon: "괴레메 야외 박물관", evening: "이스탄불 귀환" },
        { day: 6, title: "에페소스 & 터키탕", morning: "함맘(터키탕) 체험", afternoon: "베이오을루 갤러리", evening: "파인다이닝 보스포러스 뷰" },
        { day: 7, title: "기념품 & 귀국", morning: "이집션 바자르", afternoon: "공항 이동", evening: "귀국" },
      ],
    },
  },
];

const TRAVEL_STYLES = [
  { id: "relaxation", label: "휴양", icon: "🌊" },
  { id: "adventure", label: "액티비티", icon: "🧗" },
  { id: "culture", label: "문화탐방", icon: "🏛️" },
  { id: "food", label: "미식여행", icon: "🍜" },
  { id: "shopping", label: "쇼핑", icon: "🛍️" },
  { id: "nature", label: "자연", icon: "🌿" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ startDate: "", days: "3", travelers: "2", style: "", budget: "" });
  const [result, setResult] = useState(null);
  const [heroIdx, setHeroIdx] = useState(0);
  const [imgLoaded, setImgLoaded] = useState({});
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setHeroIdx(i => (i + 1) % DESTINATIONS.length), 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const heroDest = DESTINATIONS[heroIdx];

  const getBudgetLabel = (dest, budget) => {
    if (!budget) return "";
    const b = parseInt(budget);
    if (b < dest.budget.low) return "⚠️ 예산이 다소 부족할 수 있어요";
    if (b < dest.budget.mid) return "✅ 알뜰 여행 가능";
    if (b < dest.budget.high) return "✅ 여유로운 여행 가능";
    return "✨ 프리미엄 여행 가능";
  };

  const getPlanDays = (days) => {
    const d = parseInt(days);
    if (d <= 3) return "3";
    if (d <= 5) return "5";
    return "7";
  };

  const handleGenerate = () => {
    if (!selected || !form.startDate || !form.style) return;
    const planKey = getPlanDays(form.days);
    const plan = selected.plans[planKey];
    setResult({ dest: selected, form: { ...form }, plan, budgetLabel: getBudgetLabel(selected, form.budget) });
    setPage("result");
  };

  const formatBudget = (dest, budget) => {
    if (!budget) return "-";
    const b = parseInt(budget);
    const perPerson = Math.round(b / parseInt(form.travelers || 1));
    return `총 ${b.toLocaleString()}원 (1인 ${perPerson.toLocaleString()}원)`;
  };

  return (
    <div className="app">
      {/* ── HOME ── */}
      {page === "home" && (
        <>
          {/* Hero */}
          <section className="hero" style={{ "--hero-color": heroDest.color, "--hero-accent": heroDest.accent }}>
            <div className="hero-bg">
              <img
                key={heroDest.id}
                src={heroDest.image}
                alt={heroDest.name}
                className={`hero-img ${imgLoaded[heroDest.id] ? "loaded" : ""}`}
                onLoad={() => setImgLoaded(p => ({ ...p, [heroDest.id]: true }))}
              />
              <div className="hero-overlay" />
            </div>

            <header className="header">
              <div className="logo">travel-planner</div>
              <nav className="nav">
                <span onClick={() => setPage("home")}>홈</span>
                <span onClick={() => setPage("explore")}>여행지</span>
              </nav>
            </header>

            <div className="hero-content">
              <p className="hero-tag">{heroDest.emoji} {heroDest.name}, {heroDest.country}</p>
              <h1 className="hero-title">당신의 완벽한<br /><em>여행을 설계하세요</em></h1>
              <p className="hero-desc">목적지를 선택하고 일정을 입력하면<br />최적의 여행 플랜을 제공합니다</p>
              <div className="hero-btns">
                <button className="btn-primary" onClick={() => setPage("explore")}>여행지 둘러보기</button>
                <button className="btn-ghost" onClick={() => setPage("plan")}>바로 계획하기 →</button>
              </div>
            </div>

            <div className="hero-dots">
              {DESTINATIONS.map((_, i) => (
                <button key={i} className={`dot ${i === heroIdx ? "active" : ""}`} onClick={() => setHeroIdx(i)} />
              ))}
            </div>
          </section>

          {/* Destinations Grid */}
          <section className="section">
            <div className="section-header">
              <h2>인기 여행지</h2>
              <p>전 세계 핫한 여행지를 만나보세요</p>
            </div>
            <div className="dest-grid">
              {DESTINATIONS.map(dest => (
                <div key={dest.id} className="dest-card" onClick={() => { setSelected(dest); setPage("detail"); }}>
                  <div className="dest-img-wrap">
                    <img src={dest.image} alt={dest.name} className="dest-img" loading="lazy" />
                    <div className="dest-img-overlay" />
                    <span className="dest-tag">{dest.tag}</span>
                  </div>
                  <div className="dest-info">
                    <div className="dest-name-row">
                      <span className="dest-emoji">{dest.emoji}</span>
                      <div>
                        <h3>{dest.name}</h3>
                        <p className="dest-country">{dest.country}</p>
                      </div>
                    </div>
                    <p className="dest-desc">{dest.desc}</p>
                    <div className="dest-budget-row">
                      <span>예상 예산</span>
                      <span>{Math.round(dest.budget.low / 10000)}만~{Math.round(dest.budget.mid / 10000)}만원</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="section features-section">
            <div className="features-grid">
              <div className="feature">
                <span className="feature-icon">🗓️</span>
                <h3>맞춤 일정</h3>
                <p>3일, 5일, 7일 중 선택하면 최적화된 일정을 제공합니다</p>
              </div>
              <div className="feature">
                <span className="feature-icon">💰</span>
                <h3>예산 분석</h3>
                <p>여행 예산에 맞는 실용적인 비용 계획을 안내합니다</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🍽️</span>
                <h3>현지 음식</h3>
                <p>각 여행지의 대표 음식과 맛집 정보를 제공합니다</p>
              </div>
              <div className="feature">
                <span className="feature-icon">💡</span>
                <h3>여행 꿀팁</h3>
                <p>현지인이 알려주는 실용적인 여행 팁을 제공합니다</p>
              </div>
            </div>
          </section>

          <footer className="footer">
            <div className="logo">MAPLOY</div>
            <p>© 2025 MAPLOY. 당신의 여행을 더 특별하게.</p>
          </footer>
        </>
      )}

      {/* ── EXPLORE ── */}
      {page === "explore" && (
        <div className="page">
          <header className="inner-header">
            <button className="back-btn" onClick={() => setPage("home")}>← 홈으로</button>
            <div className="logo">MAPLOY</div>
          </header>
          <div className="section">
            <div className="section-header">
              <h2>모든 여행지</h2>
              <p>마음에 드는 여행지를 선택하세요</p>
            </div>
            <div className="dest-grid">
              {DESTINATIONS.map(dest => (
                <div key={dest.id} className="dest-card" onClick={() => { setSelected(dest); setPage("detail"); }}>
                  <div className="dest-img-wrap">
                    <img src={dest.image} alt={dest.name} className="dest-img" loading="lazy" />
                    <div className="dest-img-overlay" />
                    <span className="dest-tag">{dest.tag}</span>
                  </div>
                  <div className="dest-info">
                    <div className="dest-name-row">
                      <span className="dest-emoji">{dest.emoji}</span>
                      <div>
                        <h3>{dest.name}</h3>
                        <p className="dest-country">{dest.country}</p>
                      </div>
                    </div>
                    <p className="dest-desc">{dest.desc}</p>
                    <div className="dest-budget-row">
                      <span>예상 예산</span>
                      <span>{Math.round(dest.budget.low / 10000)}만~{Math.round(dest.budget.mid / 10000)}만원</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DETAIL ── */}
      {page === "detail" && selected && (
        <div className="page">
          <div className="detail-hero" style={{ "--dest-color": selected.color }}>
            <img src={selected.image} alt={selected.name} className="detail-hero-img" />
            <div className="detail-hero-overlay" />
            <header className="inner-header inner-header--abs">
              <button className="back-btn back-btn--white" onClick={() => setPage("explore")}>← 뒤로</button>
              <div className="logo logo--white">MAPLOY</div>
            </header>
            <div className="detail-hero-content">
              <span className="dest-tag">{selected.tag}</span>
              <h1>{selected.emoji} {selected.name}</h1>
              <p>{selected.country} — {selected.desc}</p>
            </div>
          </div>

          <div className="detail-body">
            <div className="detail-grid">
              <div className="detail-col">
                <div className="info-card">
                  <h3>🏆 주요 명소</h3>
                  <ul>{selected.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>
                </div>
                <div className="info-card">
                  <h3>🍽️ 대표 음식</h3>
                  <div className="food-chips">
                    {selected.food.map((f, i) => <span key={i} className="food-chip">{f}</span>)}
                  </div>
                </div>
                <div className="info-card">
                  <h3>💡 여행 꿀팁</h3>
                  <ul>{selected.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
                </div>
              </div>
              <div className="detail-col">
                <div className="info-card budget-card">
                  <h3>💰 예상 예산 (1인 기준)</h3>
                  <div className="budget-rows">
                    <div className="budget-row">
                      <span>알뜰 여행</span>
                      <span>{Math.round(selected.budget.low / 10000)}만원~</span>
                    </div>
                    <div className="budget-row mid">
                      <span>일반 여행</span>
                      <span>{Math.round(selected.budget.mid / 10000)}만원~</span>
                    </div>
                    <div className="budget-row high">
                      <span>프리미엄 여행</span>
                      <span>{Math.round(selected.budget.high / 10000)}만원~</span>
                    </div>
                  </div>
                </div>
                <button className="btn-primary btn-full" onClick={() => setPage("plan")}>
                  이 여행지로 계획 세우기 →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PLAN ── */}
      {page === "plan" && (
        <div className="page">
          <header className="inner-header">
            <button className="back-btn" onClick={() => setPage(selected ? "detail" : "home")}>← 뒤로</button>
            <div className="logo">MAPLOY</div>
          </header>
          <div className="plan-container">
            <div className="plan-header">
              <h2>여행 계획 세우기</h2>
              <p>원하는 조건을 입력하면 맞춤 일정을 드려요</p>
            </div>

            {/* Destination select */}
            <div className="form-section">
              <label>여행지 선택 <span className="req">*</span></label>
              <div className="dest-select-grid">
                {DESTINATIONS.map(dest => (
                  <button
                    key={dest.id}
                    className={`dest-select-btn ${selected?.id === dest.id ? "active" : ""}`}
                    onClick={() => setSelected(dest)}
                  >
                    <img src={dest.image} alt={dest.name} />
                    <div className="dest-select-overlay" />
                    <span>{dest.emoji} {dest.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>출발일 <span className="req">*</span></label>
                <input className="input" type="date" value={form.startDate}
                  onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>여행 기간</label>
                <select className="input" value={form.days}
                  onChange={e => setForm(f => ({ ...f, days: e.target.value }))}>
                  <option value="3">3일</option>
                  <option value="4">4일</option>
                  <option value="5">5일</option>
                  <option value="6">6일</option>
                  <option value="7">7일</option>
                </select>
              </div>
              <div className="form-group">
                <label>여행 인원</label>
                <select className="input" value={form.travelers}
                  onChange={e => setForm(f => ({ ...f, travelers: e.target.value }))}>
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}명</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>총 예산 (원)</label>
              <input className="input" type="number" placeholder="예: 2000000"
                value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} />
              {selected && form.budget && (
                <p className="budget-hint">{getBudgetLabel(selected, form.budget)}</p>
              )}
            </div>

            <div className="form-group">
              <label>여행 스타일 <span className="req">*</span></label>
              <div className="style-grid">
                {TRAVEL_STYLES.map(s => (
                  <button key={s.id}
                    className={`style-btn ${form.style === s.id ? "active" : ""}`}
                    onClick={() => setForm(f => ({ ...f, style: s.id }))}>
                    <span>{s.icon}</span><span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              className={`btn-primary btn-full ${(!selected || !form.startDate || !form.style) ? "disabled" : ""}`}
              onClick={handleGenerate}
              disabled={!selected || !form.startDate || !form.style}
            >
              여행 플랜 생성하기 ✨
            </button>
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {page === "result" && result && (
        <div className="page">
          <div className="result-hero" style={{ "--dest-color": result.dest.color }}>
            <img src={result.dest.image} alt={result.dest.name} className="detail-hero-img" />
            <div className="detail-hero-overlay" />
            <header className="inner-header inner-header--abs">
              <button className="back-btn back-btn--white" onClick={() => setPage("plan")}>← 다시 계획하기</button>
              <div className="logo logo--white">MAPLOY</div>
            </header>
            <div className="detail-hero-content">
              <span className="dest-tag">📋 여행 플랜 완성</span>
              <h1>{result.dest.emoji} {result.dest.name} {result.form.days}일</h1>
              <p>{result.form.travelers}명 · {result.form.startDate} 출발 · {formatBudget(result.dest, result.form.budget)}</p>
            </div>
          </div>

          <div className="result-body">
            {/* Summary */}
            <div className="result-summary">
              <div className="summary-chip">{TRAVEL_STYLES.find(s => s.id === result.form.style)?.icon} {TRAVEL_STYLES.find(s => s.id === result.form.style)?.label}</div>
              {result.budgetLabel && <div className="summary-chip">{result.budgetLabel}</div>}
            </div>

            {/* Day plan */}
            <div className="result-section">
              <h2>🗓️ 일자별 일정</h2>
              <div className="day-plans">
                {result.plan.map((day) => (
                  <div key={day.day} className="day-card">
                    <div className="day-header">
                      <span className="day-badge">Day {day.day}</span>
                      <h3>{day.title}</h3>
                    </div>
                    <div className="day-body">
                      <div className="time-row"><span className="time-label">🌅 오전</span><span>{day.morning}</span></div>
                      <div className="time-row"><span className="time-label">☀️ 오후</span><span>{day.afternoon}</span></div>
                      <div className="time-row"><span className="time-label">🌙 저녁</span><span>{day.evening}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights & Food & Tips */}
            <div className="result-cards-grid">
              <div className="info-card">
                <h3>🏆 주요 명소</h3>
                <ul>{result.dest.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>
              </div>
              <div className="info-card">
                <h3>🍽️ 꼭 먹어야 할 음식</h3>
                <div className="food-chips">{result.dest.food.map((f, i) => <span key={i} className="food-chip">{f}</span>)}</div>
              </div>
              <div className="info-card">
                <h3>💡 여행 꿀팁</h3>
                <ul>{result.dest.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
            </div>

            <div className="result-actions">
              <button className="btn-primary" onClick={() => { setPage("home"); setResult(null); setSelected(null); }}>
                새 여행 계획하기
              </button>
              <button className="btn-secondary" onClick={() => window.print()}>일정 저장하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}