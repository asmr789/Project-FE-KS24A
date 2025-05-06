let products = [
    {
        "product_code": "SP001",
        "product_name": "Iphone 12 Pro",
        "category_id": "DM001",
        "stock": "100",
        "price": "12.000.000 đ",
        "discount": "0 %",
        "status": "ACTIVE"
    },
    {
        "product_code": "SP002",
        "product_name": "Samsung Galaxy X20",
        "category_id": "DM001",
        "stock": "100",
        "price": "21.000.000 đ",
        "discount": "5 %",
        "status": "INACTIVE"
    },
    {
        "product_code": "SP003",
        "product_name": "Oppo Reno 5",
        "category_id": "DM001",
        "stock": "100",
        "price": "8.000.000 đ",
        "discount": "0 %",
        "status": "ACTIVE"
    },
    {
        "product_code": "SP004",
        "product_name": "Xiaomi Mi 11",
        "category_id": "DM001",
        "stock": "100",
        "price": "10.000.000 đ",
        "discount": "0 %",
        "status": "ACTIVE"
    }
];
saveProductLocalStorage();
let filteredProducts = [...products];
let currentPage = 1;
const itemsPerPage = 2;

const tbodyEl = document.querySelector("tbody");

//Hiển thị danh sách sản phẩm====================================
function renderProducts() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const productsToRender = filteredProducts.slice(start, end);

    tbodyEl.innerHTML = productsToRender.map(product => {
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

// Lưu vào localStorage
function saveProductLocalStorage() {
    window.localStorage.setItem("products", JSON.stringify(products));
}

// Lọc theo trạng thái=========================
const statusFilter = document.querySelector("#statusFilter");
statusFilter.addEventListener('change', (e) => {
    const status = e.target.value;
    if (status === "Tất cả" || status === "Lọc theo trạng thái") {
        filteredProducts = [...products];
    } else {
        const statusMap = {
            "Đang hoạt động": "ACTIVE",
            "Ngừng hoạt động": "INACTIVE"
        };
        filteredProducts = products.filter(p => p.status === statusMap[status]);
    }
    currentPage = 1;
    renderProducts();
    updatePagination();
});

// Tìm kiếm sản phẩm=========================
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener('input', (e) => {
    const searchTerm = removeVietnameseTones(e.target.value.toLowerCase());

    filteredProducts = products.filter(pro =>
        removeVietnameseTones(pro.product_name.toLowerCase()).includes(searchTerm)
    );

    currentPage = 1;
    renderProducts();
    updatePagination();
});

// Hàm loại bỏ dấu tiếng Việt
function removeVietnameseTones(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

// Phân trang==========================
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pagination = document.querySelector('.pagination');

    let paginationHTML = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">«</a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">»</a>
        </li>
    `;

    pagination.innerHTML = paginationHTML;

    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const newPage = parseInt(e.target.dataset.page);
            if (newPage >= 1 && newPage <= totalPages) {
                currentPage = newPage;
                renderProducts();
                updatePagination();
            }
        });
    });
}
// Sắp xếp theo tên sản phẩm hoặc giá==========================
let sortDirection = {
    name: 'asc',
    price: 'asc'
};

function sortProductsBy(field) {
    if (field === 'name') {
        filteredProducts.sort((a, b) => {
            if (sortDirection.name === 'asc') {
                return a.product_name.localeCompare(b.product_name);
            } else {
                return b.product_name.localeCompare(a.product_name);
            }
        });
        sortDirection.name = sortDirection.name === 'asc' ? 'desc' : 'asc';
    } else if (field === 'price') {
        filteredProducts.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^\d]/g, ''));
            const priceB = parseFloat(b.price.replace(/[^\d]/g, ''));
            if (sortDirection.price === 'asc') {
                return priceA - priceB;
            } else {
                return priceB - priceA;
            }
        });
        sortDirection.price = sortDirection.price === 'asc' ? 'desc' : 'asc';
    }

    renderProducts();
    updatePagination();
}

document.addEventListener('DOMContentLoaded', () => {
    const sortNameIcon = document.querySelector("#sortName");
    const sortPriceIcon = document.querySelector("#sortPrice");

    if (sortNameIcon) {
        sortNameIcon.addEventListener('click', () => sortProductsBy('name'));
    }
    if (sortPriceIcon) {
        sortPriceIcon.addEventListener('click', () => sortProductsBy('price'));
    }
})
function showSuccessToast(message) {
    const toastEl = document.getElementById('successToast');
    const toastBody = toastEl.querySelector('.toast-body');
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}
let productToDeleteIndex = null;

function deleteProducts(index) {
    productToDeleteIndex = index;
    const product = products[index];
    const modalBody = document.querySelector('#confirmDeleteModal .modal-body p');
    modalBody.textContent = `Bạn có chắc chắn muốn xoá sản phẩm "${product.product_name}" không?`;

    const deleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    deleteModal.show();
}

document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    if (productToDeleteIndex !== null) {
        const product = products[productToDeleteIndex];
        products.splice(productToDeleteIndex, 1);
        filteredProducts = [...products];
        saveProductLocalStorage();
        renderProducts();
        updatePagination();

        const deleteModalEl = document.getElementById('confirmDeleteModal');
        const deleteModal = bootstrap.Modal.getInstance(deleteModalEl);
        deleteModal.hide();

        showSuccessToast(`Sản phẩm "${product.product_name}" đã được xoá thành công!`);
    }
});
// Thêm san phẩm mới==========================
const addProductForm = document.querySelector("#addProductForm");
addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addProductForm);
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Validate required fields
    let isValid = true;
    const productCode = formData.get("product_code").trim();
    const productName = formData.get("product_name").trim();
    const stock = formData.get("stock");
    const price = formData.get("price");
    
    if (!productCode) {
        showError(document.getElementById('productCode'), 'Mã sản phẩm không được để trống');
        isValid = false;
    } else if (products.some(p => p.product_code.toLowerCase() === productCode.toLowerCase())) {
        showError(document.getElementById('productCode'), 'Mã sản phẩm đã tồn tại');
        isValid = false;
    }
    
    if (!productName) {
        showError(document.getElementById('productName'), 'Tên sản phẩm không được để trống');
        isValid = false;
    }
    
    if (!stock || stock < 0) {
        showError(document.querySelector('input[name="stock"]'), 'Số lượng không hợp lệ');
        isValid = false;
    }
    
    if (!price || price < 0) {
        showError(document.querySelector('input[name="price"]'), 'Giá không hợp lệ');
        isValid = false;
    }

    if (isValid) {
        const newProduct = {
            product_code: productCode,
            product_name: productName,
            category_id: formData.get("category_id"),
            stock: stock,
            price: Number(price).toLocaleString('vi-VN') + ' đ',
            discount: formData.get("discount") + ' %',
            status: formData.get("status")
        };

        products.push(newProduct);
        filteredProducts = [...products];
        saveProductLocalStorage();
        addProductForm.reset();
        
        const addProductModal = bootstrap.Modal.getInstance(document.getElementById("exampleModalAddProduct"));
        addProductModal.hide();
        
        showSuccessToast(`Sản phẩm "${newProduct.product_name}" đã được thêm thành công!`);
        
        renderProducts();
        updatePagination();
    }
});

function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
    }
}

renderProducts();
updatePagination();
