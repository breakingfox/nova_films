import { Image } from "./image.model";
import { Movie } from "./movie.model";

export class MovieUpdate {
  id: number;
  name: string;
  description: string;
  videoUrl: string;
  categoryId: number;
  actorIds: number[];

  constructor();
  constructor(movie: Movie, actorIds: number[]);
  constructor(movie?: Movie, actorIds?: number[]) {
    this.id = movie?.id || 0;
    this.name = movie?.name || '';
    this.description = movie?.description || '';
    this.actorIds = actorIds || [];
    this.videoUrl = movie?.videoUrl || '';
    this.categoryId = movie?.categoryId || 0;
  }
}
