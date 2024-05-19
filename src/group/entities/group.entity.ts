import { Student } from "src/student/entities/student.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    count: number;
    
    @JoinColumn()
    teacherId: number

    @ManyToOne(type => Teacher, teacher => teacher.groups)
    // @JoinColumn({ name: teacher_id })
    // teacher_id: number
    teacher: Teacher

    @OneToMany(type => Student, student => student.group)
    students: Student[]
}
