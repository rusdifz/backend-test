export function paginateArray<T>(
  data: T[],
  page: number,
  limit: number,
): { data: T[]; count: number } {
  const offset = (page - 1) * limit;
  const paginatedData =
    data.length > 0 ? data.slice(offset, offset + limit) : [];

  return { data: paginatedData, count: data.length };
}
