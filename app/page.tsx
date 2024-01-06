import Athletes from "@/components/pages/athletes";
import Exercises from "@/components/pages/exercises";
import Trainings from "@/components/pages/trainings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div>
      <header className="my-8">
        <Tabs defaultValue="trainings" className="w-full mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trainings">Treinos</TabsTrigger>
            <TabsTrigger value="exercises">Exercicios</TabsTrigger>
            <TabsTrigger value="athletes">Atletas</TabsTrigger>
          </TabsList>
          <TabsContent value="trainings">
            <Trainings />
          </TabsContent>
          <TabsContent value="exercises">
            <Exercises />
          </TabsContent>
          <TabsContent value="athletes">
            <Athletes />
          </TabsContent>
        </Tabs>
      </header>
    </div>
  );
}
