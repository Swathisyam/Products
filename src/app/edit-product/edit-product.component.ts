import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ProductModel } from '../product-list/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  title: String = "Update Product";

  constructor(private productService: ProductService, private router: Router, private _route:ActivatedRoute) { }
  updatedItem= new ProductModel(null,null,null,null,null,null,null,null);


  ngOnInit(): void {
    let id=this._route.snapshot.paramMap.get("id")
    const ProID={id:id};
    this.productService.Updatedget(ProID)
    .subscribe((data)=>{this.updatedItem=JSON.parse(JSON.stringify(data)); })
    
  }
  UpdateProduct(){
    let id=this._route.snapshot.paramMap.get("id")
    const ProID={id:id};
    this.productService.EditProduct(ProID,this.updatedItem)
    
    alert('Updated successfully ');
    this.router.navigate(['/'])
  }
}
