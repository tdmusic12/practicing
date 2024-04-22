
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-time-greeting',
  templateUrl: './time-greeting.component.html',
  styleUrl: './time-greeting.component.css'
})
export class TimeGreetingComponent implements OnInit {
  @Input() greeting: string = '';
  @Input() currentTime: string = '';
  @Input() notCompletedTasksCount: number = 0;

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.updateTimeAndGreeting();
    }, 1000);
    this.updateTimeAndGreeting();
  }
  
  updateTimeAndGreeting(): void {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }

    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    this.currentTime = `${hour}:${minutes}:${seconds}`;
  }
}