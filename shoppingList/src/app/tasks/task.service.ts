import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
type TaskResponse = {
  data: Task[];
};
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasksChanged = new Subject<Task[]>();
  tasks: Task[] = [];
  startedEditing = new Subject<number>();
  isOpen = new Subject<boolean>();
  Status = false;
  constructor(private http: HttpClient) {}
  getTasks() {
    this.http
      .get<TaskResponse>('api/taskuser/user')
      .subscribe((tasks: TaskResponse) => {
        this.tasks = tasks.data;
        this.tasksChanged.next(this.tasks.slice());
      });
  }

  getTask(index: number) {
    return this.tasks[index];
  }

  fetchTask(id: number) {
    return this.http.get<Task>(`api/task/${id}`).subscribe((task: Task) => {
      console.log(task);
    });
  }

  addTask(task: Task) {
    this.http
      .post<Task>('api/taskuser', task)
      .subscribe((id: { messages: { id: number } } | any) => {
        task = {
          ...task,
          id: id.data.id,
        };
        this.tasks.push(task);
        this.tasksChanged.next(this.tasks.slice());
      });
  }

  updateTask(index: number, newTask: Task) {
    this.http
      .put<Task>(`api/taskuser/${this.tasks[index].id}`, newTask)
      .subscribe(() => {
        this.tasks[index] = {
          ...newTask,
          id: this.tasks[index].id,
        };
        this.tasksChanged.next(this.tasks.slice());
      });
  }

  deleteTask(index: number) {
    this.http
      .delete<Task>(`api/taskuser/${this.tasks[index].id}`)
      .subscribe(() => {
        this.tasks.splice(index, 1);
        this.tasksChanged.next(this.tasks.slice());
      });
  }

  updateOpenStatus() {
    this.Status = !this.Status;
    this.isOpen.next(this.Status);
  }
}
