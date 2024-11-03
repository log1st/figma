export const isComponentNode = (
  node?: BaseNode | null,
): node is ComponentNode => node?.type === "COMPONENT";
