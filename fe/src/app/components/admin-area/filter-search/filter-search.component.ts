import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import CategoryModel from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/category.service';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css']
})
export class FilterSearchComponent implements OnInit {


  // We must create an empty object for the Two-Way Binding:
  public filter: any = {};
  public imageVisited: boolean;
  @Output() endOfProcess = new EventEmitter<boolean>();
  public categories: CategoryModel[];
  public products: ProductModel[];




  constructor(
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


  public async send() {
    try {
      console.log(this.filter);
      console.log(this.filter.categoryId);
      console.log(this.filter.min);
      console.log(this.filter.max);
      this.products = await this.myCategoriesService.getFillteredCategory(this.filter.categoryId, this.filter.min, this.filter.max);
      // await this.myProductsService.addProduct(this.product);
      // this.notify.success("Product has been added.");
      // this.endOfProcess.emit(true);
      // this.myRouter.navigateByUrl("/admin");
    }
    catch (err) {
      this.notify.error(err);
    }
  }


}
