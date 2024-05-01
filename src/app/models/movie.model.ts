import {FileHandle} from "./file-handle.model";
import {Image} from "./image.model";

export class Movie {
  id: number;
  name: string;
  description: string;
  thumbnail: Image;
  videoUrl: string;
  categoryId: number;

  constructor() {
    this.id = 0
    this.name = '';
    this.description = '';
    this.thumbnail = new Image();
    this.videoUrl = '';
    this.categoryId = 0;
  }

}
