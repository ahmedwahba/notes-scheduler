export interface Note {
  id: number;
  title: string;
  startDate: number;
  endDate: number;
  labels: number[];
  summary: string;
  duration?: number;
}

export interface NoteLabel {
  id: number;
  text: string;
}

export interface NoteModalData {
  note: Note;
  categories: NoteLabel[];
}
