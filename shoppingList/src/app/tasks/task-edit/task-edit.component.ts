import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Task } from '../task.model';
import { NgForm } from '@angular/forms';
import { TaskService } from '../task.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnInit {
  @ViewChild('f') taskForm!: NgForm;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Task;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.taskService.getTask(index);
      setTimeout(() => {
        this.taskForm.setValue({
          name: this.editedItem.task_name,
          description: this.editedItem.task_description,
        });
      }, 0);
    });
  }

  onAddTask(form: NgForm) {
    const value = form.value;
    const newTask = new Task(value.name, value.description);
    this.editMode
      ? this.taskService.updateTask(this.editedItemIndex, newTask)
      : this.taskService.addTask(newTask);
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.taskForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.taskService.deleteTask(this.editedItemIndex);
    this.onClear();
  }
}
