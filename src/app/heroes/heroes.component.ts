import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { PLATFORM_ID, Inject } from '@angular/core';
import * as $ from 'jquery';
import { isPlatformBrowser } from '@angular/common';
import { Title , Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  private isBrowser : boolean = isPlatformBrowser(this.platformId);
  

  constructor(private heroService: HeroService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private titleService: Title,
              private metaService: Meta) {  
              }

  ngOnInit() {
    this.getHeroes();
    this.changeCss();
    this.changeTitle();
    this.addMetaTags();
  }


  changeTitle(){
    this.titleService.setTitle('Tour of Heroes DashBoard');
  }
  
  addMetaTags(){
    this.metaService.addTag({ name: 'heroes', content: 'Heroes list' });
    this.metaService.addTag({ name: 'description', content: 'random content for improving search ratings'});
  }

  changeCss(): void{
    if(this.isBrowser){
      $(document).ready(function(){
        $(".heroes").css({width : '80em'});
      });
    }
  }
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero(name)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero)
        .subscribe(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
        });
  }

}
