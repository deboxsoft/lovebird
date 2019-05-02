export class RemoveEntityFailed extends Error {
  reason: string;

  public constructor(
    id: string | number | string[] | number[],
    entityName: string,
    reason?: string,
    paramIdName: string = 'id'
  ) {
    id = Array.isArray(id) ? `[${id.join(',')}]` : id;
    super(`Penghapusan data '${entityName}' tidak berhasil.`);
    reason && (this.reason = reason);
  }
}
