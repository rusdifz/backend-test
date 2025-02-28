import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  street: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  suite: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  zipcode: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  geo_lat: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  geo_lng: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  company_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  company_catchPhrase: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  company_bs: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  updated_by?: string;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
