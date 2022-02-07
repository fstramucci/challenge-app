import { Component, OnInit, NgZone } from '@angular/core';
import { ProductService } from './../shared/product.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: any = [];
  isOpen: any = [];
  productForm: FormGroup;
  filedata: any;

  constructor(
    private productService: ProductService,
    public fb: FormBuilder,
    private zone: NgZone
  ) {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      photo: [null],
    });
   }

  ngOnInit() { }

  ionViewDidEnter() {
    this.productService.indexProduct().subscribe((res) => {
      console.log(res);
      this.products = res;
    });
  }

  onFileChange(event) {
    const MAX_SIZE = 1024000;

    if (event.target.files[0].size > MAX_SIZE) {
      console.log('max image size allowed is ' + MAX_SIZE / 1024 + 'Mb');
      return false;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
          this.filedata = e.target.result;
      };
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onFormSubmit() {
    /*if (!this.productForm.valid) {
      return false;
    } else {*/
      this.productForm.patchValue({photo: this.filedata});
      this.productService.storeProduct(this.productForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res);
            this.productForm.reset();
            this.isOpen.storeProduct = false;

            this.productService.indexProduct().subscribe((result) => {
              console.log(result);
              this.products = result;
            });
          });
        });
    //}
  }

}
