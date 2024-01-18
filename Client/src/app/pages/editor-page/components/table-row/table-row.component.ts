import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { File } from '../../../../models/file';
import { Collaborator } from '../../../../models/collaborator';

@Component({
  selector: '[app-table-row]',
  standalone: true,
  imports: [CommonModule, CodemirrorModule],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss',
})
export class TableRowComponent {
  @Input() file: File;
  @Input() collaborators: Collaborator[];
  @Input() selectedFileName: string;
  @Output() onDeselect: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();
}
