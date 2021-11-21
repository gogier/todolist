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