"use client";

import ExercisesSummaryCard from "@/components/custom/exercisesSummaryCard";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Exercise } from "@/types";
import Link from "next/link";

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const fetchExercises = useCallback(async () => {
    const response =  await fetch('http://localhost:3000/exercises');
    const exercisesJson = await response.json();

    setExercises(exercisesJson);
  }, []);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return (
    <>
      <h1 className="font-bold text-3xl my-4 text-center">Exercicios</h1>
      <div className="flex justify-end items-end mb-4">
        <Link href="/exercises/new">
          <Button>Adicionar</Button>
        </Link>
      </div>
      {exercises.map((exercise, i) => (
        <ExercisesSummaryCard key={i} id={exercise.id} title={exercise.name} sets={exercise.sets_qtd} training={exercise.Training.name}/>
        ))}
    </>
  )
}
