export interface File {
  fileName: string;
  content: string;
  editDate: string;
  editAuthor: string;
  collaborators: { userName: string; connectionId: string }[];
}

export interface Collaborator {
  userName: string;
  connectionId: string;
}

export const tableHeadTitles = ['File name', 'Last changed', ''];
