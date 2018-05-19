import { Injectable, Inject, Optional } from '@angular/core';

@Injectable()
export class VideoService {

  private url = 'http://localhost:4000/video';

  constructor() {}
  
  getVideoUrl(id){
    return `${this.url}/${id}.mp4` ;
     
  }

}