import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private ratingRepository: Repository<Rating>,
    @InjectRepository(Student) private studentRepository: Repository<Student>) { }

  async create(createRatingDto: CreateRatingDto) {
    try {
      const { rate, studentId } = createRatingDto
      const student = await this.studentRepository.findOne({ where: { id: studentId } })
      if (student) {
        return await this.ratingRepository.save({ rate, student })
      } else {
        return { message: "Student doesn'1 exist" }
      }
    } catch (e) {
      return { message: "Could not add rating" }
    }
  }

  async findAll() {
    try {
      return await this.ratingRepository.find({ relations: { student: true } })
    }
    catch (e) {
      return { message: "Could not find ratings" }
    }
  }

  async findOne(id: number) {
    try {
      const rating = await this.ratingRepository.findOneBy({ id })
      if (rating) {
        return rating
      } else {
        return { message: "Rating doesn'1 exist" }
      }
    }
    catch (e) {
      return { message: "Could not find rating" }
    }
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    try {
      const rating = await this.ratingRepository.findOneBy({ id })
      if (rating) {
        const {rate, studentId} = updateRatingDto
        await this.ratingRepository.update(id, {rate, studentId})
        return { message: "Rating was updated" }
      } else {
        return { message: "Rating doesn'1 exist" }
      }
    }
    catch (e) {
      return { message: "Could not update rating" }
    }
  }

  async remove(id: number) {
    try {
      const rating = await this.ratingRepository.findOneBy({ id })
      if (rating) {
        await this.ratingRepository.delete(id)
        return { message: "Rating was deleted" }
      } else {
        return { message: "Rating doesn'1 exist" }
      }
    }
    catch (e) {
      return { message: "Could not remove rating" }
    }
  }
}
