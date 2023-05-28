import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasksChanged = new Subject<Task[]>();
  tasks: Task[] = [];
  startedEditing = new Subject<number>();
  constructor(private http: HttpClient) {}

  getTasks() {
    this.http.get<Task[]>('api/task').subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.tasksChanged.next(this.tasks.slice());
    });
  }

  getTask(index: number) {
    return this.tasks[index];
  }

  addTask(task: Task) {
    this.http.post<Task>('api/task', task).subscribe(() => {
      this.tasks.push(task);
      this.tasksChanged.next(this.tasks.slice());
    });
  }

  updateTask(index: number, newTask: Task) {
    this.http
      .put<Task>(`api/task/${this.tasks[index].id}`, newTask)
      .subscribe(() => {
        this.tasks[index] = newTask;
        this.tasksChanged.next(this.tasks.slice());
      });
  }

  deleteTask(index: number) {
    this.http.delete<Task>(`api/task/${this.tasks[index].id}`).subscribe(() => {
      this.tasks.splice(index, 1);
      this.tasksChanged.next(this.tasks.slice());
    });
  }
}
