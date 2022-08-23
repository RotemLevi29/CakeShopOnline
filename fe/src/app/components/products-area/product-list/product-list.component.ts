import { ProductsService } from './../../../services/products.service';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

    public products: ProductModel[];
    public selectedCategoryName: string;
    public showCart: boolean;
    public showSerch: boolean;
    public values = '';
    private unsubscribeMe: Unsubscribe;




    constructor(private ngZone: NgZone, private myProductsService: ProductsService, private notify: NotifyService) { }

    async ngOnInit() {
        this.showCart = false;
        this.showSerch = false;
        this.selectedCategoryName = "";
        try {
            this.products = await this.myProductsService.getAllProducts();

            this.unsubscribeMe = store.subscribe(async () => {
                const products = await this.myProductsService.getAllProducts();
                console.log("this is procuts after redux subscribe:", products)
               
                this.ngZone.run( () => {
                    this.products = products;
                 });
                // this.products = products;
                console.log("this is this.products-this.products after redux subscribe:", this.products)
                // this.selectedCategoryName = "*";
                // this.selectedCategoryName = "";

            });
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    chooseCategory(selectedCategory: string) {
        // console.log(selectedCategory);
        this.selectedCategoryName = selectedCategory;
        this.showSerch = false;
        this.values = "";

    }

    onKey(event: any) { // without type info
        this.showSerch = true;
        this.values = event.target.value.toLowerCase();
    }

    filterSerch(str: string) {
        const regex = new RegExp(this.values);
        return regex.test(str.toLowerCase());
    }

    ngOnDestroy() {
        this.unsubscribeMe();

        // ...
      }

}
