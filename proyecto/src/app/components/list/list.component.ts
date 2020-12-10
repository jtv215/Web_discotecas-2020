import { AlertMenssageComponent } from './../alert-menssage/alert-menssage.component';
import { ListEditComponent } from './../list-edit/list-edit.component';
import { ListAddComponent } from './../list-add/list-add.component';
import { List } from './../../models/list';
import { ListService } from './../../services/list.service';
import { GLOBAL } from './../../services/global';
import { EstablishmentService } from './../../services/establishment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Establishment } from 'src/app/models/establishment';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public establishments: Establishment[];
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public lists: List[];
  public list: List;
  public aux:List;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _establishmentService: EstablishmentService,
    private _listService: ListService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.identity = this._establishmentService.getIdentity();
    this.token = this._establishmentService.getToken();
    this.url = GLOBAL.url;
    this.list = new List("", "", "");
    
  }

  ngOnInit() {
    this.getLists();
  }



  getLists() {
    this._listService.getLists(this.identity._id).subscribe(
      response => {
        if (!response.lists) {
          this.alertMessage = "Error en el servidor222";
        } else {
          this.lists = response.lists;
        }
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          this.alertMessage = error.error.message;
          console.log(error);
        }
      }
    );

  }

  goPlay(list) {
    let idList = list["_id"];
    this._router.navigate(['/play/',idList]);
  }



  openDialog(): void {
    let list = new List("", "", "");
    let id = this.identity._id;
    list.establishment = id;

    const dialogRef = this.dialog.open(ListAddComponent, {
      width: '250px',
      data: list
    });

    dialogRef.afterClosed().subscribe(result => {
     
      if(result ==null){
       // console.log('no tiene nada');
      }else{
        this.addList(list);
      }

    });
  }


  addList(list) {

    this._listService.addList(list).subscribe(
      response => {

        if (!response.list) {
          this.alertMessage = "Error en el servidor";
        } else {
      
          let message = "La lista se ha añadido correctamente";
          this._snackBar.openFromComponent(AlertMenssageComponent, {
            duration: 1500,
            data: message
          });
          this.getLists();
        }
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          this.alertMessage = error.error.message;
          console.log(error);

        }
      }
    );

  }


  openDialogEdit(id): void {  

    this._listService.getList(id).subscribe(
      response => {
        if (!response.list) {
          this.alertMessage = "Error en el servidor";
        } else {          
         this.aux= response.list;

         //**cuador de dialogo**//
         const dialogRef = this.dialog.open(ListEditComponent, {
          width: '250px',
          data: this.aux
        });
    
        dialogRef.afterClosed().subscribe(result => {  
          this.aux.name=result;
          this.udpateList(this.aux);    
        });
        }
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          this.alertMessage = error.error.message;
          console.log(error);
        }
      }
    );   
   
  }


  udpateList(aux){
    this._listService.udpateList(aux).subscribe(
      response => {
        if (!response.list) {
          this.alertMessage = "Error en el servidor";
        } else {          
        this.getLists();        
        }
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          this.alertMessage = error.error.message;
          console.log(error);
        }
      }
    );

  }



  onDelete(id) {
    this._listService.deleteList(this.token, id).subscribe(
      response => {
        if (!response.list) {
          alert("Error al borrar mensaje")
        } else {
          this.getLists()
          let message = "¡La playList se ha eliminado!";
          this._snackBar.openFromComponent(AlertMenssageComponent, {
            duration: 1500,
            data: message
          });
        }
      }
    );

  }

}

  




