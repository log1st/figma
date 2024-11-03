export const isComponentSetNode = (
  node?: BaseNode | null,
): node is ComponentSetNode => node?.type === "COMPONENT_SET";
