import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Travel Pins 개인정보처리방침',
  title: '개인정보처리방침 | Travel Pins',
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold">개인정보처리방침</h1>

      <p className="mb-6 text-sm text-gray-500">
        시행일자: 2026년 3월 14일
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">
          1. 수집하는 개인정보 항목
        </h2>
        <p className="leading-7">
          Travel Pins는 서비스 제공을 위해 다음과 같은 개인정보를
          수집합니다.
        </p>
        <ul className="mt-2 list-disc pl-6 leading-7">
          <li>
            소셜 로그인 시: 이름, 이메일, 프로필 이미지 (카카오, 네이버,
            구글 계정에서 제공)
          </li>
          <li>서비스 이용 시: 저장한 장소 정보, 리뷰 내용, 업로드 이미지</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">
          2. 개인정보의 수집 및 이용 목적
        </h2>
        <ul className="list-disc pl-6 leading-7">
          <li>회원 식별 및 인증</li>
          <li>여행지 저장 및 공유 서비스 제공</li>
          <li>서비스 개선 및 통계 분석</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">
          3. 개인정보의 보유 및 이용 기간
        </h2>
        <p className="leading-7">
          회원 탈퇴 시 즉시 파기합니다. 단, 관련 법령에 따라 보존이
          필요한 경우 해당 기간 동안 보관합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">
          4. 개인정보의 제3자 제공
        </h2>
        <p className="leading-7">
          Travel Pins는 이용자의 동의 없이 개인정보를 제3자에게
          제공하지 않습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">
          5. 개인정보의 파기 절차 및 방법
        </h2>
        <p className="leading-7">
          전자적 파일 형태의 정보는 복구할 수 없는 방법으로 영구
          삭제하며, 종이에 출력된 개인정보는 분쇄하여 파기합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">
          6. 이용자의 권리와 행사 방법
        </h2>
        <p className="leading-7">
          이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제할 수
          있으며, 회원 탈퇴를 통해 개인정보 처리 정지를 요청할 수
          있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">
          7. 개인정보 보호책임자
        </h2>
        <p className="leading-7">
          개인정보 처리에 관한 문의는 서비스 내 문의 기능을 통해
          접수할 수 있습니다.
        </p>
      </section>
    </main>
  );
}
