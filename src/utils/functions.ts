import {SliderItemStore} from '../stores/slider-item-store';

export function getResponseData<T>(res: Response): Promise<T> {
  if (!res.ok) {
    return res.text().then(text => {
      throw new Error(`Ошибка: ${text}`)
    })
  }
  return res.json();
}

export function arraysEqual<T>(a: T[], b: T[]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export const getWarshipsToShow = (originalWarshipsArray: SliderItemStore[], sliceEnd: number) => {
  return originalWarshipsArray.slice(0, sliceEnd)
}