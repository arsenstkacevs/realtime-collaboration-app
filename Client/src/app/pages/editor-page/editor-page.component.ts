import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { Collaborator } from '../../models/collaborator';
import { EditorService } from '../../services/editor-service/editor.service';
import { FileDownloadService } from '../../services/file-download-service/file-download.service';
import { File } from '../../models/file';
import { TableRowComponent } from './components/table-row/table-row.component';
import { UserComponent } from './components/user/user.component';
import { TableHeadComponent } from './components/table-head/table-head.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';

@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [
    CodemirrorModule,
    FormsModule,
    CommonModule,
    TableRowComponent,
    UserComponent,
    TableHeadComponent,
    CollaboratorsComponent,
  ],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss',
})
export class EditorPageComponent {
  files: File[];
  selectedFileName: string;
  fileContent: string;
  userName: string;
  collaborators: Collaborator[];
  tableHeadTitles: string[] = ['File name', 'Last changed', ''];

  constructor(
    private editorService: EditorService,
    private fileDownloadService: FileDownloadService
  ) {
    this.editorService.connection.on(
      'FileUpdated',
      (fileName: string, content: string) => {
        if (this.selectedFileName === fileName) {
          this.fileContent = content;
        }
      }
    );

    this.editorService.connection.on(
      'ReceiveFileStates',
      (fileStates: File[]) => {
        this.files = fileStates;
      }
    );

    this.editorService.connection.on(
      'UserLeft',
      (collaborators: Collaborator[]) => {
        this.collaborators = collaborators;
      }
    );

    this.editorService.connection.on(
      'UserJoined',
      (collaborators: Collaborator[]) => {
        this.collaborators = collaborators;
      }
    );
  }

  ngOnInit(): void {
    const randomNr = Math.floor(Math.random() * 1000000 + 1);
    this.userName = `Guest_${randomNr}`;
  }

  changeUserName(userName: string): void {
    this.userName = userName;
  }

  updateFileContent(): void {
    this.editorService.updateFile(
      this.selectedFileName,
      this.fileContent,
      this.userName
    );
  }

  loadFileContent() {
    this.files.some((file) => {
      if (file.fileName === this.selectedFileName) {
        this.fileContent = file.content;
      }
    });
  }

  selectFile(fileName: string): void {
    if (this.selectedFileName) {
      this.deselectFile(this.selectedFileName);
    }

    this.selectedFileName = fileName;
    this.editorService.addFileToGroup(this.selectedFileName, this.userName);
    this.editorService.connection.invoke('SendFileStates').then(() => {
      this.loadFileContent();
    });
  }

  deselectFile(fileName: string) {
    this.editorService.removeFileFromGroup(fileName, this.userName);
    this.selectedFileName = '';
  }

  downloadJson(): void {
    const jsonData = this.fileContent;
    this.fileDownloadService.downloadFile(jsonData, this.selectedFileName);
  }
}
