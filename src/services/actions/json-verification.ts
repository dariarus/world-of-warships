export function getResponseData<T>(res: Response): Promise<T> {
  if (!res.ok) {
    return res.text().then(text => {
      throw new Error(`Ошибка: ${text}`)
    })
  }
  return res.json();
}
