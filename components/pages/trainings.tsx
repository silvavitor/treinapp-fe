"use client";

import TrainingSummaryCard from "@/components/custom/trainingSummaryCard";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Training } from "@/types";

export default function Trainings() {
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
      <h1 className="font-bold text-3xl my-4 text-center">Treinos</h1>
      <div className="flex justify-end items-end mb-4">
        <Button>Adicionar</Button>
      </div>
      {trainings.map((training, i) => (
        <TrainingSummaryCard key={i} title={training.name} exercises={training._count.exercises}/>
        ))}
    </>
  )
}