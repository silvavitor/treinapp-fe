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

export type ExerciseSets = {
  id: string,
  setNumber: number,
  reps: number,
  weight: number,
  athletesId: string,
  exercisesId: string,
  trainingExecutionId: string,
  createdAt: Date,
  updatedAt: Date
}

export type TrainingExecution = {
  id: string,
  trainingId: string,
  createdAt: Date,
  updatedAt: Date,
  training: {
    name: string
  },
  exercises_sets: ExerciseSets[]
  _count: {
    exercises_sets: 4
  }
}