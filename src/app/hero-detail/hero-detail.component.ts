import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { VideoService } from '../video.service';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  h1: String ;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private videoService: VideoService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.getHero();
    this.getVideo();
    this.getPoster();
  }

  getHero(): void {  
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero,
        this.titleService.setTitle(`${hero.name} details`),
        this.h1 = `${hero.name} Details`,
        this.metaService.addTag({name: `description`, content: `${hero.name} hero details and video`});
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  private videoUrl: String;
  getVideo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.videoUrl = this.videoService.getVideoUrl(id);
  }

  private posterUrl: String;
  getPoster(): void {
    this.posterUrl = this.videoService.getPosterUrl();
  }

}
