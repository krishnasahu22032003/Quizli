import OpenEnded from "@/components/OpenEnded";
import prisma from "@/app/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
    params: {
        gameId: string;
    };
};

const OpenEndedPage = async ({ params: { gameId } }: Props) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return redirect("/");
    }

    const game = await prisma.game.findUnique({
        where: {
            id: gameId,
        },
        include: {
            questions: {
                select: {
                    id: true,
                    question: true,
                    answer: true,
                },
            },
        },
    });

    if (!game || game.gameType === "mcq") {
        return redirect("/quiz");
    };

    return <OpenEnded game={game} />;
};

export default OpenEndedPage;