# Travel Pins

네이버 지도 기반으로 여행을 간 곳을 공유하는 서비스를 만들려고 하고 있어.
다양한 관점에서 이 서비스를 만들 에이전트 팀을 구성해서 작업해줘.
팀원 중 한 명은 UX, 한 명은 기술 아키텍처, 그리고 한 명은 반대 의견을 제시하고, 마지막 한 명은 모든걸 확인하고 승인하는 역할을 맡아줘.
4명의 팀원으로 구성된 팀을 만들어 해당 서비스를 개발해줘.

## 프로젝트 개요

네이버 지도 기반 여행지 공유 서비스. TurboRepo + pnpm 모노레포.
사용자가 방문한 장소를 저장하고, 리뷰·이미지를 남기며, 그룹 여행을 관리할 수 있다.

핵심 기능: 장소 검색/저장, 리뷰 작성, 이미지 업로드, 그룹 여행, 카카오, 네이버, 구글 로그인

## 기술 스택

- **Runtime**: Next.js 16, React 19, TypeScript 5
- **스타일링**: Tailwind CSS 4, class-variance-authority, tailwind-merge, clsx
- **상태관리**: Zustand 5
- **유효성 검사**: Zod 4
- **패키지 매니저**: pnpm 10 (npm 사용 금지)
- **빌드**: TurboRepo
- **폰트**: Pretendard (로컬)

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

## 주요 커맨드

```bash
pnpm dev             # 개발 서버 실행
pnpm build           # 전체 빌드
pnpm lint            # ESLint 실행
```

## 코드 컨벤션

### Import 규칙 (ESLint 강제)

- **type-only import 필수**: `import type { Metadata } from 'next'`
- **React default import 금지**: `import { useState } from 'react'` (O) / `import React from 'react'` (X)
- **정렬 순서** (perfectionist 플러그인): type → builtin/external → internal → parent/sibling → side-effect → style
- **경로 alias**: `@/*` (apps/client 내부), `@travel-pins/*` (패키지 간)

### 스타일링 패턴

- Tailwind CSS + `class-variance-authority`(CVA)로 컴포넌트 변형 관리
- `cn()` 유틸(`@travel-pins/utils`)로 클래스명 병합: `cn(variants(), className)`
- 새 컴포넌트는 CSS Modules 대신 Tailwind + CVA 패턴 사용

### 모듈 구조

- **barrel export**: 모든 패키지는 `src/index.ts`에서 re-export
- **feature 기반 디렉토리**: `src/features/{feature}/components/`, `src/features/{feature}/pages/`
- 클라이언트 컴포넌트는 파일 최상단에 `'use client'` 선언

## Prettier 설정

싱글 쿼트, 세미콜론 사용, trailing comma all, printWidth 80, tabWidth 2

## TypeScript 설정

- Target: ES2017, Module: esnext, Module Resolution: bundler
- Strict mode 활성화
- JSX: react-jsx (React import 불필요)
