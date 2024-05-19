import { Student } from "src/student/entities/student.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    rate: number;
    
    @JoinColumn()
    studentId: number;

    @ManyToOne(type => Student, student => student.ratings)
    student: Student
}
