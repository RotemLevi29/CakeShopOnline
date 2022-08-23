import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-products-card-admin',
  templateUrl: './products-card-admin.component.html',
  styleUrls: ['./products-card-admin.component.css']
})
export class ProductsCardAdminComponent implements OnInit {
  
  @Input()
  public product: ProductModel;
  
  public imageUrl = environment.productImagesUrl;
  constructor( 
    private notify: NotifyService,
    private myRouter: Router,
    private myProductsService: ProductsService) {
   }

  ngOnInit(): void {
   }
   
   public async delete() {
    try {
        const answer = confirm("Are you sure?");
        if (!answer) return;
        await this.myProductsService.deleteProduct(this.product.id);
        this.notify.success("Product has been deleted.")
        this.myRouter.navigateByUrl("/products");
    }
    catch (err) {
        this.notify.error(err);
    }
}
}
