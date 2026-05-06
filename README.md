# MAPLOY — Travel Planner

> 생성형 AI를 활용하여 제작한 React 기반 여행 계획 서비스

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=flat-square&logo=github-actions)
![AWS Amplify](https://img.shields.io/badge/Hosting-AWS_Amplify-FF9900?style=flat-square&logo=aws-amplify)

---

## 시스템 소개

**MAPLOY**는 여행지, 날짜, 예산, 여행 스타일을 입력하면 맞춤형 여행 일정을 자동으로 생성해주는 웹 서비스입니다.

- 🗺️ **6개 여행지 지원**: 도쿄, 파리, 발리, 뉴욕, 바르셀로나, 이스탄불
- 🗓️ **맞춤 일정 생성**: 3일, 5일, 7일 일정 자동 생성
- 💰 **예산 분석**: 여행 예산에 맞는 실용적인 비용 계획 제공
- 🍽️ **현지 정보**: 대표 음식, 주요 명소, 여행 꿀팁 제공

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React 18, CSS3 |
| CI/CD | GitHub Actions |
| Hosting | AWS Amplify |
| Font | Cormorant Garamond, Outfit |

---

## GitHub Actions CI/CD 환경

`.github/workflows/deploy.yml`에 정의된 파이프라인:

```
Push to main
    │
    ▼
[Build Job]
├── Checkout code
├── Setup Node.js 24
├── npm ci
└── npm run build
    │
    ▼
Build Artifact 업로드 완료
```

### GitHub Secrets 설정

Repository → Settings → Secrets and variables → Actions

| Secret | 설명 |
|--------|------|
| `AWS_ACCESS_KEY_ID` | AWS Access Key |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Key |
| `AWS_SESSION_TOKEN` | AWS Session Token |
| `AWS_REGION` | `us-east-1` |

---

## 배포 URL

> ⚠️ AWS Academy 세션 기준 4시간만 유효합니다.

**https://main.d3p0y9tcragi8.amplifyapp.com**

---

## 시연 영상

| 영상 | 링크 |
|------|------|
| GitHub Actions 활용 CI/CD 구축 시연 | [YouTube 바로가기](https://youtu.be/Xz90yoh0f-4) |
| AWS Amplify 서비스 활용 시연 | [YouTube 바로가기](https://youtu.be/74fu73htkQM) |

---

## 개발자

**이동규** — 컴퓨터공학과
