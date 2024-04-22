import { Component, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit{
  
  selectedDate: string = '';
  taskToEdit: any;
  taskName: string = '';
  date: string = '';
  @Output() formSubmitted = new EventEmitter<{ taskName: string, date: string, isCompleted: boolean }>();

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>, 
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.selectedDate = this.data.selectedDate;
    this.taskToEdit = this.data.taskToEdit;
    if (this.taskToEdit) {
      this.taskName = this.taskToEdit.taskName; // Assign taskName if taskToEdit exists
      this.date = this.taskToEdit.date; // Assign date if taskToEdit exists
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const taskName = form.value.task;
      const date = form.value.date || '';
      if (this.data.taskToEdit) {
        this.data.taskToEdit.taskName = taskName;
        this.data.taskToEdit.date = date;
      } else {
        this.taskService.addTask({ taskName, date, isCompleted: false });
      }
      this.dialogRef.close({updatedTaskArray: this.taskService.taskArray});
      // this.taskService.addTask({ taskName, date, isCompleted: false });
      // console.log(this.taskService.taskArray);
      // this.dialogRef.close({updatedTaskArray: this.taskService.taskArray});
      // form.resetForm();
  }
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