document.addEventListener('DOMContentLoaded', function() {
    // chờ trang wed tải xong mới chạy code
    var menuItems = document.querySelectorAll('.nav-link');
    menuItems.forEach(function(item) {
        var icon = item.querySelector('i');
        
        if (icon.classList.contains('fa-house')) {
            item.href = 'product-statistics.html';
        } 
        else if (icon.classList.contains('fa-folder')) {
            item.href = 'product-manager.html';
        } 
        else if (icon.classList.contains('fa-bag-shopping')) {
            item.href = 'product-list.html';
        }
        var currentPage = window.location.pathname.split('/').pop();
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Xử lý nút đăng xuất
    var logoutButton = document.querySelector('.logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            window.confirm('Bạn có chắc chắn đăng xuất không?')
            window.location.href = '../Login/login.html';
        });
    }
});