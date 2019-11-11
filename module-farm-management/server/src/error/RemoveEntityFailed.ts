export class RemoveEntityFailed extends Error {
  code?: string;

  public constructor(
    id: string | number | string[] | number[],
    entityName: string,
    code?: string,
    paramIdName: string = 'id'
  ) {
    id = Array.isArray(id) ? `[${id.join(',')}]` : id;
    super(`Penghapusan data '${entityName}' tidak berhasil.`);
    this.code = code;
  }
}
