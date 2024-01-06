import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type AthletesSummaryCardProps = {
  name: string;
}

export default function AthletesSummaryCard({ name }: AthletesSummaryCardProps) {
    return (
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
      </Card>
    )
}
