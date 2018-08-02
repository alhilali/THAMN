export class ProviderModel {
  id: number;
  name: string;
  img: string;
  description: string;
  price: string;
  packages: PackageModel[];
}

export class BannerModel {
  name: string;
  img: string;
  description: string;
  type: string;
  price?: string;
  id?: number;
}

export class PackageModel {
  name: string;
  description: string;
  price: string;
}

export class FileModel {
  id: number;
  filepath: string;
  name: string;
}