export class UpdateEntityFailed extends Error {
  reason: string;
  constructor(id: string | number, entityName: string, reason?: string, paramIdName: string = 'id') {
    super(`Pembaharuan data ${entityName} dengan ${paramIdName} ${id} tidak berhasil disimpan.`);
    reason && (this.reason = reason);
  }
}
