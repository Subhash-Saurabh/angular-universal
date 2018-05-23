import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list-basic',
  templateUrl: './hero-list-basic.component.html',
  styleUrls: ['./hero-list-basic.component.css'],
  animations: [
    trigger('heroState',[
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(2)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class HeroListBasicComponent implements OnInit {

  heroes : Hero[];

  constructor(private heroService: HeroService) { 
    
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
      });
  }

  toggleState(hero) : void{
    this.heroService.toggleState(hero,this.heroes);
  }
}
