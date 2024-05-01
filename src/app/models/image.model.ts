import {FileHandle} from "./file-handle.model";

export class Image {
  id: number;
  name: string;
  type: string;
  picByte: Uint8Array;

  constructor() {
    this.id = 0
    this.name = '';
    this.type = '';
    this.picByte = new Uint8Array;
  }

}
