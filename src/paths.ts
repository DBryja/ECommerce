const paths = {
    home() { return "/"},
    admin() { return "/admin/dashboard"},
    adminProducts() { return "/admin/dashboard/products"},
    adminProductsAdd() { return "/admin/dashboard/products/add"},
    manageCategories() { return "/admin/dashboard/products/manageCategories"},
    singleProduct(id: number) { return `shop/product/${id}`},
}

export default paths;