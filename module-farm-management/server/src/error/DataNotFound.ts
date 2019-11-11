export class DataNotFound extends Error {
  code?: string;

  constructor(entityName: string, id: string | number, code?: string, paramIdName: string = 'id') {
    super(`Data "${entityName}" dengan "${id}" tidak ditemukan.`);
    this.code = code;
  }
}
