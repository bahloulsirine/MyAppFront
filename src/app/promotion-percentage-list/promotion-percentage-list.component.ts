import { Article } from './../../models/article.model';
import { PromotionService } from './../shared/service/promotion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Promotion } from './../../models/promotion';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion-percentage-list',
  templateUrl: './promotion-percentage-list.component.html',
  styleUrls: ['./promotion-percentage-list.component.css'],
})
export class PromotionPercentageListComponent implements OnInit {
  articles: Article[];
  percentage: number;
  submitted = false;
  constructor(
    private promotionService: PromotionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.percentage = this.route.snapshot.params['percentage'];
    this.reloadData();
  }
  reloadData() {
    this.promotionService
      .getPromotionPercentage(this.percentage)
      .subscribe((data: Article[]) => {
        this.articles = data;
      });
  }
  deletePromotionArticle(id: number) {
    this.promotionService.deletePromotionArticle(id, this.percentage).subscribe(
      (data) => {
        console.log(data);
        this.reloadData();
      },
      (error) => {
        console.log('something went wrong');
      }
    );
  }
  deletePromotions() {
    this.promotionService
      .deletePromotionsByPercentage(this.percentage)
      .subscribe(
        (data) => {
          console.log(data);
          this.submitted = true;
        },
        (error) => {
          console.log('something went wrong');
        }
      );
  }
  addPromotion() {
    this.router.navigate(['addPromotion', this.percentage]);
  }
}
