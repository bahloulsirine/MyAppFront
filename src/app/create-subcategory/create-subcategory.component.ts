import { CreateSubcategory } from './../../models/subcategory.model';
import { Category } from 'src/models/category.model';
import { CategoryService } from './../shared/service/category.service';
import { SubcategoryService } from './../shared/service/subcategory.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-subcategory',
  templateUrl: './create-subcategory.component.html',
  styleUrls: ['./create-subcategory.component.css'],
})
export class CreateSubcategoryComponent implements OnInit {
  categories: Category[];
  submitted = false;
  subcategory: CreateSubcategory;
  constructor(
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.resetSubcategory();
  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
      console.log(data);
    });
  }
  save() {
    this.subcategoryService
      .createSubcategory(this.subcategory)
      .subscribe((data) => {
        this.submitted = true;
      });
  }
  onSubmit() {
    this.save();
  }
  resetSubcategory() {
    this.subcategory = {
      name: '',
      categoryId: null,
    };
  }
}
