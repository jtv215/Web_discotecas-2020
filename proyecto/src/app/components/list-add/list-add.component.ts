import { List } from './../../models/list';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.css']
})
export class ListAddComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: List) 
    {
      
     // console.log(this.data.name);

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }



}
