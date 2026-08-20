# 랜덤 여행지 추첨

랜덤으로 국내 여행지를 뽑아주는 웹 앱. 마음에 드는 여행지를 즐겨찾기하고 여행기를 작성할 수 있습니다.

## 기술 스택

- **Frontend**: Next.js 16 (App Router) / React 19 / TypeScript
- **Styling**: Tailwind CSS 4 / Radix UI
- **데이터 관리**: TanStack React Query / Zustand
- **백엔드**: Supabase (PostgreSQL + Auth + RPC)
- **개발 도구**: ESLint / Prettier / Husky / lint-staged

## 주요 기능

| 기능                            | 상태         |
| ------------------------------- | ------------ |
| 랜덤 여행지 추첨 (Supabase RPC) | ✅ 완료      |
| 이메일/비밀번호 로그인/회원가입 | ✅ 완료      |
| 여행지 즐겨찾기                 | ✅ 완료      |
| 즐겨찾기 목록 조회              | ✅ 완료      |
| 여행기 작성 폼                  | 🔧 부분 구현 |
| 카카오 소셜 로그인              | 📌 준비 중   |
| 친구 관리 / 공유 기능           | 📌 준비 중   |

## 시작하기

### 사전 요구사항

- Node.js 18+
- pnpm

### 환경 변수 설정

`.env.example`을 `.env.local`로 복사하고 Supabase 프로젝트 정보를 입력합니다.

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 설치 및 실행

```bash
pnpm install
pnpm dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 명령어

| 명령어          | 설명                 |
| --------------- | -------------------- |
| `pnpm dev`      | 개발 서버 실행       |
| `pnpm build`    | 프로덕션 빌드        |
| `pnpm start`    | 프로덕션 서버 실행   |
| `pnpm lint`     | ESLint 검사          |
| `pnpm format`   | Prettier 포맷팅      |
| `pnpm db:types` | Supabase 타입 재생성 |

## 프로젝트 구조

```
src/
  app/
    (auth)/          # 로그인/회원가입 페이지
    (main)/          # 메인 앱 (네비게이션 포함)
      random/        # 랜덤 여행지 추첨
      favorite/      # 즐겨찾기 목록
      trips/         # 여행기
    page.tsx         # 홈 대시보드
  components/        # 공용 UI 컴포넌트
  hooks/             # 커스텀 훅 (useUser, useFavorite)
  types/             # TypeScript 타입 정의
  utils/
    supabase/        # Supabase 클라이언트 설정
```
