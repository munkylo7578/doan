import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Product, ProductService } from '../product.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { CategoryService } from '../../categories/category.service';
import { BrandService } from '../../brands/brand.service';
import { ToastServiceService } from '../../../shared/toast-service.service';
import { environment } from '../../../../../../environments/environment';
import { __values } from 'tslib';
import { NhaCungCapService } from '../../nhacungcaps/nhacungcap.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public accent = 'accent';
  public product: Product
  //Begin Review multile file before upload
  public newForm: FormGroup;
  urls = new Array<string>();
  nhacungcaps: any[] = [];
  gopHam(event) {
    this.detectFiles(event)
    this.onSelectFile(event)
  }
  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    for (let file of files) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }
  onSelectFile(fileInput: any) {
    this.selectedFile = <FileList>fileInput.target.files;
  }
  //End Review multile file before upload
  public Editor = ClassicEditor;
  selectedFile: FileList;
  categories: any[] = [];
  brands: any[] = [];
  constructor(public service: ProductService,
    public http: HttpClient,
    public router: Router,
    public serviceToast: ToastServiceService,
    public serviceCategory: CategoryService,
    public serviceBrand: BrandService,
    public serviceNhaCungCap: NhaCungCapService) {
  }
  onSelectedList() {
    this.router.navigate(['admin/products']);
  }
  get Ten() { return this.newForm.get('Ten'); }
  get GiaBan() { return this.newForm.get('GiaBan'); }
  get GiaNhap() { return this.newForm.get('GiaNhap'); }
  get KhuyenMai() { return this.newForm.get('KhuyenMai'); }
  get MoTa() { return this.newForm.get('MoTa'); }
  get Tag() { return this.newForm.get('Tag'); }
  get HuongDan() { return this.newForm.get('HuongDan'); }
  get ThanhPhan() { return this.newForm.get('ThanhPhan'); }
  get Id_Loai() { return this.newForm.get('Id_Loai'); }
  get Id_NhanHieu() { return this.newForm.get('Id_NhanHieu'); }
  get Id_NhaCungCap() { return this.newForm.get('Id_NhaCungCap'); }
  get TrangThaiSanPham() { return this.newForm.get('TrangThaiSanPham'); }
  get TrangThaiHoatDong() { return this.newForm.get('TrangThaiHoatDong'); }
  get GioiTinh() { return this.newForm.get('GioiTinh') }
  ngOnInit(): void {
    console.log(this.service.product)
    this.serviceCategory.get().subscribe(
      data => {
        Object.assign(this.categories, data)
      }
    )
    this.serviceBrand.get().subscribe(
      data => {
        Object.assign(this.brands, data)
      }
    )
    this.serviceNhaCungCap.gethttp().subscribe(
      data => {
        Object.assign(this.nhacungcaps, data)
        console.log("nha cung cap", this.nhacungcaps);
      }
    )
    this.newForm = new FormGroup({
      Ten: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      GiaBan: new FormControl(null, [
        Validators.required,
        Validators.min(3),
        Validators.max(100000000000),
      ]),
      GiaNhap: new FormControl(null, [
        Validators.required,
        Validators.min(3),
        Validators.max(100000000000),
      ]),
      KhuyenMai: new FormControl(this.service.product.khuyenMai, [
        Validators.required,
        Validators.min(0),
        Validators.max(50000000000),
      ]),
      MoTa: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10000000000000),
      ]),
      HuongDan: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1000000000000),
      ]),
      ThanhPhan: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(5000000000),
      ]),
      Tag: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ]),
      Id_Loai: new FormControl(null, [
        Validators.required,
      ]),
      Id_NhaCungCap: new FormControl(null, [
        Validators.required,
      ]),
      Id_NhanHieu: new FormControl(null, [
        Validators.required,
      ]),
      TrangThaiSanPham: new FormControl(null, [
        Validators.required,
      ]),
      TrangThaiHoatDong: new FormControl(null, [
        Validators.required,
      ]),
      GioiTinh: new FormControl(null, [
        Validators.required,
      ]),
    });
  }
  clearForm() {
    this.newForm.reset();
  }
  onSubmit = (data) => {
    if (this.service.product.id == 0) {
      let form = new FormData();
      for (let i = 0; i < this.urls.length; i++) {
        form.append('files', this.selectedFile.item(i))
      }
      form.append('Ten', data.Ten);
      form.append('KhuyenMai', data.KhuyenMai);
      form.append('MoTa', data.MoTa);
      form.append('GiaBan', data.GiaBan);
      form.append('GiaNhap', data.GiaNhap);
      form.append('HuongDan', data.HuongDan);
      form.append('ThanhPhan', data.ThanhPhan);
      form.append('Tag', data.Tag);
      form.append('GioiTinh', data.GioiTinh)
      form.append('Id_Loai', data.Id_Loai);
      form.append('Id_NhanHieu', data.Id_NhanHieu);
      form.append('Id_NhaCungCap', data.Id_NhaCungCap);
      form.append('TrangThaiSanPham', data.TrangThaiSanPham);
      form.append('TrangThaiHoatDong', data.TrangThaiHoatDong);
      var json_arr = JSON.stringify(data);
      console.log(json_arr)
      this.service.post(form)
        .subscribe(res => {
          this.serviceToast.showToastThemThanhCong()
          this.resetForm()
          this.service.getAllProducts();
          this.service.product.id = 0;
          this.onSelectedList();
          this.clearForm();
        }, err => {
          this.serviceToast.showToastThemThatBai()
        }
        );
    }
    else {
      const form = new FormData();
      form.append('Ten', data.Ten);
      form.append('KhuyenMai', data.KhuyenMai);
      form.append('MoTa', data.MoTa);
      form.append('GiaBan', data.GiaBan);
      form.append('GiaNhap', data.GiaNhap);
      form.append('GioiTinh', data.GioiTinh)
      form.append('HuongDan', data.HuongDan);
      form.append('ThanhPhan', data.ThanhPhan);
      form.append('Tag', data.Tag);
      form.append('Id_Loai', data.Id_Loai);
      form.append('Id_NhanHieu', data.Id_NhanHieu);
      form.append('Id_NhaCungCap', data.Id_NhaCungCap);
      form.append('TrangThaiSanPham', data.TrangThaiSanPham);
      form.append('TrangThaiSanPhamThietKe', data.TrangThaiSanPhamThietKe);
      for (let i = 0; i < this.urls.length; i++) {
        form.append('files', this.selectedFile.item(i))
      }
      form.append('TrangThaiHoatDong', data.TrangThaiHoatDong);
      this.service.put(this.service.product.id, form)
        .subscribe(res => {
          this.serviceToast.showToastSuaThanhCong()
          this.resetForm()
          this.service.getAllProducts();
          this.service.product.id = 0;
          this.onSelectedList();
          this.clearForm();
        }, err => {
          this.serviceToast.showToastSuaThatBai()
        });
    }
  }
  resetForm() {
    this.newForm.reset();
    this.service.product = new Product();
  }
  /* DATA SAN PHAM */
  TenSanPhamArray: any = [
    { value: 'Áo ba lỗ', viewValue: 'Áo ba lỗ' },
    { value: 'Áo thun trơn', viewValue: 'Áo thun trơn' },
    { value: 'Áo khoác bò ', viewValue: 'Áo khoác bò' },
    { value: 'Quần short', viewValue: 'Quần short' },
    { value: 'Quần đùi', viewValue: 'Quần đùi' },
    { value: 'Quần kaki ', viewValue: 'Quần kaki' },
    { value: 'Quần baggy', viewValue: 'Quần baggy' },
    { value: 'Áo Polo', viewValue: 'Áo Polo' },
    { value: 'Áo FEAER ', viewValue: 'Áo FEAER' },
    { value: 'Áo sơ mi', viewValue: 'Áo sơ mi' },
    { value: 'Áo Sơ Mi Nam Đũi Kẻ Sọc Caro ', viewValue: 'Áo Sơ Mi Nam Đũi Kẻ Sọc Caro' },
    { value: 'Áo phông trơn unisex nam', viewValue: 'Áo phông trơn unisex nam' },
    { value: 'Áo Thun Nam SADBOIZ', viewValue: 'Áo Thun Nam SADBOIZ' },
    { value: 'Áo thun HOTTREND', viewValue: 'Áo thun HOTTREND' },
    { value: 'Áo Thun Nam Thể Thao', viewValue: 'Áo Thun Nam Thể Thao' },
    { value: 'Áo thun Highclub Basic Tee', viewValue: 'Áo thun Highclub Basic Tee' },
    { value: 'Áo SIGNATURE', viewValue: 'Áo SIGNATURE' },
    { value: 'Áo thun Bad Habits ROCKER', viewValue: 'Áo thun Bad Habits ROCKER' },
    { value: 'Áo sơ mi trơn big size LADOS ', viewValue: 'Áo sơ mi trơn big size LADOS ' },
    { value: 'Áo Thun Missout BUNNY&BEAR TEE', viewValue: 'Áo Thun Missout BUNNY&BEAR TEE' },
    { value: 'GIÀY THỂ THAO NAM', viewValue: 'GIÀY THỂ THAO NAM' },
    { value: 'Giày thể thao nữ CV classic', viewValue: 'Giày thể thao nữ CV classic' },
    { value: 'Giày thể thao nữ Ulzzang', viewValue: 'Giày thể thao nữ Ulzzang' },
    { value: 'GIÀY NỮ AIR TRẮNG', viewValue: 'GIÀY NỮ AIR TRẮNG' },
    { value: 'Giày 𝐌𝐋𝐁 boston bản trung', viewValue: 'Giày 𝐌𝐋𝐁 boston bản trung' },
    { value: 'Giày AF1 trắng', viewValue: 'Giày AF1 trắng' },
    { value: 'Áo sơ mi tay ngắn nam nữ', viewValue: 'Áo sơ mi tay ngắn nam nữ' },
    { value: ' Áo Sơmi nhung Tăm vintage', viewValue: 'Áo Sơmi nhung Tăm vintage' },
    { value: 'Đồng Hồ Nam PAGINI PA9966 ', viewValue: 'Đồng Hồ Nam PAGINI PA9966 ' },
    { value: 'Đồng Hồ Nữ Julius Hàn Quốc', viewValue: 'Đồng Hồ Nữ Julius Hàn Quốc' },
    { value: 'Đồng hồ WR unisex dây hơp kim CS1', viewValue: 'Đồng hồ WR unisex dây hơp kim CS1' },
    { value: 'Đồng hồ Nữ Army', viewValue: 'Đồng hồ Nữ Army' },
    { value: 'Đồng Hồ Nam Crnaira Japan C3079', viewValue: 'Đồng Hồ Nam Crnaira Japan C3079' },
    { value: 'Giây lưng thắt lưng nam ', viewValue: 'Giây lưng thắt lưng nam ' },
    { value: 'Dây Nịt Nam Mặt GG', viewValue: 'Dây Nịt Nam Mặt GG' },
    { value: 'Thắt Lưng Da Bò SÁP', viewValue: 'Thắt Lưng Da Bò SÁP' },
  ];
  //Data gia nhap
  GiaNhapArray: any = [
    { value: '100000', viewValue: '100000' },
    { value: '157000', viewValue: '157000' },
    { value: '213000', viewValue: '213000' },
    { value: '311000', viewValue: '311000' },
    { value: '900000', viewValue: '900000' },
    { value: '402000', viewValue: '402000' },
    { value: '450000', viewValue: '450000' },
    { value: '650000', viewValue: '650000' },
    { value: '550000', viewValue: '550000' },
    { value: '350000', viewValue: '350000' },
  ];
  //Data gia ban
  GiaBanArray: any = [
    { value: '150000', viewValue: '150000' },
    { value: '257000', viewValue: '257000' },
    { value: '513000', viewValue: '513000' },
    { value: '411000', viewValue: '411000' },
    { value: '150000', viewValue: '150000' },
    { value: '602000', viewValue: '602000' },
    { value: '650000', viewValue: '650000' },
    { value: '750000', viewValue: '750000' },
    { value: '850000', viewValue: '850000' },
    { value: '650000', viewValue: '650000' },
  ];
  //Data mota
  MoTaArray: any = [
    {
      value: `Ngày này, áo thun tay lỡ Unisex form rộng đang ngày càng trở nên phổ biến và đa dạng với các mẫu thiết kế độc đáo bắt mắt, thậm chí còn bắt kịp nhiều trào lưu xu hướng đặc biệt là phong cách Hàn Quốc. 
    Do đó, việc tìm hiểu tất tần tật về áo thun tay lỡ nam/nữ là cần thiết giúp bạn luôn cập nhật những mẫu thiết kế mới nhất. Điều này sẽ giúp bạn có nhiều sự lựa chọn mới mẻ và đa dạng phong cách thời trang của bạn.`,
      viewValue: `Ngày này, áo thun tay lỡ Unisex form rộng đang ngày càng trở nên phổ biến và đa dạng với các mẫu thiết kế độc đáo bắt mắt, thậm chí còn bắt kịp nhiều trào lưu xu hướng đặc biệt là phong cách Hàn Quốc. 
    Do đó, việc tìm hiểu tất tần tật về áo thun tay lỡ nam/nữ là cần thiết giúp bạn luôn cập nhật những mẫu thiết kế mới nhất. Điều này sẽ giúp bạn có nhiều sự lựa chọn mới mẻ và đa dạng phong cách thời trang của bạn.`
    },
    {
      value: `Mẫu quần tây đen công sở cạp lưng cao Form thoải mái, không quá ôm và quá đứng dáng đâu các nàng ạ, mặc lên vừa thoải mái vận động mà vẫn đứng dáng. Các nàng có thể mặc quần tây nữ công sở phối áo sơ mi mặc đi làm, đi chơi, học sinh mặc đi học đều xinh ạ.`,
      viewValue: `Mẫu quần tây đen công sở cạp lưng cao Form thoải mái, không quá ôm và quá đứng dáng đâu các nàng ạ, mặc lên vừa thoải mái vận động mà vẫn đứng dáng. Các nàng có thể mặc quần tây nữ công sở phối áo sơ mi mặc đi làm, đi chơi, học sinh mặc đi học đều xinh ạ.`
    },
    {
      value: `Đối với một người đàn ông hiện đại thì vẻ bề ngoài rất quan trọng, ngoài những bộ suit lịch lãm thì phụ kiện đồng hồ cũng là điểm nhấn không thể thiếu trên cổ tay của họ. Vì thế một chiếc đồng hồ đẹp cho nam luôn là mục đích tìm kiếm của đa số đàn ông hiện nay.`,
      viewValue: `Đối với một người đàn ông hiện đại thì vẻ bề ngoài rất quan trọng, ngoài những bộ suit lịch lãm thì phụ kiện đồng hồ cũng là điểm nhấn không thể thiếu trên cổ tay của họ. Vì thế một chiếc đồng hồ đẹp cho nam luôn là mục đích tìm kiếm của đa số đàn ông hiện nay.`
    },
    {
      value: `Mang đến hình ảnh là một người lịch lãm, nhưng không kém phần thanh lịch, thời trang giày nổi bật cùng dáng xỏ tiện lợi giúp bạn có thể sử dụng ở bất cứ đâu.`,
      viewValue: `Mang đến hình ảnh là một người lịch lãm, nhưng không kém phần thanh lịch, thời trang giày nổi bật cùng dáng xỏ tiện lợi giúp bạn có thể sử dụng ở bất cứ đâu.`
    },
  ];
  //Data thanh phan
  ThanhPhanArray: any = [
    {
      value: `Vải Thun Lạnh co giãn 4 chiều, thoáng mát, mềm mịn mát mẻ, phù hợp với mọi hoạt động dã ngoại, thể thao, hay dạo phố.`,
      viewValue: `Vải Thun Lạnh co giãn 4 chiều, thoáng mát, mềm mịn mát mẻ, phù hợp với mọi hoạt động dã ngoại, thể thao, hay dạo phố.`
    },
    {
      value: `Thân giày thể thao chủ yếu sử dụng vật liệu mesh (lưới), da tự nhiên hoặc da nhân tạo. `,
      viewValue: `Thân giày thể thao chủ yếu sử dụng vật liệu mesh (lưới), da tự nhiên hoặc da nhân tạo. `
    },
    {
      value: `Kaki `,
      viewValue: `Kaki  `
    },
    {
      value: `Kim loại`,
      viewValue: `Kim loại `
    },
  ];
  //Data Huong dan
  HuongDanArray: any = [
    {
      value: `Ủi 180 độ, có thể phối với mọi loại đồ`,
      viewValue: `Ủi 180 độ, có thể phối với mọi loại đồ`
    },
    {
      value: `Để ở nơi thoáng mát, tránh ẩm mốc`,
      viewValue: `Để ở nơi thoáng mát, tránh ẩm mốc`
    },
  ];
}
