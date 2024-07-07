import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '@/libs/common/admin.guard';
import { ProductsService } from '@/modules/api/products/products.service';
import {
  CreateProductDTO, PaginatedProductsDTO,
  ProductDTO,
} from '@/modules/api/products/dto/create-product.dto';
import { UpdateProductDTO } from '@/modules/api/products/dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {

  constructor(
    private readonly productService: ProductsService
  ) {}

  @Post('create')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The product has been successfully created.',
    type: ProductDTO
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: CreateProductDTO })
  async create(@Body() createProductDTO: CreateProductDTO) {
    return await this.productService.create(createProductDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of products with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'List of products retrieved successfully',
    type: PaginatedProductsDTO,
  })
  @ApiResponse({ status: 404, description: 'Products not found'})
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number
  )
  {
    return await this.productService.findAll(Number(page), Number(pageSize));
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products by name or reference number.' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'List of products retrieved successfully',
    type: PaginatedProductsDTO,
  })
  @ApiResponse({ status: 404, description: 'Products not found'})
  async search(
    @Query('query') query: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number
  ) {
    return await this.productService.search(query, page, pageSize);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve product details' })
  @ApiResponse({
    status: 200,
    description: 'Product details',
    type: ProductDTO,
  })
  @ApiResponse({ status: 404, description: 'Products not found'})
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully', type: ProductDTO })
  @ApiResponse({ status: 404, description: 'Product not found'})
  @ApiResponse({ status: 500, description: 'Product update failed'})
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDTO: UpdateProductDTO
  ) {
    return await this.productService.update(id, updateProductDTO);
  }

}
