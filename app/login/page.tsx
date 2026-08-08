import LoginForm from "../components/auth/LoginForm";
import GuestOnly from "../components/auth/GuestOnly";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-1 items-center justify-center px-4 py-10 sm:px-6">
      <GuestOnly>
        <LoginForm nextPath={next} />
      </GuestOnly>
    </main>
  );
}
