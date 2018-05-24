import { Injectable, Inject, Optional } from '@angular/core';

@Injectable()
export class VideoService {

  private videoUrl = `/video`;
  private posterUrl = `/poster`;

  constructor() {}
  
  getVideoUrl(id){
    return `${this.videoUrl}/${id}.mp4` ;  
  }

  getPosterUrl(){
    return `${this.posterUrl}/poster.png` ;
  }

}