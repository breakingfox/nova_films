import {Injectable} from "@angular/core";
import {Movie} from "../models/movie.model";
import {Observable} from "rxjs";
import {Actor} from "../models/actor.model";

@Injectable()
export class PickActorsService {
  unpickedActors!: Actor[];
  pickedActors: Actor[] = [];
}
