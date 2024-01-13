import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type TrainingSummaryCardProps = {
  title: string;
  exercises: number;
  athletes: number;
}

export default function TrainingSummaryCard({ title, exercises, athletes }: TrainingSummaryCardProps) {
    return (
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{exercises} exercicios</CardDescription>
          <CardDescription>{athletes} atleta{athletes > 1 ? 's' : ''}</CardDescription>
        </CardHeader>
      </Card>
    )
}
