import { List } from './../../models/list';
import { ListAddComponent } from './../list-add/list-add.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ListAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: List) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


}
