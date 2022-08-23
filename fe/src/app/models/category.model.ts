class CategoryModel {

    public id: string;
    public name: string;
    public description?: string;
   
    public products?: {
            id?: string;
            name?: string;
            price?: number;
            // stock?: number;
            imageName?: string;
            image?: FileList;
    };

     public static convertToFormData(category: CategoryModel): FormData {
        const myFormData = new FormData();
        myFormData.append("name", category.name);
        myFormData.append("description", category.description);
        myFormData.append("products", category.products.toString());
        return myFormData;
    }

}

export default CategoryModel;