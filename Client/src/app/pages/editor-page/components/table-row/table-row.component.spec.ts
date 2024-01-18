import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowComponent } from './table-row.component';

describe('TableRowComponent', () => {
  let component: TableRowComponent;
  let fixture: ComponentFixture<TableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableRowComponent);
    component = fixture.componentInstance;
    component.file = {
      fileName: 'File1.json',
      content: 'Car: BMW',
      editDate: '2024-01-01 12:00:00',
      editAuthor: 'Bob',
      collaborators: [{ userName: 'Bob', connectionId: '1234567890' }],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
