export function formatPostTime(createdAt) {
    const now = new Date();
    const postTime = new Date(createdAt);
    const diff = Math.floor((now - postTime) / 1000); // in seconds
  
    if (diff < 60) return `${diff} s`;
    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} h`;
    const days = Math.floor(hours / 24);
    return `${days} d`;
  }
  