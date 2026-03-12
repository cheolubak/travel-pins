# Travel Pins

네이버 지도 기반 여행지 공유 서비스.
방문한 장소를 저장하고, 리뷰·이미지를 남기며, 그룹 여행을 관리할 수 있습니다.

## 주요 기능

- 네이버 지도 기반 장소 검색 및 저장
- 리뷰 작성 및 이미지 업로드
- 그룹 여행 관리
- 소셜 로그인 (카카오, 네이버, 구글)

## 기술 스택

| 분류 | 스택 |
| --- | --- |
| Runtime | Next.js 16, React 19, TypeScript 5 |
| 스타일링 | Tailwind CSS 4, CVA, tailwind-merge |
| 상태관리 | Zustand 5 |
| 유효성 검사 | Zod 4 |
| 빌드 | TurboRepo, pnpm 10 |
| 폰트 | Pretendard (로컬) |

## 프로젝트 구조

```
apps/client          - Next.js 프론트엔드 (@travel-pins/client)
packages/
  components         - 공유 UI 컴포넌트 (@travel-pins/components)
  configs/
    tailwind         - Tailwind 설정 (@travel-pins/tailwind)
    tsconfig         - TypeScript 설정 (@travel-pins/tsconfig)
    storybook        - Storybook 설정
  domains            - 도메인 모델 (@travel-pins/domains)
  request            - API 요청 유틸 (@travel-pins/request)
  types              - 공유 타입 (@travel-pins/types)
  utils              - 유틸리티 함수 (@travel-pins/utils)
```

## 시작하기

### 사전 요구사항

- Node.js 18+
- pnpm 10+

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 린트
pnpm lint
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.
