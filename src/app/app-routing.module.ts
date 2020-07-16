import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './auth.guard';
import { EditProductComponent } from './edit-product/edit-product.component'

const routes: Routes = [
  // {
  //   path:'add',
  //   redirectTo:'/login',
  //   pathMatch:'full'
  // },
  {
    path:"",
    component:ProductListComponent,
    
  },
  {
    path:"add",
    component:NewProductComponent,
    // canActivate:[AuthGuard]
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'edit',
    component:EditProductComponent

  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
