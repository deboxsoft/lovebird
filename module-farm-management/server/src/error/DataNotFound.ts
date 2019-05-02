export class DataNotFound extends Error {
  reason: string;

  constructor(entityName: string, id: string | number, reason?: string, paramIdName: string = 'id') {
    super(`Data "${entityName}" dengan "${id}" tidak ditemukan.`);
    reason && (this.reason = reason);
  }
}
