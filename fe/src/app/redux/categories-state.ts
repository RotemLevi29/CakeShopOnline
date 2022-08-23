import CategoryModel from 'src/app/models/category.model';

// Categories State: 
export class CategoriesState {
    public categories: CategoryModel[] = [];
}

// Category Action Types:
export enum CategoryActionType {
    categoriesDownloaded = "categoriesDownloaded",
    categoryAdded = "categoryAdded",
    categoryUpdated = "categoryUpdated",
    categoryDeleted = "categoryDeleted"
}

// Category Action: 
export interface CategoryAction {
    type: CategoryActionType;
    payload: any;
    // More specific type list:
    // payload: CategoryModel[] | CategoryModel | number;
}

// Category Action Creators: 
export function categoriesDownloadedAction(categories: CategoryModel[]): CategoryAction {
    return { type: CategoryActionType.categoriesDownloaded, payload: categories };
}
export function categoryAddedAction(category: CategoryModel): CategoryAction {
    return { type: CategoryActionType.categoryAdded, payload: category };
}
export function categoryUpdatedAction(category: CategoryModel): CategoryAction {
    return { type: CategoryActionType.categoryUpdated, payload: category };
}
export function categoryDeletedAction(id: string): CategoryAction {
    return { type: CategoryActionType.categoryDeleted, payload: id };
}

// Categories Reducer:
export function categoriesReducer(currentState: CategoriesState = new CategoriesState(), action: CategoryAction): CategoriesState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case CategoryActionType.categoriesDownloaded: // Here payload is all categories (CategoryModel[])
            newState.categories = action.payload;
            break;
        case CategoryActionType.categoryAdded: // Here payload is the added category (CategoryModel)
            newState.categories.push(action.payload);
            break;
        case CategoryActionType.categoryUpdated: { // Here payload is the updated category (CategoryModel)
            const index = newState.categories.findIndex(p => p.id === action.payload.id);
            newState.categories[index] = action.payload;
            break;
        }
        case CategoryActionType.categoryDeleted: { // Here payload is the deleted category's id (number)
            const index = newState.categories.findIndex(p => p.id === action.payload);
            newState.categories.splice(index, 1);
            break;
        }
    }

    return newState;
}