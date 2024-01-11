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
 
const formSchema = z.object({
  name: z.string().min(2, {message: "Nome tem que ter mais que 2 letras"}).max(50, {message: "Nome tem que ter no máximo 50 letras"}),
})

export default function Athlete() {
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch(`http://localhost:3000/athletes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name
      })
    });

    toast.success('Atleta criado com sucesso!');
    router.push('/athletes');
  }

  function handleBack() {
    router.push('/athletes');
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    },
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
            <Button type="submit">Criar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
