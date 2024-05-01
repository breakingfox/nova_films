import { Component } from '@angular/core';
import {PickMoviesService} from "../../service/pick-movies.service";
import {Movie} from "../../models/movie.model";
import {PickActorsService} from "../../service/pick-actors.service";
import {Actor} from "../../models/actor.model";

@Component({
  selector: 'app-pick-actors',
  templateUrl: './pick-actors.component.html',
  styleUrls: ['./pick-actors.component.css']
})
export class PickActorsComponent {
  constructor(public pickActorsService: PickActorsService) {
  }

  pickActor(actor: Actor): void {
    this.pickActorsService.unpickedActors = this.pickActorsService
      .unpickedActors
      .filter(curActor => {
        return curActor.id !== actor.id
      });

    this.pickActorsService.pickedActors.push(actor)
  }
}
