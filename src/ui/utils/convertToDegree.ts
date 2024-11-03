export function convertToDegree(matrix: Transform): number {
  const values = [...matrix[0], ...matrix[1]];
  const a = values[0];
  const b = values[1];
  const angle = Number((Math.atan2(b, a) * (180 / Math.PI) + 90).toFixed(2));

  return angle <= 0 ? angle + 360 : angle;
}
