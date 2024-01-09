"use client";

import { useCallback, useEffect, useState } from "react";
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
import { Athlete as AthleteType } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
 
const formSchema = z.object({
  name: z.string().min(2, {message: "Nome tem que ter mais que 2 letras"}).max(50, {message: "Nome tem que ter no máximo 50 letras"}),
})

type ParamsType = {
  id: string
}

type AthleteProps = {
  params: ParamsType
}

export default function Athlete({ params }: AthleteProps) {
  const [athlete, setAthlete] = useState<AthleteType>();
  const { id } = params;
  const router = useRouter();

  const fetchAthlete = useCallback(async () => {
    const response =  await fetch(`http://localhost:3000/athletes/${id}`);
    const athleteJson = await response.json();

    setAthlete(athleteJson);
  }, [id]);

  useEffect(() => {
    fetchAthlete();
  }, [fetchAthlete]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch(`http://localhost:3000/athletes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name
      })
    });

    toast.success('Atleta editado com sucesso!');
  }

  async function handleDelete() {
    await fetch(`http://localhost:3000/athletes/${id}`, {
      method: "DELETE"
    });

    router.push('/athletes');

    toast.success('Atleta excluido com sucesso!');
  };

  function handleBack() {
    router.push('/athletes');
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    },
    values: athlete
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
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} {...form.register('name')} />
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
