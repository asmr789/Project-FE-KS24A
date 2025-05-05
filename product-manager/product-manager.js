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
        status: "ACTIVE",
        created_at: "2021-01-01T00:00:00Z"
    },
    {
        category_code: "DM003",
        category_name: "Cameras",
        status: "ACTIVE",
        created_at: "2021-01-01T00:00:00Z"
    },
    {
        category_code: "DM004",
        category_name: "Tai nghe",
        status: "ACTIVE",
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
                    <button class="btn btn-link text-warning p-0 me-2"><i class="fa-solid fa-pen"></i></button>
                </td>
            </tr>`;
    }).join("");
}
let categoryToDeleteIndex = null;

function deleteCategory(index) {
    categoryToDeleteIndex = index;
    const category = categories[index];

    // Kiểm tra nếu danh mục có sản phẩm
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const hasProducts = products.some(product => product.category_id === category.category_code);

    if (hasProducts) {
        alert(`Danh mục "${category.category_name}" không thể xoá vì đã có sản phẩm.`);
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

        // Update and show the toast
        const toastBody = document.querySelector('#deleteToast .toast-body');
        toastBody.textContent = `Danh mục "${category.category_name}" đã được xoá thành công!`;
        const toastEl = document.getElementById('deleteToast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
});




function saveCategoryLocalStorage() {
    window.localStorage.setItem("categories", JSON.stringify(categories));
}
let currentPage = 1;
const itemsPerPage = 5;
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
    const searchTerm = e.target.value.toLowerCase();
    filteredCategories = categories.filter(cat =>
        cat.category_name.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderCategories();
    updatePagination();
});
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
let sortDirection = 'asc'; // Default sort direction

function sortCategoriesByName() {
    filteredCategories.sort((a, b) => {
        if (sortDirection === 'asc') {
            return a.category_name.localeCompare(b.category_name);
        } else {
            return b.category_name.localeCompare(a.category_name);
        }
    });

    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'; // Toggle sort direction
    renderCategories();
    updatePagination();
}

// Attach sorting functionality to the sort icon
document.addEventListener('DOMContentLoaded', () => {
    const sortIcon = document.querySelector('th:nth-child(2) i.fa-arrow-down');
    if (sortIcon) {
        sortIcon.addEventListener('click', sortCategoriesByName);
    }
});
renderCategories();
updatePagination();