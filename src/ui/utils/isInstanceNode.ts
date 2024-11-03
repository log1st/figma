export const isInstanceNode = (node?: BaseNode | null): node is InstanceNode =>
  node?.type === "INSTANCE";
