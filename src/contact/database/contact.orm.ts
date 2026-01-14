import { Column, Entity } from 'typeorm';
import { BaseOrmEntity } from '../../utils/bse-orm/base.orm-entity';

@Entity('contacts')
export class Contact extends BaseOrmEntity {

    @Column({ nullable: false })
    first_name: string;

    @Column({ nullable: false })
    last_name: string;

    @Column({nullable: false})
    email: string;

    @Column({ nullable: false })
    phone_number: string;

    @Column({ nullable: false })
    note: string;

    @Column({ nullable: false })
    reply: string;
}