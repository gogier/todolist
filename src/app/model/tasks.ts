export interface Task {
  id: string;
  title: string;
  actor: string;
  description: string;
  category: string;
  estimate: string;
  status: string;
  order: number;
  creationDate: Date; //at creation
  updateDate: Date; //when updated
  startDate: Date; //when status to in progress
  endDate: Date; //when status to done
}

export interface TaskCreationRequest {
  title: string;
  actor: string;
  description: string;
  project: string;
  estimate: string;
}

export interface TaskOrderListRequest {
  taskIds: string[];
}

export interface TaskUpdateRequest {
  title?: string;
  actor?: string;
  description?: string;
  category?: string;
  estimate?: string;
}

export enum TaskStatus {
  ToDo = 'ToDo',
  InProgress = 'InProgress',
  Done = 'Done',
  ToArchive = 'toArchive',
  Archived = 'Archived'
}

