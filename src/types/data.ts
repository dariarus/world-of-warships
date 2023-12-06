export type TWarship = {
  id: string,
  title: string,
  description: string,
  icons: {
    large: string,
    medium: string
  },
  level: number,
  type: {
    name: string,
    title: string,
    icons: {
      default: string,
    },
  },
  nation: {
    name: string,
    title: string,
    color: string,
    icons: {
      small: string | null,
      medium: string | null,
      large: string | null,
    },
  },
}

export type TError = {
  message?: string
};

export enum SliderItemActivator {
  // активатор при загрузке страницы
  INITIAL = 'initial',
  SLIDER = 'slider',
  FULL_LIST = 'full-list'
}