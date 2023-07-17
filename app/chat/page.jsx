import Chat from "@/components/home/chat"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function AiChat() {
    const session = await getServerSession(authOptions);
    return <Chat session={session} />
}