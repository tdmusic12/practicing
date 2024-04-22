import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  taskArray = [{ taskName: 'go to GYM', date: '', isCompleted: false }];

  constructor() {}

  addTask(task: any) {
    console.log('aabb', task);
    this.taskArray.push(task);
  }

  filterTasks(taskArray: any[], status: string): any[] {
    switch (status) {
      case 'all': { 
        return [...taskArray];
      }
      case 'completed': {
        return taskArray.filter(task => task.isCompleted);
      }
      case 'notCompleted': {
        return taskArray.filter(task => !task.isCompleted);
      }
      default: {
        return taskArray;
      }
    }
  }
}




