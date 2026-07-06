export function paginate<T>(items: T[], currentPage: number, pageSize: number): T[] {  
  const startIndex = (currentPage - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}

export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}

