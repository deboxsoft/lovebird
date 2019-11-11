export class UpdateEntityFailed extends Error {
  code?: string;
  constructor(id: string | number, entityName: string, code?: string, paramIdName: string = 'id') {
    super(`Pembaharuan data ${entityName} dengan ${paramIdName} ${id} tidak berhasil disimpan.`);
    this.code = code;
  }
}
