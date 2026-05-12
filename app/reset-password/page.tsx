import { Suspense } from "react";
import ResetPasswordForm
from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-black
        p-6
      "
    >
      <Suspense
        fallback={
          <p className="text-white">
            Carregando...
          </p>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
