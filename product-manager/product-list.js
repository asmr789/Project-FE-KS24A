let products = [
    {
        "product_code": "SP001",
        "product_name": "Iphone 12 Pro",
        "category_id": "DM001",
        "stock": "100",
        "price": "12.000.000 đ",
        "discount": "0 %",
        // "image": "https://example.com/image.jpg",
        "status": "ACTIVE",
        // "description": "Tảo nhập khẩu từ Mỹ",
        // "created_at": "2021-01-01T00:00:00Z"
    },
    {
        "product_code": "SP002",
        "product_name": "Samsung Galaxy X20",
        "category_id": "DM001",
        "stock": "100",
        "price": "21.000.000 đ",
        "discount": "5 %",
        // "image": "https://example.com/image.jpg",
        "status": "INACTIVE",
        // "description": "Cá chua nhập khẩu từ Hà Lan",
        // "created_at": "2021-01-01T00:00:00Z"
    },
    {
        "product_code": "SP003",
        "product_name": "Oppo Reno 5",
        "category_id": "DM001",
        "stock": "100",
        "price": "8.000.000 đ",
        "discount": "0 %",
        // "image": "https://example.com/image.jpg",
        "status": "ACTIVE",
        // "description": "Tảo nhập khẩu từ Mỹ",
        // "created_at": "2021-01-01T00:00:00Z"
    },
    {
        "product_code": "SP004",
        "product_name": "Xiaomi Mi 11",
        "category_id": "DM001",
        "stock": "100",
        "price": "10.000.000 đ",
        "discount": "0 %",
        // "image": "https://example.com/image.jpg",
        "status": "ACTIVE",
        // "description": "Tảo nhập khẩu từ Mỹ",
        // "created_at": "2021-01-01T00:00:00Z"
    }
];
// Save products to localStorage
window.localStorage.setItem("products", JSON.stringify(products));

let filteredProducts = [...products]; // Khởi tạo danh sách sản phẩm đã lọc bằng danh sách sản phẩm ban đầu
const tbodyEl = document.querySelector("tbody");
function renderProducts() {
    tbodyEl.innerHTML = filteredProducts.map(product => {
        const statusClass = product.status === "ACTIVE" ? "active" : "inactive";
        const statusText = product.status === "ACTIVE" ? "Đang hoạt động" : "Ngừng hoạt động";
        const realIndex = products.findIndex(pro => pro.product_code === product.product_code);
        return `
            <tr>
                <td>${product.product_code}</td>
                <td>${product.product_name}</td>
                <td>${product.stock}</td>
                <td>${product.price}</td>
                <td>${product.discount}</td>
                <td><span class="status ${statusClass}">●&nbsp;${statusText}</span></td>
                <td>
                    <button onclick="deleteProducts(${realIndex})" class="btn btn-link text-danger p-0" style="margin-right: 10px;"><i class="fa-solid fa-trash"></i></button>
                    <button class="btn btn-link text-warning p-0 me-2"><i class="fa-solid fa-pen"></i></button>
                </td>
            </tr>`;
    }).join("");
}
function deleteProducts(index) {
    const product = products[index];
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa danh mục "${product.product_name}" không`);

    if (confirmDelete) {
        products.splice(index, 1);
        filteredProducts = [...products]; // cập nhật danh sách hiển thị
        renderProducts();
        saveProductLocalStorage(); // lưu vào localStorage
        updatePagination();
    }
}


function saveProductLocalStorage() {
    window.localStorage.setItem("products", JSON.stringify(products));
}
// Lọc sản phẩm theo trạng thái ====================================================
const statusfilter = document.querySelector("#statusFilter"); 
statusfilter.addEventListener('change',(e) => {
    const status = e.target.value;
    if (status === "Tất cả" || status === "Lọc theo trạng thái") {
        filteredProducts = [...products];
    }
    else {
        const statusMap = {
            "Đang hoạt động": "ACTIVE",
            "Ngừng hoạt động": "INACTIVE"
        };
        filteredProducts = products.filter(cat => cat.status === statusMap[status]);
    }
    renderProducts();
});

// Tìm kiếm sản phẩm ====================================================
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();

    filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchValue)
    );
    renderProducts();
});
// Phân trang ====================================================
renderProducts();
