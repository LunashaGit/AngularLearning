export class Upload {
  public id?: number | null;
  public image_name?: string | File;
  public image_url?: string | null;
  constructor(
    id: number | null,
    image_name: string | File,
    image_url: string | null
  ) {
    this.id = id;
    this.image_name = image_name;
    this.image_url = image_url;
  }
}
