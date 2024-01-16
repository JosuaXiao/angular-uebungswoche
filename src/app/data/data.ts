export interface KanbanItem {
  id: number;
  Title: string;
  Description: string;
  tobeDone?: Date;
  assigned: string;
  prio: string;
  status: string;
}
