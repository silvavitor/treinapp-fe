import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type TrainingSummaryCardProps = {
  title: string;
  exercises: number
}

export default function TrainingSummaryCard({ title, exercises }: TrainingSummaryCardProps) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{exercises} exercicios</CardDescription>
        </CardHeader>
    </Card>
    )
}
