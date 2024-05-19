import { ApiProperty } from "@nestjs/swagger";

export class CreateRatingDto {
    @ApiProperty()
    rate: number;
    @ApiProperty()
    studentId:number
}
