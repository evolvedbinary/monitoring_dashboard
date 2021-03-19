export type DatabaseStatus = 'OPERATIONAL';
export interface Database {
  existHome: string;
  uptime: number;
  status: DatabaseStatus;
  reservedMem: number;
  activeBrokers: number;
  maxBrokers: number;
  availableBrokers: number;
  totalBrokers: number;
  collectionCacheMem: number;
  cacheMem: number;
  instanceId: string;
}
