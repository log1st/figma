export const isPageNode = (node?: BaseNode | null): node is PageNode =>
  node?.type === "PAGE";
