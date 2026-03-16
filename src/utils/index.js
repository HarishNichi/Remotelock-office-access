/**
 * Filters members based on a search query (name or email).
 */
export const filterMembers = (members, query) => {
  if (!query) return members;
  const lowerQuery = query.toLowerCase();
  return members.filter(
    (m) =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.email.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Filters logs based on a search query.
 */
export const filterLogs = (logs, query) => {
  if (!query) return logs;
  const lowerQuery = query.toLowerCase();
  return logs.filter(
    (l) =>
      l.user.toLowerCase().includes(lowerQuery) ||
      l.door.toLowerCase().includes(lowerQuery) ||
      l.method.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Formats a date string for display.
 */
export const formatDate = (dateString) => {
  return dateString; // Simplified for mock
};
