import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';
import { Field } from './field.entity';
import { BaseEntity } from '@common/database/entities/base.entity';

@Entity('field_image')
export class FieldImage extends BaseEntity {
  @ManyToOne(() => Field, (field) => field.images)
  field: Field;

  @Column({ type: 'varchar', length: 255 })
  image_url: string;
}
