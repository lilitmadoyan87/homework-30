import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/group/entities/group.entity';
import { Rating } from 'src/rating/entities/rating.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(Rating) private ratingRepository: Repository<Rating>) { }

  async create(createStudentDto: CreateStudentDto) {
    try {
      const group = await this.groupRepository.findOne({ where: { id: createStudentDto.groupId } })
      if (group) {
        const { name, surname, age, email, password } = createStudentDto
        const student = await this.studentRepository.findOne({ where: { email } })
        if (student) {
          return { message: "Student already exists" }
        } else {
          const newSt = await this.studentRepository.save({ name, surname, age, email, password, group })
          return newSt
        }
      } else {
        return { message: "Group doesn't exist" }
      }
    } catch (e) {
      return { message: "Could not create student" }
    }
  }

  async findAll() {
    try {
      return await this.studentRepository.find()
    } catch (e) {
      return { message: "Could not get students" }
    }
  }

  async findOne(id: number) {
    try {
      const student = await this.studentRepository.findOne({
        where: { id },
        relations: ["group", "group.teacher", "ratings"]
      })
      // const student = await this.studentRepository
      //   .createQueryBuilder("student")
      //   .where("student.id=:id", { id })
      //   .innerJoinAndSelect("student.group", "group")
      //   .innerJoinAndSelect("student.ratings", "rating")
      //   .innerJoinAndSelect("group.teacher", "teacher")
      //   .getOne()
      if (student) {
        return student
      } else {
        return { message: "Student doesn't exist" }
      }
    } catch (e) {
      return { message: "Could not get student" }
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      const student = await this.studentRepository.findOneBy({ id })
      if (student) {
        const { name, surname, age, email } = updateStudentDto
        await this.studentRepository.update(id, {name, surname, age, email})
        return { message: "Student was updated" }
      } else {
        return { message: "Student doesn'1 exist" }
      }
    } catch (e) {
      return { message: "Could not update student" }
    }
  }

  async remove(id: number) {
    try {
      const student = await this.studentRepository.findOneBy({ id })
      if (student) {
        await this.studentRepository.delete(id)
        return { message: "Student was deleted" }
      } else {
        return { message: "Student doesn'1 exist" }
      }
    } catch (e) {
      return { message: "Could not remove student" }
    }
  }
}
