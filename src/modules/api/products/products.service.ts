import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/modules/common/prisma/prisma.service';
import { CreateProductDTO, PaginatedProductsDTO, ProductDTO } from '@/modules/api/products/dto/create-product.dto';
import { Prisma, Product } from '@prisma/client';
import { UpdateProductDTO } from '@/modules/api/products/dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDTO: CreateProductDTO): Promise<ProductDTO> {
    const { price, ...productData } = createProductDTO;
    const parsedPrice = parseFloat(price);

    if (isNaN(parsedPrice)) {
      throw new BadRequestException('Invalid price format');
    }

    try {
      const createdProduct= await this.prisma.product.create({
        data: {
          ...productData,
          price: parsedPrice,
        },
        select: {id: true, name: true, description: true, price: true, stock: true, brand: true, referenceNumber: true}
      });

      const product: Product = createdProduct as Product;

      return {
        id: product.id,
        name: product.name,
        brand: product.brand,
        description: product.description,
        referenceNumber: product.referenceNumber,
        stock: product.stock,
        price: product.price.toString()
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async findAll(page: number = 1, pageSize: number): Promise<PaginatedProductsDTO> {
    try {
      const skip = (page - 1) * pageSize;
      const take = pageSize;

      const products: Product[] = await this.prisma.product.findMany({
        skip,
        take,
      });

      const data: ProductDTO[] = products.map((product: Product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock,
        brand: product.brand,
        referenceNumber: product.referenceNumber,
      }));

      const total: number = await this.prisma.product.count();

      return {
        data,
        total,
        page,
        pageSize: take,
        totalPages: Math.ceil(total / take),
      };
    } catch (error) {
      throw new NotFoundException('Products not found')
    }
  }

  async findOne(id: number): Promise<ProductDTO> {
    const fetchedProduct = await this.prisma.product.findUnique({ where: { id } });

    if (!fetchedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const product: Product = fetchedProduct as Product;

    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      description: product.description,
      referenceNumber: product.referenceNumber,
      stock: product.stock,
      price: product.price.toString()
    }
  }

  async update(id: number, updateProductDTO: UpdateProductDTO): Promise<ProductDTO> {

    const existingProduct = await this.prisma.product.findUnique({ where: { id } });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: updateProductDTO,
      });

      const product: Product = updatedProduct as Product;

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock,
        brand: product.brand,
        referenceNumber: product.referenceNumber,
      };
    } catch (error) {
      throw new InternalServerErrorException('Product update failed');
    }
  }

  async search(query: string, page: number, pageSize: number): Promise<PaginatedProductsDTO> {
    try {
      const skip = (page - 1) * pageSize;

      const whereClause: Prisma.ProductWhereInput = {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { referenceNumber: { contains: query, mode: 'insensitive' } },
        ],
      };

      // Fetch the products based on the query, pagination and page size
      const products = await this.prisma.product.findMany({
        where: whereClause,
        skip,
        take: pageSize,
      });

      // Count the total number of products matching the query
      const total = await this.prisma.product.count({
        where: whereClause,
      });

      // Map the fetched products to the ProductDTO format
      const data: ProductDTO[] = products.map((product: Product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock,
        brand: product.brand,
        referenceNumber: product.referenceNumber,
      }));

      return {
        data,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (error) {
      throw new NotFoundException('Products not found')
    }
  }
}
