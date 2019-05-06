import { CreateDateColumn, UpdateDateColumn } from '@deboxsoft/typeorm';

export abstract class BaseModel {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;
}
