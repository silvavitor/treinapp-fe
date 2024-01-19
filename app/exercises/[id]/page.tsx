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
import { useCallback, useEffect, useState } from "react";
import { Exercise, Training } from "@/types";
 
const formSchema = z.object({
  name: z.string(),
  sets_qtd: z.coerce.number().min(1, {message: "deve ter no mínimo 1 série"}),
  trainingId: z.string().uuid(),
});

type ParamsType = {
  id: string
}

type ExerciseEditParams = {
  params: ParamsType
}

export default function ExerciseEdit({ params }: ExerciseEditParams) {
  const [exercise, setExercise] = useState<Exercise>();
  const [options, setOptions] = useState<SelectOptions[]>([]);
  const router = useRouter();
  const { id } = params;

  const fetchExercises = useCallback(async () => {
    const [responseTraining, responseExercise] = await Promise.all([
        fetch(`http://localhost:3000/trainings`),
        fetch(`http://localhost:3000/exercises/${id}`)
      ]);
    const trainingJson: Training[] = await responseTraining.json();
    const exerciseJson: Exercise = await responseExercise.json();

    const options: SelectOptions[] = trainingJson.map((training, i) => {
      return {
        value: training.id,
        text: training.name,
        selected: i === 0,
      }
    });

    setOptions(options);
    setExercise(exerciseJson);
  }, [id]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch(`http://localhost:3000/exercises/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        sets_qtd: values.sets_qtd,
        trainingId: values.trainingId,
      })
    });

    toast.success('Exercicio editado com sucesso!');
    router.push('/exercises');
  }

  function handleBack() {
    router.push('/exercises');
  }

  async function handleDelete() {
    await fetch(`http://localhost:3000/exercises/${id}`, {
      method: "DELETE"
    });

    router.push('/exercises');

    toast.success('Exercicio excluido com sucesso!');
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sets_qtd: 0,
      trainingId: "",
    },
    values: exercise
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
                <FormLabel>Nome do exercicio</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do exercicio" {...field} {...form.register('name')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="sets_qtd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade de séries</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Quantidade de séries" {...field} {...form.register('sets_qtd')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="trainingId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Treino</FormLabel>
                  <FormControl>
                    <Select onChange={field.onChange} options={options} />
                  </FormControl>
                <FormMessage />
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
