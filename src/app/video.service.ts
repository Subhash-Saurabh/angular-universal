import { Injectable, Inject, Optional } from '@angular/core';

@Injectable()
export class VideoService {

  private videoUrl = 'http://localhost:4000/video';
  private posterUrl = 'http://localhost:4000/poster';

  constructor() {}
  
  getVideoUrl(id){
    return `${this.videoUrl}/${id}.mp4` ;  
  }

  getPosterUrl(){
    return `${this.posterUrl}/poster.png` ;
  }
  
}