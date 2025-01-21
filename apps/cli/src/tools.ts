export function transpose(matrix: Array<Array<number>>) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}
