import { GoogleSignInButton } from "@/components/Auth/AuthButtons";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/options";
import { redirect } from "next/navigation";
import { CredentialsForm } from "@/components/Auth/CredentialsForm";
import { Input } from "@/components/ui/Input";
import { RegisterForm } from "@/components/Auth/RegisterForm";

export default async function Page() {
  const session = await getServerSession(authConfig);

  console.log("Session: ", session);

  if (session) return redirect("/");

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center mt-10 p-10 shadow-md">
        <RegisterForm />
      </div>
    </div>
  );
}
