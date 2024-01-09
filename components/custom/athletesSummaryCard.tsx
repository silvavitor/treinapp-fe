import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

type AthletesSummaryCardProps = {
  id: string;
  name: string;
}

export default function AthletesSummaryCard({ id, name }: AthletesSummaryCardProps) {
    return (
      <Link href={`athletes/${id}`}>
        <Card className="mb-2">
          <CardHeader>
            <CardTitle>{name}</CardTitle>
          </CardHeader>
        </Card>
      </Link>
    )
}
