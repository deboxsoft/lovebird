export class CreateEntityFailed extends Error {
  reason: string;

  public constructor(entityName: string, reason?: string) {
    super(`Penambahan data '${entityName}' tidak berhasil.`);
    reason && (this.reason = reason);
  }
}
