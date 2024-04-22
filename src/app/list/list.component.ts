import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  taskArray = [{ taskName: 'go to GYM', date: '', isCompleted: false }];
  selectedDate: string;
  filteredTasks: any[];
  completedTasksCount: number = 0;
  notCompletedTasksCount: number = 0;
  allTasks: number = 0;
  editedTaskName: string = '';
  editingIndex: number | null = null;

  constructor(private taskService: TaskService, private dialog:MatDialog) {
    // Initialize selectedDate if needed
    this.selectedDate = new Date().toISOString().split('T')[0];
    this.filteredTasks = [...this.taskArray];
    this.updateTaskCounts();
    this.taskArray;
    console.log(this.taskArray);
  }

  ngOnInit(): void {
    this.selectedDate = new Date().toISOString().split('T')[0];
    this.updateTaskCounts();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px',
      data: { selectedDate: this.selectedDate,
              taskArray: this.taskArray
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.taskArray = result.updatedTaskArray;
      this.filteredTasks = [...this.taskArray];
      this.updateTaskCounts;
    });
  }

  onEditPopup(task: any) {
    // Open the popup menu for editing the task
    const dialogRef = this.dialog.open(PopupComponent, {
        width: '250px',
        data: {
            selectedDate: this.selectedDate,
            taskToEdit: task // Pass the task data to the popup component
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result) {
          
        }
    });
}

  updateTaskCounts() {
    this.completedTasksCount = this.taskArray.filter(task => task.isCompleted).length;
    this.notCompletedTasksCount = this.taskArray.filter(task => !task.isCompleted).length;
    this.allTasks = this.completedTasksCount + this.notCompletedTasksCount;
  }

  filterTasks(status: string) {
    this.filteredTasks = this.taskService.filterTasks(this.taskArray, status);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const taskName = form.value.task;
      const date = form.value.date || '';
      this.taskService.addTask({ taskName, date, isCompleted: false});
      form.resetForm();
    }
  }
  // onSubmit(form: NgForm) {
  //   console.log(form);
  //   const taskName = form.controls['task'].value;
  //   const date = form.controls['date'].value || '';

  //   this.taskArray.push({
  //     taskName: form.controls['task'].value,
  //     date: form.controls['date'].value,
  //     isCompleted: false
  //   })
  //   this.filteredTasks = [...this.taskArray];
  //   this.updateTaskCounts();
  //   form.reset();
  // }

  onDelete(index: number) {
    this.taskArray.splice(index, 1);
    this.filteredTasks.splice(index, 1);
    this.updateTaskCounts();
  }

  onCheck(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    this.updateTaskCounts();
  }

  onEdit(index: number) {
    this.editingIndex = index;
    this.editedTaskName = this.taskArray[index].taskName;
  }

  onSaveEdit(task: any, index: number) {
    if (this.editingIndex !== null) {
      this.editingIndex = null;
      this.editedTaskName = '';
    }
  }

  onCancelEdit() {
    this.editingIndex = null; // Reset editingIndex
    this.editedTaskName = ''; // Reset editedTaskName
  }

  toggleDatePicker() {
    const datePicker = document.getElementById('datePicker');
    if (datePicker) {
      if (datePicker.style.display === 'none') {
        datePicker.style.display = 'block';
      } else {
        datePicker.style.display = 'none';
      }
    }
  }

}