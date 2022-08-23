import { Component, OnDestroy, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';
import { ProductsService } from './../../../services/products.service';
import { CategoriesService } from './../../../services/category.service';
import CategoryModel from 'src/app/models/category.model';
import { NotifyService } from 'src/app/services/notify.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    public categories: CategoryModel[];

    constructor(private myCategoriesService: CategoriesService, private notify: NotifyService) { }
    @Output() 
    selectCategoryEvent = new EventEmitter<string>();


    async ngOnInit() {

        try {
            this.categories = await this.myCategoriesService.getAllCategories();
            console.log(this.categories);
        }
        catch (err) {
            this.notify.error(err);
        }
    }


    sendCategoryName(value: string) {
        this.selectCategoryEvent.emit(value);
    }

    // public isAdmin: boolean;

    // private unsubscribeMe: Unsubscribe;

    // ngOnInit(): void {
    //     this.unsubscribeMe = store.subscribe(() => {
    //         this.isAdmin = store.getState().authState.user?.isAdmin;
    //     });
    // }

    // ngOnDestroy(): void {
    //     this.unsubscribeMe();
    // }

}
