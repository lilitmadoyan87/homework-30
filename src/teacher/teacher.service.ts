import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(@InjectRepository(Teacher) private teacherRepository: Repository<Teacher>) { }

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const teacher = await this.teacherRepository.findOne({ where: { email: createTeacherDto.email } })
      if (teacher) {
        return { message: "Teacher already exists" }
      } else {
        return await this.teacherRepository.save(createTeacherDto)
      }
    } catch (e) {
      return { message: "Could not create teacher" }
    }
  }

  async findAll() {
    try {
      return await this.teacherRepository.find()
    } catch (e) {
      return { message: "Could not find teachers" }
    }
  }

  async findOne(id: number) {
    try {
      const teacher = await this.teacherRepository.findOne({
        where: { id },
        relations: { groups: true }
      })
      return teacher || { message: "Teacher doesn'1 exist" }
    } catch (e) {
      return { message: "Could not find teacher" }
    }
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      const teacher = await this.teacherRepository.findOneBy({ id })
      if (teacher) {
        await this.teacherRepository.update(id, updateTeacherDto)
        return { message: "Teacher was updated" }
      } else {
        return { message: "Teacher doesn'1 exist" }
      }
    } catch (e) {
      return { message: "Could not update teacher" }
    }
  }

  async remove(id: number) {
    try {
      const teacher = await this.teacherRepository.findOneBy({ id })
      if (teacher) {
        await this.teacherRepository.delete(id)
        return { message: "Teacher was deleted" }
      } else {
        return { message: "Teacher doesn'1 exist" }
      }
    } catch (e) {
      return { message: "Could not find teacher" }
    }
  }
}
