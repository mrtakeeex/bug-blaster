export const sortTickets = (tickets, sortPreference) => {
  switch (sortPreference) {
    case "High to Low":
      return [...tickets].sort((a, b) => b.priority.localeCompare(a.priority));
    case "Low to High":
      return [...tickets].sort((a, b) => a.priority.localeCompare(b.priority));
    default:
      return tickets;
  }
};
