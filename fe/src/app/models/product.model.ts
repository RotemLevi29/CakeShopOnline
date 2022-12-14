class ProductModel {

    public id: string;
    public name: string;
    public categoryId: string;
    public price: number;
    // public stock?: number;
    public imageName: string;
    public category: {
        name: string;
    };
    public image: FileList;

    public static convertToFormData(product: ProductModel): FormData {
        const myFormData = new FormData();
        myFormData.append("name", product.name);
        myFormData.append("categoryId", product.categoryId);
        myFormData.append("price", product.price.toString());
        // myFormData.append("stock", product.stock.toString());
        if(product.image) myFormData.append("image", product.image.item(0));
        return myFormData;
    }

}

export default ProductModel;