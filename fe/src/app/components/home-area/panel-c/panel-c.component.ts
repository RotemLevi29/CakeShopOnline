import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';



@Component({
  selector: 'app-panel-c',
  templateUrl: './panel-c.component.html',
  styleUrls: ['./panel-c.component.css']
})
export class PanelCComponent implements OnInit {

  public products: ProductModel[];
  public productsNum: number;

    constructor(private myProductsService: ProductsService, private notify: NotifyService) { }

    async ngOnInit() {
        try {
            this.products = await this.myProductsService.getAllProducts();
            this.productsNum = Object.keys(this.products).length;
        }
        catch (err) {
            this.notify.error(err);
        }
    }

}
