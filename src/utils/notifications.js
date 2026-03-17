/**
 * Resolves a notification for display based on user's team and role.
 * Admins see full detail; target team sees full; broadcast teams see summary; others don't see.
 */
export const resolveNotification = (notification, userTeam, userRole) => {
  if (userRole === 'Admin') return { visible: true, message: notification.fullMessage };
  if (!notification.targetTeam) return { visible: true, message: notification.fullMessage };
  if (notification.targetTeam === userTeam) return { visible: true, message: notification.fullMessage };
  if (notification.broadcastTeams?.includes(userTeam)) return { visible: true, message: notification.summaryMessage };
  return { visible: false, message: null };
};
