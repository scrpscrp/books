export function filterByTitleOrAuthor<T extends { title: string; author: string }>(
    items: T[], 
    searchTerm: string
  ): T[] {
    const searchTermLower = searchTerm.toLowerCase();
    return items.filter(
      item => 
        item.title.toLowerCase().includes(searchTermLower) || 
        item.author.toLowerCase().includes(searchTermLower)
    );
  }