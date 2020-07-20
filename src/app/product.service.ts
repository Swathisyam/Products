import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProducts(){
    return this.http.get("http://localhost:3000/products")
  }
  newProduct(item)
  {
    return this.http.post("http://localhost:3000/insert",{"product":item})
    .subscribe(data =>{console.log(data)})
  }
  delProduct(_id:string){
    return this.http.post("http://localhost:3000/delete",{"id":_id} )
    // .subscribe(data =>{console.log(data)})
  }
  // updatedProduct(_id:string){
  //   console.log('reached here');
  //   return this.http.post("http://localhost:3000/edit",{"id":_id})
  // }
  EditProduct(ProID,editedItem){

    return this.http.post("http://localhost:3000/edit",{"product":editedItem,"ID":ProID})
    .subscribe((data)=>{console.log(data)})
    
   }
  
  Updatedget(ID){
    
    console.log(ID)
    return this.http.post("http://localhost:3000/editedList",{"ID":ID})
    
  }
    }

