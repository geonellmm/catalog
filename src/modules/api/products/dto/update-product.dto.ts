import { IsDecimal, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Luxury Watch' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'A luxury watch with diamonds' })
  description?: string;

  @IsOptional()
  @IsDecimal()
  @ApiProperty({ example: '999.99' })
  price?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ example: 5 })
  stock?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Rolex' })
  brand?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'ABC123456789' })
  referenceNumber?: string;
}
