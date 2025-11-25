# seokkit

**Vite + React + TypeScript** 기반 템플릿

주요 라이브러리: React, TypeScript, Vite, Tailwind CSS, Zustand, Zod, @tanstack/react-query(구 react-query), Axios

---

## 개요

이 레포는 빠르게 시작할 수 있는 SPA 템플릿입니다. 구조는 기능(feature)-중심으로 설계되었고, 서버 상태 관리는 TanStack Query, 로컬 상태 관리는 Zustand, 데이터 검증/타입은 Zod를 사용하도록 권장합니다.

목표:

- 빠른 개발 환경(Vite)
- 명확한 책임 분리(API vs UI 상태)
- 타입 안전성(Zod + TypeScript)
- 유연한 스타일링(Tailwind)

---

## 주요 기능 / 특징

- Vite 개발 서버 (빠른 리빌드)
- React 18 + TypeScript
- Tailwind CSS로 유틸리티 기반 스타일링
- Zustand로 가벼운 전역 상태 관리 (persist 선택적 적용)
- @tanstack/react-query로 서버 상태 및 캐시 관리
- Zod로 입력 및 API 응답 유효성 검사 및 타입 추출
- Axios 기반 API 인스턴스
- Vitest + Testing Library로 유닛/컴포넌트 테스트

---

## 폴더 구조(요약)

```
src/
├─ assets/
├─ components/
│  ├─ ui/
│  └─ layout/
├─ features/
│  └─ <feature>/
├─ pages/
├─ hooks/
├─ stores/
├─ api/
├─ schemas/
├─ styles/
├─ utils/
├─ libs/
├─ main.tsx
└─ App.tsx
```

더 자세한 구조는 프로젝트 루트의 `docs` 또는 이 README의 하위 섹션을 참조하세요.

---

## 설치 및 시작

### 요구사항

- Node.js >= 18
- npm 또는 pnpm/yarn

### 설치

```bash
# npm
npm install

# 또는 pnpm
pnpm install
```

### 개발 서버

```bash
npm run dev
# -> http://localhost:5173
```

### 빌드

```bash
npm run build
npm run preview # 빌드 결과 확인용
```

---

## 주요 스크립트

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "typecheck": "tsc --noEmit",
  "lint": "eslint --ext .ts,.tsx src",
  "format": "prettier --write .",
  "test": "vitest"
}
```

---

## 환경 변수

`.env` 또는 `.env.local`에 다음을 설정하세요:

```
VITE_API_BASE_URL=https://api.example.com
VITE_OTHER_FLAG=true
```

참고: Vite 환경 변수는 `import.meta.env.VITE_...`로 접근합니다.

---

## 코드 스타일 & 툴체인

- **TypeScript**: `tsconfig.json`에서 `strict: true` 권장
- **ESLint**: `@typescript-eslint`, `eslint-plugin-react` 조합
- **Prettier**: 포맷팅
- **Husky + lint-staged** (선택): 커밋 전 lint/format 적용

---

## 주요 구현 가이드

### API 레이어 (`src/api`)

- Axios 인스턴스를 생성하고 `baseURL`, 공통 헤더, 인터셉터 등을 설정
- fetch/CRUD는 features 단위에서 호출

예시: `src/api/index.ts`

```ts
import axios from "axios";
export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });
```

---

### 서버 상태 (`@tanstack/react-query`)

- `libs/queryClient.ts`에 `QueryClient` 초기화
- 각 리소스 별로 `useQuery` / `useMutation` 커스텀 훅을 작성
- 중요한 불변성 규칙: mutate 후 `invalidateQueries` 또는 `setQueryData` 사용

예시 파일: `src/features/todos/api.ts`

---

### 로컬/전역 UI 상태 (Zustand)

- 작은 범위의 UI 상태에 사용(사이드바, 모달 등)
- 퍼포먼스: selector를 사용해 필요한 상태만 구독
- 필요하면 `persist` 미들웨어로 로컬 스토리지 저장

예시: `src/stores/uiStore.ts`

---

### 유효성 검사 (Zod)

- 폼 입력과 API 응답 검증에 사용
- `z.infer`로 타입 연동

예시: `src/schemas/todo.ts`

---

## 테스트

- Vitest + @testing-library/react로 컴포넌트/훅 테스트 작성
- `vitest.setup.ts`에서 테스트 환경(예: 글로벌 mock)을 설정

---

## 배포

- 정적 SPA: Vercel / Netlify / Cloudflare Pages 권장
- 빌드 명령: `npm run build` -> 생성된 `dist/` 업로드

---

## 컨벤션 및 권장사항

- 파일명: `kebab-case` 또는 `camelCase` 중 팀 컨벤션에 따름(폴더는 kebab-case 권장)
- React 컴포넌트: `PascalCase`로 작성 (`Button.tsx`)
- CSS: Tailwind utility를 우선, 복잡한 스타일은 `src/styles`로 분리
- Import 순서: 외부 라이브러리 -> src alias(@) -> 상대 경로
- 타입: 가능한 한 `zod` 스키마에서 타입을 추출하여 사용

---

## 예시 개발 흐름

1. feature 디렉터리 생성 (`src/features/feature-name`)
2. API 함수 및 react-query 훅 작성
3. Zod 스키마 생성
4. 컴포넌트 작성 및 테스트 추가
5. 스타일링 (Tailwind 적용)
6. PR 작성 및 리뷰

---

## 자주 묻는 질문(FAQ)

**Q. 서버 상태와 로컬 상태를 어떻게 분리하나요?**
A. 네트워크로부터 가져오는 데이터는 React Query로 관리. 모달이나 사이드바 같은 UI 상태는 Zustand 같이 경량 스토어로 관리.

**Q. 폴더를 나누는 기준은 무엇인가요?**
A. 기능 중심(feature-by-folder)을 권장. 페이지 단위로 feature를 만들고 그 안에 컴포넌트, 훅, api, types를 함께 둡니다.

---

## 기여

1. 포크(repo) → 브랜치 생성 → PR 요청
2. 커밋 메시지는 `feat/ fix/ docs/ chore/ refactor:` 형식 권장

---

## 라이선스

MIT

---

## 연락처

프로젝트 관련 문의: [changseok@example.com](mailto:changseok@example.com)
