import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks!: Task[];
  private subscription!: Subscription;
  isOpen = false;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks();
    this.subscription = this.taskService.tasksChanged.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(id: number): void {
    this.taskService.startedEditing.next(id);
  }

  onClick(id: number): void {
    this.taskService.fetchTask(id);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
