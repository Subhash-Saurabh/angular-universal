import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService,
              private titleService: Title,
              private metaService: Meta) { }

  ngOnInit() {
    this.getHeroes();
    this.changeTitle();
    this.addMetaTags();
    
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  changeTitle(){
    this.titleService.setTitle('Tour of Heroes DashBoard');
  }
  
  addMetaTags(){
    this.metaService.addTag({ name: 'dashboard', content: 'Dashboard containing Heroes' });
    this.metaService.addTag({ name: 'random', content: 'random content for improving search ratings'});
  }
}
