import Chat from "@/components/home/chat"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function AiChat() {
    const session = await getServerSession(authOptions);
    const session_data = { "user": session?.token?.token?.user }
    return <Chat session={session_data} />
}