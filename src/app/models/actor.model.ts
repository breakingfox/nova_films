export class Actor {
  id: number;
  name: string;
  birthDate: Date;

  constructor() {
    this.id = 0;
    this.name = '';
    this.birthDate = new Date();
  }
}
