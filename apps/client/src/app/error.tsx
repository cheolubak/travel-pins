'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert">
      <h2>오류가 발생했습니다</h2>
      <p>{error.message}</p>
      <button onClick={reset} type="button">
        다시 시도
      </button>
    </div>
  );
}
