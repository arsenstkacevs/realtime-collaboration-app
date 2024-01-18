import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { File, Collaborator } from '../../../../models/models';

@Component({
  selector: '[app-table-row]',
  standalone: true,
  imports: [CommonModule],
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
