import { IsNotEmpty, IsOptional, IsString, IsDecimal, IsInt, IsPositive } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Luxury Watch' })
  name: string;

  @ApiProperty({ example: 'A luxury watch with diamonds' })
  description: string;

  @ApiProperty({ example: '999.99' })
  price: string;

  @ApiProperty({ example: 5 })
  stock: number;

  @ApiProperty({ example: 'Rolex' })
  brand: string;

  @ApiProperty({ example: 'ABC123456789', description: 'Must unique' })
  referenceNumber: string;
}
export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Luxury Watch' })
  name: string;

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
  brand: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'ABC123456789' })
  referenceNumber: string;
}

export class PaginatedProductsDTO {
  @ApiProperty({ type: [ProductDTO] })
  data: ProductDTO[];

  @ApiProperty({ example: 1 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  pageSize: number;

  @ApiProperty({ example: 1 })
  totalPages: number;
}

