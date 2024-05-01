import {FileHandle} from "./file-handle.model";

export class AddMovie {
  id: number;
  name: string;
  description: string;
  thumbnail: FileHandle;
  videoUrl: string;
  categoryId: number;

  constructor() {
    this.id = 0
    this.name = '';
    this.description = '';
    this.thumbnail = new FileHandle(new File([''], 'defaultFile.txt'));
    this.videoUrl = '';
    this.categoryId = 0;
  }

}
