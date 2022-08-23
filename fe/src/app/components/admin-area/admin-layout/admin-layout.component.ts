import { ProductsService } from './../../../services/products.service';
import { Component, OnInit, ComponentFactoryResolver, OnDestroy, NgZone } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import store from 'src/app/redux/store';
import { Unsubscribe } from 'redux';


@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {


    public products: ProductModel[];

    public presentAddProduct: boolean;
    public presentEditProduct: boolean;
    public selectedCategoryName: string;
    public productEditId: string;
    private unsubscribeMe: Unsubscribe;


    constructor(private ngZone: NgZone, private myProductsService: ProductsService, private notify: NotifyService, private componentFactoryResolver: ComponentFactoryResolver) { }

    async ngOnInit() {

        this.selectedCategoryName = "";
        this.presentAddProduct = false;
        this.presentEditProduct = false;
        this.productEditId = "";

        try {
            this.products = await this.myProductsService.getAllProducts();
            this.unsubscribeMe = store.subscribe(async () => {
                const products = await this.myProductsService.getAllProducts();
                console.log("this is procuts after redux subscribe:", products)
                this.ngZone.run(() => {
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

    }
    closeAddProduct(close: boolean) {
        if (close) {
            this.presentAddProduct = false;
        }
    }

    showAddProduct() {
        this.presentAddProduct = true;
    }


    ngOnDestroy() {
        this.unsubscribeMe();

        // ...
    }

}
