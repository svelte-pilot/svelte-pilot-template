export type RenderResult = {
  status: number,
  headers: Record<string, string>,

  body: {
    head: string,
    html: string,
    css: string
  }
};
