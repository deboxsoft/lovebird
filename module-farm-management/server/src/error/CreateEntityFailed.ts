export class CreateEntityFailed extends Error {
  code?: string;

  public constructor(entityName: string, code?: string) {
    super(`Penambahan data '${entityName}' tidak berhasil.`);
    this.code = code;
  }
}
