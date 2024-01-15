import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

type TrainingSummaryCardProps = {
  id: string;
  title: string;
  exercises: number;
  athletes: number;
}

export default function TrainingSummaryCard({ id, title, exercises, athletes }: TrainingSummaryCardProps) {
    return (
      <Link href={`trainings/${id}`}>
        <Card className="mb-2">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{exercises} exercicios</CardDescription>
            <CardDescription>{athletes} atleta{athletes > 1 ? 's' : ''}</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    )
}
