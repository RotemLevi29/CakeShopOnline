import { ProductsService } from './../../../services/products.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import CategoryModel from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/category.service';

// For working with Reactive Forms we need ReactiveFormsModule

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

    @Input()
    public productId: string;

    private product = new ProductModel();

    // FormGroup is an object representing the <form> element: 
    public productForm: FormGroup;

    // FormControl is an object representing an <input>/<select>/<textarea> element:
    public nameControl: FormControl;
    public priceControl: FormControl;
    // public stockControl: FormControl;
    public imageControl: FormControl;
    public categories: CategoryModel[];


    constructor(
        private myActivatedRoute: ActivatedRoute,
        private myProductsService: ProductsService,
        private myCategoriesService: CategoriesService,
        private notify: NotifyService,
        private myRouter: Router) {

        this.nameControl = new FormControl(null, Validators.required);
        this.priceControl = new FormControl(null, Validators.required);
        // this.stockControl = new FormControl(null, Validators.required);
        this.imageControl = new FormControl();
        this.productForm = new FormGroup({
            nameControl: this.nameControl,
            priceControl: this.priceControl,
            // stockControl: this.stockControl,
            imageControl: this.imageControl
        });
    }

    async ngOnInit() {
        try {
            this.product.id = this.myActivatedRoute.snapshot.params.id; // Take a route parameter named id.
            const product = await this.myProductsService.getOneProduct(this.product.id);
            console.log("this.productId; from update product component:", this.productId)
            console.log("product from update product component:", product)
            this.nameControl.setValue(product.name);
            this.priceControl.setValue(product.price);
            // this.stockControl.setValue(product.stock);
        }
        catch (err) {
            this.notify.error(err);
        }

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

    public async update() {
        try {
            this.product.name = this.nameControl.value;
            this.product.price = this.priceControl.value;
            // this.product.stock = this.stockControl.value;
            await this.myProductsService.updateProduct(this.product);
            this.notify.success("Product has been updated.");
            this.myRouter.navigateByUrl("/products");
        }
        catch(err) {
            this.notify.error(err);
        }
    }

}
