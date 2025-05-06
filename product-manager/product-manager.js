let categories = [
    {
        category_code: "DM001",
        category_name: "Điện thoại",
        status: "ACTIVE",
        created_at: "2021-01-01T00:00:00Z"
    },
    {
        category_code: "DM002",
        category_name: "Đồng hồ",
        status: "INACTIVE",
        created_at: "2021-01-01T00:00:00Z"
    },
    {
        category_code: "DM005",
        category_name: "Máy tính",
        status: "ACTIVE",
        created_at: "2021-01-01T00:00:00Z"
    },
    {
        category_code: "AM001",
        category_name: "Thiết bị văn phòng",
        status: "INACTIVE",
        created_at: "2021-01-01T00:00:00Z"
    }
];
saveCategoryLocalStorage();
const products = JSON.parse(localStorage.getItem('products')) || [];
const tbodyEl = document.querySelector("tbody");
let filteredCategories = [...categories]; // Danh sách danh mục đã lọc
function renderCategories() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedCategories = filteredCategories.slice(start, end);
    tbodyEl.innerHTML = paginatedCategories.map((category) => {
        const statusClass = category.status === "ACTIVE" ? "active" : "inactive";
        const statusText = category.status === "ACTIVE" ? "Đang hoạt động" : "Ngừng hoạt động";
        const realIndex = categories.findIndex(cat => cat.category_code === category.category_code);

        return `
            <tr>
                <td>${category.category_code}</td>
                <td>${category.category_name}</td>
                <td><span class="status ${statusClass}">●&nbsp;${statusText}</span></td>
                <td>
                    <button onclick="deleteCategory(${realIndex})" class="btn btn-link text-danger p-0" style="margin-right: 10px;"><i class="fa-solid fa-trash"></i></button>
                    <button class="btn btn-link text-warning p-0 me-2" data-bs-toggle="modal" data-bs-target="#editModalCategory"><i class="fa-solid fa-pen"></i></button>
                </td>
            </tr>`;
    }).join("");
}
let categoryToDeleteIndex = null;

function deleteCategory(index) {
    categoryToDeleteIndex = index;
    const category = categories[index];

    // Kiểm tra xem danh mục có sản phẩm liên quan không
    const hasProducts = products.some(product => product.category_id === category.category_code);
    if (hasProducts) {
        showErrorToast(`Không thể xoá danh mục "${category.category_name}" vì đã có sản phẩm liên quan.`);
        return;
    }

    const modalBody = document.querySelector('#confirmDeleteModal .modal-body p');
    modalBody.textContent = `Bạn có chắc chắn muốn xoá danh mục "${category.category_name}" không?`;

    const deleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    deleteModal.show();
}

document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    if (categoryToDeleteIndex !== null) {
        const category = categories[categoryToDeleteIndex];
        categories.splice(categoryToDeleteIndex, 1);
        filteredCategories = [...categories];
        saveCategoryLocalStorage();
        renderCategories();
        updatePagination();

        const deleteModalEl = document.getElementById('confirmDeleteModal');
        const deleteModal = bootstrap.Modal.getInstance(deleteModalEl);
        deleteModal.hide();

        showSuccessToast(`Danh mục "${category.category_name}" đã được xoá thành công!`);
    }
});
// Sửa danh mục====================================================
const editForm = document.querySelector('#editCategoryForm');
const editCategoryName = document.querySelector('#updateCategoryName');
const editCategoryCode = document.querySelector('#updateCategoryCode');
const activeStatus = document.querySelector('#activeStatus');
const inactiveStatus = document.querySelector('#inactiveStatus');
let categoryToEditIndex = null;

function editCategory(index) {
    categoryToEditIndex = index;
    const category = categories[index];

    document.querySelector('#updateCategoryCode').value = category.category_code;
    document.querySelector('#updateCategoryName').value = category.category_name;
    if (category.status === "ACTIVE") {
        document.querySelector('#editActiveStatus').checked = true;
    } else {
        document.querySelector('#editInactiveStatus').checked = true;
    }

    const editModal = new bootstrap.Modal(document.getElementById('editModalCategory'));
    editModal.show();
}

document.querySelector('#editCategoryForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    const updatedCode = document.querySelector('#updateCategoryCode').value.trim();
    const updatedName = document.querySelector('#updateCategoryName').value.trim();
    const updatedStatus = document.querySelector('#editActiveStatus').checked ? 'ACTIVE' : 'INACTIVE';

    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    // Validate updated code
    if (!updatedCode) {
        showError(document.querySelector('#updateCategoryCode'), 'Mã danh mục không được để trống');
        isValid = false;
    } else if (
        updatedCode.toLowerCase() !== categories[categoryToEditIndex].category_code.toLowerCase() &&
        categories.some((cat, idx) =>
            idx !== categoryToEditIndex && cat.category_code.toLowerCase() === updatedCode.toLowerCase()
        )
    ) {
        showError(document.querySelector('#updateCategoryCode'), 'Mã danh mục không được phép trùng');
        isValid = false;
    }

    // Validate updated name
    if (!updatedName) {
        showError(document.querySelector('#updateCategoryName'), 'Tên danh mục không được để trống');
        isValid = false;
    } else if (
        updatedName.toLowerCase() !== categories[categoryToEditIndex].category_name.toLowerCase() &&
        categories.some((cat, idx) =>
            idx !== categoryToEditIndex && cat.category_name.toLowerCase() === updatedName.toLowerCase()
        )
    ) {
        showError(document.querySelector('#updateCategoryName'), 'Tên danh mục không được phép trùng');
        isValid = false;
    }

    if (isValid) {
        categories[categoryToEditIndex] = {
            category_code: updatedCode,
            category_name: updatedName,
            status: updatedStatus,
            created_at: categories[categoryToEditIndex].created_at
        };

        filteredCategories = [...categories];
        saveCategoryLocalStorage();
        renderCategories();
        updatePagination();

        const editModalEl = document.getElementById('editModalCategory');
        const editModal = bootstrap.Modal.getInstance(editModalEl);
        editModal.hide();

        showSuccessToast(`Danh mục "${updatedName}" đã được cập nhật thành công!`);
    }
});

