const generateId = (items: { id: number }[]) => {
  return items.length === 0 ? 1 : Math.max(...items.map((item) => item.id)) + 1;
};

export default generateId;
