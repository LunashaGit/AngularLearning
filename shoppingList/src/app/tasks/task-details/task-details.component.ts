import { Component, Directive, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  isOpen: boolean = false;
  editedItem!: Task | undefined;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.isOpen.subscribe((isOpen: boolean) => {
      this.isOpen = isOpen;
    });
    this.taskService.startedEditing.subscribe((index: number) => {
      this.editedItem = this.taskService.getTask(index);
    });
  }

  ngOnDestroy() {
    this.taskService.isOpen.unsubscribe();
    this.taskService.startedEditing.unsubscribe();
  }

  onClose() {
    this.taskService.updateOpenStatus();
    this.editedItem = undefined;
  }
}