// Toast thành công
function showSuccessToast(message) {
    const toastEl = document.getElementById('successToast');
    const toastBody = toastEl.querySelector('.toast-body');
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

// Toast thất bại
function showErrorToast(message) {
    const toastEl = document.getElementById('errorToast');
    const toastBody = toastEl.querySelector('.toast-body');
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

function saveCategoryLocalStorage() {
    window.localStorage.setItem("categories", JSON.stringify(categories));
}
let currentPage = 1;
const itemsPerPage = 3;
// Lọc theo trạng thái====================================================
const statusFilter = document.querySelector('select.form-select');
statusFilter.addEventListener('change', (e) => {
    const status = e.target.value;
    if (status === "Tất cả") {
        filteredCategories = [...categories];
    } else {
        const statusMap = {
            "Đang hoạt động": "ACTIVE",
            "Ngừng hoạt động": "INACTIVE"
        };
        filteredCategories = categories.filter(cat => cat.status === statusMap[status]);
    }
    currentPage = 1;
    renderCategories();
    updatePagination();
});
// Tìm kiếm====================================================
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener('input', (e) => {
    const searchTerm = removeVietnameseTones(e.target.value.toLowerCase());

    filteredCategories = categories.filter(cat =>
        removeVietnameseTones(cat.category_name.toLowerCase()).includes(searchTerm)
    );

    currentPage = 1;
    renderCategories();
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
// Thêm danh mục====================================================
const form = document.querySelector('#addCategoryForm');
const categoryCodeInput = document.querySelector('#categoryCode');
const categoryNameInput = document.querySelector('#categoryName');
const activeStatusInput = document.querySelector('#activeStatus');
const inactiveStatusInput = document.querySelector('#inactiveStatus');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let isValid = true;

  const categoryCode = categoryCodeInput.value.trim();
  const categoryName = categoryNameInput.value.trim();
  const status = activeStatusInput.checked ? 'ACTIVE' : 'INACTIVE';
  const createdAt = new Date().toISOString();

  // Xoá lỗi cũ
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

  // Kiểm tra trống
  if (!categoryCode) {
    showError(categoryCodeInput, 'Mã danh mục không được để trống');
    isValid = false;
  }

  if (!categoryName) {
    showError(categoryNameInput, 'Tên danh mục không được để trống');
    isValid = false;
  }

  // Kiểm tra trùng mã và tên
  if (categories.some(cat => cat.category_code.toLowerCase() === categoryCode.toLowerCase())) {
    showError(categoryCodeInput, 'Mã danh mục không được phép trùng');
    isValid = false;
  }

  if (categories.some(cat => cat.category_name.toLowerCase() === categoryName.toLowerCase())) {
    showError(categoryNameInput, 'Tên danh mục không được phép trùng');
    isValid = false;
  }

  if (isValid) {
    categories.push({
      category_code: categoryCode,
      category_name: categoryName,
      status: status,
      created_at: createdAt
    });
  
    filteredCategories = [...categories];
    saveCategoryLocalStorage();
    renderCategories();
    updatePagination();
  
    const addModalEl = document.getElementById('exampleModalAddCategory');
    const addModal = bootstrap.Modal.getInstance(addModalEl);
    addModal.hide();
  
    // Hiển thị toast thành công
    const toastBody = document.querySelector('#deleteToast .toast-body');
    toastBody.textContent = `Danh mục "${categoryName}" đã được thêm thành công!`;
    const toastEl = document.getElementById('deleteToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  
    form.reset();
  } else {
    alert('Vui lòng kiểm tra lại thông tin danh mục.');
  }
});

function showError(input, message) {
  const errorMessage = input.nextElementSibling;
  errorMessage.textContent = message;
}

// Phân trang====================================================
function updatePagination() {
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
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
                renderCategories();
                updatePagination();
            }
        });
    });
}
// Sắp xếp theo tên danh mục====================================================
let sortDirection = 'asc';
function sortCategoriesByName() {
    filteredCategories.sort((a, b) => {
        if (sortDirection === 'asc') {
            return a.category_name.localeCompare(b.category_name);
        } else {
            return b.category_name.localeCompare(a.category_name);
        }
    });

    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    renderCategories();
    updatePagination();
}

document.addEventListener('DOMContentLoaded', () => {
    const sortIcon = document.querySelector('th:nth-child(2) i.fa-arrow-down');
    if (sortIcon) {
        sortIcon.addEventListener('click', sortCategoriesByName);
    }
});
renderCategories();
updatePagination();