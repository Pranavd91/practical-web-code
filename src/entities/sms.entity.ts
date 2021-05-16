import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";

@Entity("SMS")
export class SMS  {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    status: string;

    @Column()
    cost: number;

    @Column()
    segment: number;

    @Column()
    fromNumber: number;

    @Column()
    toNumber: number;

    @Column()
    message: string;

    @Column()
    created_on: Date;
}


