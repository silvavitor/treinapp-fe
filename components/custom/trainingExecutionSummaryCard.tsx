import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

type TrainingExecutionSummaryCardProps = {
  id: string;
  trainingName: string;
  created: string;
}

export default function TrainingExecutionSummaryCard({ id, trainingName, created }: TrainingExecutionSummaryCardProps) {
  return (
    <Link href={`training-executions/${id}`}>
    <Card className="mb-2">
      <CardHeader>
        <CardTitle>{trainingName} - {created}</CardTitle>
        <CardDescription>
          <p></p>
        </CardDescription>
      </CardHeader>
    </Card>
    </Link>
  )
}
