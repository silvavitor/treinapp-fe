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
import { useCallback, useEffect, useMemo, useState } from "react";
import { Athlete, Training } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
 
const formSchema = z.object({
  name: z.string(),
  athletes: z.array(z.string()),
});

type ParamsType = {
  id: string
}

type TrainingEditParams = {
  params: ParamsType
}

export default function TrainingEdit({ params }: TrainingEditParams) {
  const [training, setTraining] = useState<Training>();
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const router = useRouter();
  const { id } = params;

  const selectedAthletes = useMemo(() => {
    if (training) {
      return training.athletes?.map(a => a.id);
    } else {
      return [];
    }
  }, [training]);

  const fetchTrainings = useCallback(async () => {
    const [responseTraining, responseAthletes] = await Promise.all([
        fetch(`http://localhost:3000/trainings/${id}`),
        fetch(`http://localhost:3000/athletes`)
      ]);
    const trainingJson: Training = await responseTraining.json();
    const athletesJson: Athlete[] = await responseAthletes.json();

    setAthletes(athletesJson);
    setTraining(trainingJson);
  }, [id]);

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch(`http://localhost:3000/trainings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        athletes: values.athletes
      })
    });

    toast.success('Treino editado com sucesso!');
    router.push('/');
  }

  function handleBack() {
    router.push('/');
  }

  async function handleDelete() {
    await fetch(`http://localhost:3000/trainings/${id}`, {
      method: "DELETE"
    });

    router.push('/');

    toast.success('Treino excluido com sucesso!');
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      athletes: [],
    },
    values: {
      name: training ? training.name : '',
      athletes: selectedAthletes
    }
  });

  return (
    <div className="mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do treino</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do treino" {...field} {...form.register('name')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="athletes"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Atletas</FormLabel>
                </div>
                <div className="grid grid-cols-2">  
                  {athletes.map((athlete, i) => (
                    <FormField
                      key={i}
                      control={form.control}
                      name="athletes"
                      render={({ field }) => {
                        console.log(field)
                        return (
                          <FormItem
                            key={athlete.id}
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(athlete.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, athlete.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== athlete.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="ml-1 text-center">
                              {athlete.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
          <div className="space-x-4">
            <Button variant="secondary" type="button" onClick={handleBack}>Voltar</Button>
            <Button type="submit">Editar</Button>
            <Button variant="destructive" type="button" onClick={handleDelete}>Excluir</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
