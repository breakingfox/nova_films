import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../service/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css'],
})
export class ActorListComponent implements OnInit {

  actors: any[] = []; // Define a property to store the list of actors

  constructor(private actorService: ActorService) {}

  ngOnInit(): void {
    console.log("ASFDASF")
    // Call the service to fetch the list of actors
    this.actorService.getActors().subscribe((data: any) => {
      this.actors = data;
    });
  }
}
