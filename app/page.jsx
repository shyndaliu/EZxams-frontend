
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

import Landing from "@/components/home/landing";
import Roadmap from "@/components/home/roadmap";



export default async function Home() {
  const session = await getServerSession(authOptions);
  const session_data = { "user": session?.token?.token?.user }
  return (
    session !== null ? (
      <Roadmap session={session_data} />
    ) : (
      <Landing />
    )
  );
}
