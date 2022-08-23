import { ProductsService } from './../../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import CategoryModel from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/category.service';


@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

    // We must create an empty object for the Two-Way Binding:
    public product = new ProductModel();
    public imageVisited: boolean;
    @Output() endOfProcess = new EventEmitter<boolean>();
    public categories: CategoryModel[];



    constructor(
        private myProductsService: ProductsService,
        private myCategoriesService: CategoriesService,
        private myRouter: Router,
        private notify: NotifyService) { }


      async ngOnInit() {

        try {
            this.categories = await this.myCategoriesService.getAllCategories();
            console.log(this.categories);
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    public saveImage(args: Event): void {
        this.product.image = (args.target as HTMLInputElement).files;
    }

    public imageBlur(): void {
        this.imageVisited = true;
    }

    public async send() {
        try {
            console.log(this.product);
            await this.myProductsService.addProduct(this.product);
            this.notify.success("Product has been added.");
            this.endOfProcess.emit(true);
            // this.myRouter.navigateByUrl("/admin");
        }
        catch(err) {
            this.notify.error(err);
        }
    }
    
}
