import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>) { }

  async create(createGroupDto: CreateGroupDto) {
    try {
      const teacher = await this.teacherRepository.findOne({ where: { id: createGroupDto.teacherId } })
      if (teacher) {
        const { name, count} = createGroupDto
       const group = await this.groupRepository.findOne({where: {name}}) 
        if(group){
          return { message: "Group already exists" }
        }else{
          return await this.groupRepository.save({ name, count, teacher})
        }
      } else {
        return { message: "Teacher does not exist" }
      }
    } catch (e) {
      return { message: "Could not create group" }
    }
  }

  async findAll() {
    try {
      return await this.groupRepository.find()
    } catch (e) {
      return { message: "Could not get groups" }
    }
  }

  async findOne(id: number) {
    try {
      const group = await this.groupRepository.findOne({
        where: { id }, relations: {
          teacher: true,
          students: true
        }
      })
      return group || { message: "Group does not exist" }
    } catch (e) {
      return { message: "Could not find group" }
    }
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    try {
      const group = await this.groupRepository.findOneBy({ id })
      if (group) {
        await this.groupRepository.update(id, updateGroupDto)
        return { message: "Group was updated" }
      } else {
        return { message: "Group does not exist" }
      }
    } catch (e) {
      return { message: "Could not update group" }
    }
  }

  async remove(id: number) {
    try {
      const group = await this.groupRepository.findOneBy({ id })
      if (group) {
        await this.groupRepository.delete(id)
        return { message: "Group was deleted" }
      } else {
        return { message: "Group does not exist" }
      }
    } catch (e) {
      return { message: "Could not delete group" }
    }
  }
}
