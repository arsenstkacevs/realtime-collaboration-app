import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { tableHeadTitles } from '../../../../models/models';

@Component({
  selector: '[app-table-head]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-head.component.html',
  styleUrl: './table-head.component.scss',
})
export class TableHeadComponent {
  tableHeadTitles = tableHeadTitles;
}
