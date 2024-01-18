import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Collaborator } from '../../../../models/models';

@Component({
  selector: 'app-collaborators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.scss',
})
export class CollaboratorsComponent {
  @Input() collaborators: Collaborator[];
  @Input() userName: string;
}
