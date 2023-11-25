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
      small: string,
      medium: string,
      large: string,
    },
  },
}

export type TError = {
  message?: string
};

// export interface IWarshipsDataState {
//   isLoading: boolean,
//   warships: Array<TWarships>,
//   isError: boolean,
//   error: TError
// }