  <div class="modal fade" id="exampleModalAddCategory" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Thêm mới danh mục</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body">
              <form>
                <div class="mb-3">
                  <label for="categoryCode" class="form-label">Mã danh mục</label>
                  <input type="text" class="form-control" id="categoryCode">
                </div>

                <div class="mb-3">
                  <label for="categoryName" class="form-label">Tên danh mục</label>
                  <input type="text" class="form-control" id="categoryName">
                </div>

                <div class="mb-4">
                  <label class="form-label">Trạng thái</label>
                  <div style="display: flex;">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="status" id="activeStatus" checked>
                      <label class="form-check-label" for="activeStatus">Đang hoạt động</label>
                    </div>
                    <div class="form-check" style="margin-left: 20px;">
                      <input class="form-check-input" type="radio" name="status" id="inactiveStatus">
                      <label class="form-check-label" for="inactiveStatus">Ngừng hoạt động</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button type="button" class="btn btn-primary">Thêm</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal thêm sản phẩm -->
  <div class="modal fade" id="exampleModalAddProduct" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Thêm mới sản phẩm</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body">
              <form>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="productCode" class="form-label">Mã sản phẩm</label>
                    <input type="text" class="form-control" id="productCode" placeholder="Nhập mã sản phẩm">
                  </div>
                  <div class="col-md-6">
                    <label for="productName" class="form-label">Tên sản phẩm</label>
                    <input type="text" class="form-control" id="productName" placeholder="Nhập tên sản phẩm">
                  </div>
                </div>
                
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="productCategory" class="form-label">Danh mục</label>
                    <select class="form-select" id="productCategory">
                      <option selected>Chọn danh mục</option>
                      <option>Điện tử</option>
                      <option>Thời trang</option>
                      <option>Đồ gia dụng</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Trạng thái</label>
                    <div class="d-flex gap-3">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="productStatus" id="productActive" checked>
                        <label class="form-check-label" for="productActive">Đang hoạt động</label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="productStatus" id="productInactive">
                        <label class="form-check-label" for="productInactive">Ngừng hoạt động</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label class="form-label">Số lượng & Giá</label>
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Số lượng</th>
                          <th>Giá</th>
                          <th>Giá khuyến mãi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input type="number" class="form-control" value="1"></td>
                          <td><input type="number" class="form-control" value="10000000"></td>
                          <td><input type="number" class="form-control" value="9500000"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="productImage" class="form-label">Hình ảnh</label>
                  <input type="file" class="form-control" id="productImage">
                  <div class="mt-2">
                    <small class="text-muted">Hoặc nhập URL hình ảnh:</small>
                    <input type="text" class="form-control mt-1" placeholder="ákdjáuidhiudfh">
                  </div>
                </div>
                
                <div class="mb-4">
                  <label for="productSpecs" class="form-label">Chỉ tiêu sản phẩm</label>
                  <textarea class="form-control" id="productSpecs" rows="3" placeholder="Nhập thông số kỹ thuật"></textarea>
                </div>
                
                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-primary">Thêm sản phẩm</button>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button type="button" class="btn btn-primary">Thêm</button>
          </div>
        </div>
      </div>
    </div>
  </div>