import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  aform: any;

  constructor() {
    this.aform = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      location: new FormControl(),
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
