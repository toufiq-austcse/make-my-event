import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class AppBaseEntity {
  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', select: false })
  updatedAt: Date;
}
