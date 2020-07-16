import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ProductModel } from '../product-list/product.model';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  title: String = "Update Product";

  constructor(private productService: ProductService, private router: Router) { }
  productItem = new ProductModel(null,null,null,null,null,null,null,null);

  ngOnInit(): void {
  }
  UpdateProduct(productItem){
    this.productService.updatedProduct(productItem);
    console.log("called");
    alert("Updated Succesfully");
    this.productService.getProducts().subscribe();
    this.router.navigate(['/']);
  }
}
