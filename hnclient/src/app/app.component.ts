import { Component, OnInit, ViewChild } from '@angular/core';
import { NhapiService } from './services/nhapi.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ActivatedRoute, Router } from '@angular/router';
import { Story } from '../app/model/story';
import Swal from 'sweetalert2'
import { HttpResponse } from '@angular/common/http';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'hnclient';
  HOME: string = "home";
  displayedColumns = ['title', 'author', 'created','operations'];
dataSource: any=[];
private loadingSubject = new BehaviorSubject<boolean>(false);

public loading$ = this.loadingSubject.asObservable();
@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
@ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(private apiService: NhapiService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.renderDataTable(); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
 
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
}
deleteStorys(id){
  Swal.clickConfirm()
 // let  snackBarRef  =  this.snackBar.open(`Deleting customer #${id}`);

 Swal.fire({
  title: 'Seguro desea eliminar este articulo?',
  text: "Una vez eliminado no podra visualizarlo nuevamente!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminarlo!'
}).then((result) => {
  if (result.value) {

    this.apiService.deleteteFromHNList(id).subscribe((res: HttpResponse<any>) => {
      this.refreshList()
      window.location.reload()
      this.router.navigate(['/home']);
        }  ,
error =>{
})
    this.refreshList()
    console.log(id)

  }
})

}
refreshList(){
  this.apiService.getRefreshHNList().subscribe(res =>{
    console.log(res)
    window.location.reload()
    this.router.navigate(['/home']);

  })
  
}


goToLink(story: Story){
  console.log(story)
  if(story.url || story.story_url){
      if(story.url){
      window.open(story.url, "_blank");
      Toast.fire({
        icon: 'success',
        title: 'Será Redirigido a otra sitio'
      })
    }else{
      window.open(story.story_url, "_blank");
      Toast.fire({
        icon: 'success',
        title: 'Será Redirigido a otra sitio'
      })
    } 
  }else{
    Toast.fire({
      icon: 'error',
      title: 'Este articulo no tiene link'
    })
  }

 
}
renderDataTable() {  
  this.loadingSubject.next(true);
  this.apiService.getHNList()  
    .subscribe(  
        x => {  
  this.dataSource = new MatTableDataSource();  
  this.dataSource.data = x;  
  console.log(this.dataSource.data);
  this.loadingSubject.next(false);
},  
error => {  
  console.log('There was an error while retrieving Usuarios!' + error);  
});  
} 
}
