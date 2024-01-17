"use client";

import TrainingExecutionSummaryCard from "@/components/custom/trainingExecutionSummaryCard";
import { TrainingExecution } from "@/types";
import { useCallback, useEffect, useState } from "react";

export default function TrainingExecutionsList() {
  const [trainingExecutions, setTrainingExecutions] = useState<TrainingExecution[]>([]);

  const fetchTrainingExecutionsJson = useCallback(async () => {
    const response =  await fetch('http://localhost:3000/training-executions');
    const trainingExecutionsJson = await response.json();

    setTrainingExecutions(trainingExecutionsJson);
  }, []);

  useEffect(() => {
    fetchTrainingExecutionsJson();
  }, [fetchTrainingExecutionsJson]);

  return (
    <>
      <h1 className="font-bold text-3xl my-4 text-center">Execuções de treino</h1>
      {trainingExecutions.map((trainingExecution, i) => {
        const created = new Date(trainingExecution.createdAt);
        return <TrainingExecutionSummaryCard key={i} id={trainingExecution.id} trainingName={trainingExecution.training.name} created={created.toLocaleDateString('pt-BR')}/>
      })}
    </>
  )
}
