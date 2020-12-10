import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-menssage',
  templateUrl: './alert-menssage.component.html',
  styleUrls: ['./alert-menssage.component.css']
})
export class AlertMenssageComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { 
  }

  ngOnInit(): void {
  }

}
