import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class JobReq {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  startAt: string;

  @IsOptional()
  @IsString()
  repeatAt: string;

  @IsOptional()
  @IsString()
  repeatInterval: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;
}
