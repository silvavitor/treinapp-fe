import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

type TrainingSummaryCardProps = {
  id: string;
  title: string;
  exercises: number;
  athletes: number;
}

export default function TrainingSummaryCard({ id, title, exercises, athletes }: TrainingSummaryCardProps) {
  const router = useRouter();

  async function handleStart(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const response = await fetch('http://localhost:3000/training-executions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trainingId: id
      })
    });

    const trainingExecution = await response.json();

    if (response.ok) {
      router.push(`training-executions/${trainingExecution.id}`)
    }
  }

  function handleCardClick() {
    router.push(`trainings/${id}`)
  }

  return (
    <Card onClick={handleCardClick} className="mb-2 flex justify-between items-center cursor-pointer">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{exercises} exercicios</CardDescription>
        <CardDescription>{athletes} atleta{athletes > 1 ? 's' : ''}</CardDescription>
      </CardHeader>
      <div className="flex justify-center items-center mr-6">
        <Button onClick={handleStart}>
          Iniciar ▶️
        </Button>
      </div>
    </Card>
  )
}
