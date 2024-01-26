"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import * as z from "zod"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TrainingExecution } from "@/types";
 

const formSchema = z.object({
  execution: z.any(),
  reps: z.any(),
  weight: z.any(),
});

type ParamsType = {
  id: string
}

type TrainingExecutionsEditParams = {
  params: ParamsType
}

type AthleteSet = {
  id: string;
  setNumber: number;
  reps: string;
  weight: string;
};

type ExerciseData = {
  name: string;
  athletesSets: {
    [name: string]: AthleteSet[];
  };
};

type ExerciseSetForm = {
  [key: string]: ExerciseData;
};

export default function TrainingExecutionsEdit({ params }: TrainingExecutionsEditParams) {
  const [trainingExecution, setTrainingExecution] = useState<TrainingExecution>();
  const router = useRouter();
  const { id } = params;

  const fetchTrainingExecution = useCallback(async () => {
    const response = await fetch(`http://localhost:3000/training-executions/${id}`);
    const trainingExecutionJson: TrainingExecution = await response.json();
    console.log(trainingExecutionJson);
    setTrainingExecution(trainingExecutionJson);
  }, [id]);

  const exerciseSets: ExerciseSetForm = useMemo<ExerciseSetForm>(() => {
    const exerciseSetForm: ExerciseSetForm = {};
    trainingExecution?.exercises_sets.forEach(exerciseSet => {
      if (!exerciseSet.exercise || !exerciseSet.athlete) return;

      const exerciseId = exerciseSet.exercise ? exerciseSet.exercise?.id : '';
      const athleteName = exerciseSet.athlete.name;
    
      if (!Object.keys(exerciseSetForm).includes(exerciseId)) {
        exerciseSetForm[exerciseId] = {
          name: exerciseSet.exercise.name,
          athletesSets: {}
        }
      }

      const exerciseObject = exerciseSetForm[exerciseId];

      if (!Object.keys(exerciseObject.athletesSets).includes(athleteName)) {
        exerciseObject.athletesSets[athleteName] = [];
      }

      exerciseSetForm[exerciseId].athletesSets[athleteName].push({
        id: exerciseSet.id,
        setNumber: exerciseSet.setNumber,
        weight: exerciseSet.weight,
        reps: exerciseSet.reps
      })
    });

    return exerciseSetForm;

  }, [trainingExecution]);

  useEffect(() => {
    fetchTrainingExecution();
  }, [fetchTrainingExecution]);  
  
  async function handleDelete() {
    await fetch(`http://localhost:3000/training-executions/${id}`, {
      method: "DELETE"
    });

    router.push('/training-executions');

    toast.success('Execução de treino excluido com sucesso!');
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reps: [],
      weight: [],
    },
  });
  
  async function handleRepsBlur (e: any) {
    const id = e.target.attributes["data-id"].value;
    await fetch(`http://localhost:3000/exercise-sets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reps: e.target.value
      })
    });

    toast.success('Repetições foram salvas com sucesso!');
  }

  async function handleWeightBlur (e: any) {
    console.log(e);
    const id = e.target.attributes["data-id"].value;
    console.log(id);
    await fetch(`http://localhost:3000/exercise-sets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weight: Number(e.target.value)
      })
    });

    toast.success('Peso salvo com sucesso!');
  }

  return (
    <div className="my-8">
      <Form {...form}>
        <form className="space-y-4">
          {
            Object.keys(exerciseSets).map(id => {
              const exerciseSet = exerciseSets[id];
              const name = exerciseSet.name;
              return <FormField
                key={id}
                control={form.control}
                name="execution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">{name}</FormLabel>
                    {
                      Object.keys(exerciseSet.athletesSets).map((athleteName, i) => {
                      const exerciseAthleteSets = exerciseSet.athletesSets[athleteName];
                      return <div key={i} className="space-y-4">
                        <p>{athleteName}</p>
                          {exerciseAthleteSets.map(exerciseAthleteSet => (
                            <FormControl key={exerciseAthleteSet.id}>
                              <div className="flex items-center">
                                <span className="mr-2">{exerciseAthleteSet.setNumber} -</span>
                                <div className="flex items-center">
                                  <span className="mr-2">Reps:</span>
                                  <Controller
                                    name={`reps.${exerciseAthleteSet.id}`}
                                    control={form.control}
                                    defaultValue={exerciseAthleteSet.reps}
                                    render={({ field }) => (
                                      <Input placeholder="Repetições" {...field} onBlur={handleRepsBlur} data-id={exerciseAthleteSet.id} />
                                    )}
                                  />
                                  <span className="mx-2">Peso:</span>
                                  <Controller
                                    name={`weight.${exerciseAthleteSet.id}`}
                                    control={form.control}
                                    defaultValue={exerciseAthleteSet.weight}
                                    render={({ field }) => (
                                      <Input placeholder="Peso" {...field} onBlur={handleWeightBlur} data-id={exerciseAthleteSet.id} />
                                    )}
                                  />
                                </div>
                              </div>
                            </FormControl>
                          ))}
                        </div>
                      })
                    }
                  </FormItem>
                )}
              />
              
            })
          }
          <div className="space-x-4">
            <Button variant="destructive" type="button" onClick={handleDelete}>Excluir</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
