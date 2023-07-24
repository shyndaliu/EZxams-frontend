import Navbar from "./navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  const session_data = { "user": session?.token?.token?.user }
  if (session) { return <Navbar session={session_data} />; }
}
