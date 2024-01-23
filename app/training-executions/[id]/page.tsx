"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Select, { SelectOptions } from "@/components/custom/select";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Exercise, Training, TrainingExecution } from "@/types";
 
const formSchema = z.object({
  name: z.string(),
  sets_qtd: z.coerce.number().min(1, {message: "deve ter no mínimo 1 série"}),
  trainingId: z.string().uuid(),
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

  // {
  //   "fc2fc71-9f28-4202-bbc8-a957bf0e07b6": {
  //     name: "Supino"
  //     athletesSets: {
  //       "Rafa": [{
  //         setNumber: 1,
  //         reps: 0,
  //         weight: 0,
  //       },
  //       {
  //         setNumber: 2,
  //         reps: 0,
  //         weight: 0,
  //       }]
  //     }
  //   }
  // }

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
      name: "",
      sets_qtd: 0,
      trainingId: "",
    },
  });

  return (
    <div className="mt-8">
      <Form {...form}>
        <form className="space-y-4">
          {
            Object.keys(exerciseSets).map(id => {
              const exerciseSet = exerciseSets[id];
              const name = exerciseSet.name;
              return <FormField
                key={id}
                control={form.control}
                name="name"
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
                                  <Input placeholder="Repetições" {...field} {...form.register('name')} />
                                  <span className="mx-2">Peso:</span>
                                  <Input placeholder="Peso" {...field} {...form.register('name')} />
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
