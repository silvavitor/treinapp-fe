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

export default function TrainingExecutionsEdit({ params }: TrainingExecutionsEditParams) {
  const [trainingExecution, setTrainingExecution] = useState<TrainingExecution>();
  const router = useRouter();
  const { id } = params;

  const fetchTrainingExecution = useCallback(async () => {
    const response = await fetch(`http://localhost:3000/training-executions/${id}`);
    const trainingExecutionJson: TrainingExecution = await response.json();

    setTrainingExecution(trainingExecutionJson);
  }, [id]);

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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Supino</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <span className="mr-2">1 -</span>
                    <div className="flex items-center">
                      <span className="mr-2">Reps:</span>
                      <Input placeholder="Repetições" {...field} {...form.register('name')} />
                      <span className="mx-2">Peso:</span>
                      <Input placeholder="Peso" {...field} {...form.register('name')} />
                    </div>
                  </div>
                </FormControl>
                <FormControl>
                  <div className="flex items-center">
                    <span className="mr-2">2 -</span>
                    <div className="flex items-center">
                      <span className="mr-2">Reps:</span>
                      <Input placeholder="Repetições" {...field} {...form.register('name')} />
                      <span className="mx-2">Peso:</span>
                      <Input placeholder="Peso" {...field} {...form.register('name')} />
                    </div>
                  </div>
                </FormControl>
                <FormControl>
                  <div className="flex items-center">
                    <span className="mr-2">3 -</span>
                    <div className="flex items-center">
                      <span className="mr-2">Reps:</span>
                      <Input placeholder="Repetições" {...field} {...form.register('name')} />
                      <span className="mx-2">Peso:</span>
                      <Input placeholder="Peso" {...field} {...form.register('name')} />
                    </div>
                  </div>
                </FormControl>
                <FormControl>
                  <div className="flex items-center">
                    <span className="mr-2">4 -</span>
                    <div className="flex items-center">
                      <span className="mr-2">Reps:</span>
                      <Input placeholder="Repetições" {...field} {...form.register('name')} />
                      <span className="mx-2">Peso:</span>
                      <Input placeholder="Peso" {...field} {...form.register('name')} />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Legpress</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <span className="mr-2">1 -</span>
                    <div className="flex items-center">
                      <span className="mr-2">Reps:</span>
                      <Input placeholder="Repetições" {...field} {...form.register('name')} />
                      <span className="mx-2">Peso:</span>
                      <Input placeholder="Peso" {...field} {...form.register('name')} />
                    </div>
                  </div>
                </FormControl>
                <FormControl>
                  <div className="flex items-center">
                    <span className="mr-2">2 -</span>
                    <div className="flex items-center">
                      <span className="mr-2">Reps:</span>
                      <Input placeholder="Repetições" {...field} {...form.register('name')} />
                      <span className="mx-2">Peso:</span>
                      <Input placeholder="Peso" {...field} {...form.register('name')} />
                    </div>
                  </div>
                </FormControl>
                <FormControl>
                  <div className="flex items-center">
                    <span className="mr-2">3 -</span>
                    <div className="flex items-center">
                      <span className="mr-2">Reps:</span>
                      <Input placeholder="Repetições" {...field} {...form.register('name')} />
                      <span className="mx-2">Peso:</span>
                      <Input placeholder="Peso" {...field} {...form.register('name')} />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
            />
          <div className="space-x-4">
            <Button variant="destructive" type="button" onClick={handleDelete}>Excluir</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
