export interface File {
  fileName: string;
  content: string;
  editDate: string;
  editAuthor: string;
  collaborators: { userName: string; connectionId: string }[];
}
