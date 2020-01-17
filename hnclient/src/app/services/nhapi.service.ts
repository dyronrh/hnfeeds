import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Story } from '../model/story';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NhapiService {
  private SERVER_URL = "http://127.0.0.1:3000";
  constructor(private httpClient: HttpClient) { }

  public getHNList(){  
		return this.httpClient.get<Story[]>(this.SERVER_URL+'/hnstorys/list');  
  } 

  public getRefreshHNList(){  
		return this.httpClient.get<Story[]>(this.SERVER_URL+'/hnstorys/refresh');  
  } 
  public deleteteFromHNList(id){  
		return this.httpClient.delete(this.SERVER_URL+'/hnstorys/'+id+'/delete');  
  } 
  
}
