import { LoginForm } from "./LoginForm";

export default function AdminLogin() {
  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="text-3xl">Area riservata</h1>
      <p className="mt-2 text-sm text-muted">Accesso solo per lo staff autorizzato.</p>
      <LoginForm />
    </div>
  );
}
