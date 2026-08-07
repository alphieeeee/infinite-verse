import RegistrationForm from "../components/auth/RegistrationForm";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-1 items-center justify-center px-4 py-10 sm:px-6">
      <RegistrationForm />
    </main>
  );
}
