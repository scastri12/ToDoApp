import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './../../models/task.model'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear componentes',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Hacer un if ; else en mi codigo',
      completed: false,
    },
   
  ]);

  taskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ],
  });

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    };
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    };
    return tasks;
  });

  changeByFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }

  insertTask(){
    if (this.taskCtrl.valid) {
      const newTask = this.taskCtrl.value.trim();
      if (newTask !== "") {
        this.addTask(newTask);
        this.taskCtrl.setValue("");
      }
    }
  }
  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
    
  }

  addTask(title: string){
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  updateTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task, 
            completed: !task.completed
          }
        }
        return task
      })
    });
  }

  activeEditing(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task, 
            editing: true,
          }
        }
        return {
          ...task,
          editing: false,
        }
      })
    });
  }

  sendEditing(event: Event, index: number){
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task, 
            title: input.value,
            editing: false,
          }
        }
        return task
      })
    });

  }

  clearCompletedTasks(){
    this.tasks.update((tasks) => tasks.filter((task) => task.completed === false));
  }

}
