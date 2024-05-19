import { Group } from "src/group/entities/group.entity";
import { Rating } from "src/rating/entities/rating.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    surname: string;
    @Column()
    email: string;
    @Column()
    age: number;
    @Column()
    password: string;

    @ManyToOne(type => Group, group => group.students)
    group: Group

    @OneToMany(type=>Rating, rating=>rating.student)
    ratings:Rating[]
}

