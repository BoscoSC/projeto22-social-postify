export class Post {
  public id: number;
  public title: string;
  public text: string;
  public image?: string;

  constructor(id: number, title: string, text: string, image?: string) {
    this.id = id;
    this.title = title;
    this.text = text;
    if (image) {
      this.image = image;
    }
  }

  get _id() {
    return this._id;
  }

  set _title(title: string) {
    this.title = title;
  }

  set _text(text: string) {
    this.text = text;
  }

  set _image(image: string) {
    this.image = image;
  }
}
