import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type TrainingSummaryCardProps = {
  title: string;
  exercises: number
}

export default function TrainingSummaryCard({ title, exercises }: TrainingSummaryCardProps) {
    return (
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{exercises} exercicios</CardDescription>
        </CardHeader>
      </Card>
    )
}
