import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ExercisesSummaryCardProps = {
  title: string;
  sets: number;
  training: string;
}

export default function ExercisesSummaryCard({ title, sets, training }: ExercisesSummaryCardProps) {
    return (
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            <p>Treino: {training}</p>
            <p>{sets} séries</p>
          </CardDescription>
        </CardHeader>
      </Card>
    )
}
