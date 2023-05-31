export default function getPaginationNumber(totalCount: number, limit: number) {
  const result: number[] = [];
  for (let i = 1; i <= totalCount / limit; i++) {
    result.push(i);
  }
  return result;
}
