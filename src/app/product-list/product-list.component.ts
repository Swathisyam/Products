import { Component, OnInit } from '@angular/core';
import { ProductModel } from './product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http'
// import { Router } from '@angular/router';
// import { NgForm } from '@angular/forms';
// import { Headers}
// import 'rxjs/add/operator/toPromise()';
// import {rxjs} from


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title:String = "Product List";
  //Product is the model class for a product item
  products:ProductModel[];
  //image properties
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  
  //creating service object for calling getProducts()

  constructor( private productService: ProductService, private router: Router) { }
  id:number;
  productItem = new ProductModel(null,null,null,null,null,null,null,null)
  // private headers = new Headers({})

  
  toggleImage():void{
    this.showImage = !this.showImage;
  }

  RemoveProduct(_id1){
    if(confirm("Are you sure want to delete??") == true){
      console.log("called");
      console.log(_id1);
      alert("Removed Succesfully");
      this.productService.delProduct(_id1).subscribe();
      this.productService.getProducts().subscribe((data)=>{
      this.products = JSON.parse(JSON.stringify(data));
      this.router.navigate(['/']);
      })
    }
  }
  EditProduct(_id){
    if(confirm("Dou you want to continue??") == true){
      console.log("called function edit");
      console.log(_id);
      this.productService.updatedProduct(_id).subscribe();
      this.productService.newProduct(_id)
      // .unsubscribe()
      this.router.navigate(['/edit']);
    }
  }
  
  ngOnInit(): void {

    this.productService.getProducts()
    .subscribe((data)=>{
      this.products = JSON.parse(JSON.stringify(data));
    })
  }
}


  
