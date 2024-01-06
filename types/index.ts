export type Athlete = {
  id: string,
  name: string
}

export type Exercise = {
    id: string;
    name: string;
    sets_qtd: number,
    trainingId: string;
    createdAt: Date,
    updatedAt: Date,
    Training: {
      id: string,
      name: string,
      createdAt: Date,
      updatedAt: Date
  }
}

export type Training = {
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    athletes: Athlete[],
    exercises: Exercise[],
    _count: {
        exercises: number,
        athletes: number,
        TrainingExecution: number
    }
}