// Simple in-memory store for connected users
let connectedUsers = new Set<string>();

export const userCountStore = {
  addUser(userId: string) {
    connectedUsers.add(userId);
    return connectedUsers.size;
  },

  removeUser(userId: string) {
    connectedUsers.delete(userId);
    return connectedUsers.size;
  },

  getCount() {
    return connectedUsers.size;
  }
};