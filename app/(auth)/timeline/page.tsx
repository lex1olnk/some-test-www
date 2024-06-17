import { authConfig, loginIsRequiredServer } from "@/lib/options";
import { getServerSession } from "next-auth";

const wait = (ms: number) => new Promise((rs) => setTimeout(rs, ms));

export default async function Page() {
  const session = await getServerSession(authConfig);

  console.log("Session: ", session);

  return (
    <>
      <h3>This is your timeline: {session?.user?.email}</h3>
    </>
  );
}
