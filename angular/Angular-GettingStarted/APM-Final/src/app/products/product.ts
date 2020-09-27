export interface IProduct {
  productId: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

export function judgeText(str: any) {
  if (!!str && !!str.replace(/\s*/g, '')) {
    // str = str.replace(/\\/g, '');
    return true;
  }
}

export class testabc {
  productId: number = 2;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}