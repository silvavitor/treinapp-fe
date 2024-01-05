"use client";

import TrainingSummaryCard from "@/components/custom/trainingSummaryCard";
import { useCallback, useEffect, useState } from "react";

type Athlete = {
  id: string,
  name: string
}

type Exercise = {
    id: string;
    name: string;
    sets_qtd: number,
    trainingId: string;
    createdAt: Date,
    updatedAt: Date,
}

type Training = {
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    athletes: Athlete[],
    exercises: Exercise[],
    _count: {
        exercises: number,
        athletes: number,
        TrainingExecution: number
    }
}

export default function Home() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const fetchTraining = useCallback(async () => {
    const response =  await fetch('http://localhost:3000/trainings');
    const trainingsJson = await response.json();

    setTrainings(trainingsJson);
  }, []);

  useEffect(() => {
    fetchTraining();
  }, [fetchTraining]);

  return (
    <>
      {trainings.map((training, i) => (
        <TrainingSummaryCard key={i} title={training.name} exercises={training._count.exercises}/>
      ))}
    </>
  );
}
