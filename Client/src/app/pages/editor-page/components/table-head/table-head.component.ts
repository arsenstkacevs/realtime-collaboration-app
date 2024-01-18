import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: '[app-table-head]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-head.component.html',
  styleUrl: './table-head.component.scss',
})
export class TableHeadComponent {
  @Input() tableHeadTitles: string[];
}
