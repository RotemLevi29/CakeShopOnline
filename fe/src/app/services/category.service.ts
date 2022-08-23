import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import CategoryModel from '../models/category.model';
import ProductModel from '../models/product.model';
import { categoryAddedAction, categoryDeletedAction, categoriesDownloadedAction, categoryUpdatedAction } from '../redux/categories-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    static getAggProductsBySupplier(): any[] | PromiseLike<any[]> {
        throw new Error('Method not implemented.');
    }

    constructor(private http: HttpClient) { }

    // Get all categories: 
    public async getAllCategories() {
        if (store.getState().categoriesState.categories.length === 0) {
            const categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
            store.dispatch(categoriesDownloadedAction(categories));
        }
        return store.getState().categoriesState.categories;
    }

    // Get all categories: 
    public async getFillteredCategory(catergory: string, min: number, max: number) {
        const products = await this.http.get<ProductModel[]>(environment.categoriesUrl + `${catergory}/${min}/${max}`).toPromise();
        return products;
    }

    // Get one category: 
    public async getOneCategory(id: string) {
        if (store.getState().categoriesState.categories.length === 0) {
            const categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
            store.dispatch(categoriesDownloadedAction(categories));
        }
        const category = store.getState().categoriesState.categories.find(p => p.id === id);
        return category;
    }

    // Add category: 
    public async addCategory(category: CategoryModel) {
        const myFormData: FormData = CategoryModel.convertToFormData(category);
        const addedCategory = await this.http.post<CategoryModel>(environment.categoriesUrl, myFormData).toPromise();
        store.dispatch(categoryAddedAction(addedCategory));
        return addedCategory;
    }

    // Update category: 
    public async updateCategory(category: CategoryModel) {
        const myFormData: FormData = CategoryModel.convertToFormData(category);
        const updatedCategory = await this.http.put<CategoryModel>(environment.categoriesUrl + category.id, myFormData).toPromise();
        store.dispatch(categoryUpdatedAction(updatedCategory));
        return updatedCategory;
    }

    // Delete category: 
    public async deleteCategory(id: string) {
        await this.http.delete(environment.categoriesUrl + id).toPromise();
        store.dispatch(categoryDeletedAction(id));
    }

    // Get aoo categories (count num of products in category with GroupBy method): 
    public async getAggProductsByCategories() {
        const aggProcuts = await this.http.get<any[]>(environment.categoriesUrl + "products/agg").toPromise();
        return aggProcuts;
    }
    // Get aoo categories (count num of products for supplier with GroupBy method): 
    public async getAggProductsBySupplier() {
        const aggProcuts = await this.http.get<any[]>(environment.categoriesUrl + "products/agg-supllier").toPromise();
        return aggProcuts;
    }

}
