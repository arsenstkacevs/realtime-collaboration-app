import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private hubUrl = 'http://localhost:5000/editor';

  public connection: HubConnection = new HubConnectionBuilder()
    .withUrl(this.hubUrl)
    .configureLogging(LogLevel.Information)
    .build();

  constructor() {
    this.startConnection();
  }

  private startConnection() {
    this.connection
      .start()
      .then(() => this.connection.invoke('SendFileStates'))
      .catch((error) =>
        console.error('Error starting SignalR connection:', error)
      );
  }

  addFileToGroup(fileName: string, userName: string): void {
    this.connection.invoke('JoinFileGroup', fileName, userName);
  }

  removeFileFromGroup(fileName: string, userName: string) {
    this.connection.invoke('LeaveFileGroup', fileName, userName);
  }

  updateFile(fileName: string, content: string, userName: string): void {
    this.connection.invoke('UpdateFileContent', fileName, content, userName);
  }
}
