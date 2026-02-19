export type DatabaseStatus = {
  provider: 'memory';
  healthy: boolean;
};

export const databaseStatus: DatabaseStatus = {
  provider: 'memory',
  healthy: true
};
