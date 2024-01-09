"use client";

import AthletesSummaryCard from "@/components/custom/athletesSummaryCard";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Athlete } from "@/types";

export default function Athletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  const fetchAthletes = useCallback(async () => {
    const response =  await fetch('http://localhost:3000/athletes');
    const athletesJson = await response.json();

    setAthletes(athletesJson);
  }, []);

  useEffect(() => {
    fetchAthletes();
  }, [fetchAthletes]);

  return (
    <>
      <h1 className="font-bold text-3xl my-4 text-center">Atletas</h1>
      <div className="flex justify-end items-end mb-4">
        <Button>Adicionar</Button>
      </div>
      {athletes.map((athlete, i) => (
        <AthletesSummaryCard key={i} name={athlete.name} id={athlete.id} />
        ))}
    </>
  )
}
