import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

type ExercisesSummaryCardProps = {
  id: string;
  title: string;
  sets: number;
  training: string;
}

export default function ExercisesSummaryCard({ id, title, sets, training }: ExercisesSummaryCardProps) {
    return (
      <Link href={`exercises/${id}`}>
        <Card className="mb-2">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              <p>Treino: {training}</p>
              <p>{sets} séries</p>
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    )
}
