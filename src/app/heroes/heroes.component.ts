import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { PLATFORM_ID, Inject } from '@angular/core';
import * as $ from 'jquery';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';

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
              private titleService: Title) {  
              }

  ngOnInit() {
    this.getHeroes();
    this.changeCss();
    this.titleService.setTitle('Heroes');
  }

  changeCss(): void{
    if(this.isBrowser){
      console.log("Executed");
      $(document).ready(function(){
        $(".heroes").css({width : '80em'});
      });
    }
  }
  changeTitle(){

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
