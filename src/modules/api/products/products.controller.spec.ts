import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PaginatedProductsDTO, ProductDTO } from './dto/create-product.dto';
import { ExecutionContext } from '@nestjs/common';
import { PrismaModule } from '@/modules/common/prisma/prisma.module';
import { AdminGuard } from '@/libs/common/admin.guard';
import { UpdateProductDTO } from '@/modules/api/products/dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productService: ProductsService;
  let guard: AdminGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
      imports: [
        PrismaModule,
      ],
    })
      .overrideGuard(AdminGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          return true; // Mocking the guard to always allow access
        },
      })
      .compile();

    controller = module.get(ProductsController);
    productService = module.get(ProductsService);
    guard = module.get(AdminGuard);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product if guard allows', async () => {
      const productDTO = {
        name: 'Test Product',
        description: 'Test Description',
        price: '100.00',
        stock: 5,
        brand: 'Rolex',
        referenceNumber: 'ABC123456789'
      };

      const createdProduct: ProductDTO = {
        id: 1,
        ...productDTO,
      };

      jest.spyOn(productService, 'create').mockResolvedValue(createdProduct);
      jest.spyOn(guard, 'canActivate').mockReturnValue(Promise.resolve(true)); // Guard allows access

      const result = await controller.create(productDTO);
      expect(result).toBe(createdProduct);
      expect(productService.create).toHaveBeenCalledWith(productDTO);
    });

    it('should not create a new product if guard denies access', async () => {
      jest.spyOn(guard, 'canActivate').mockReturnValue(Promise.resolve(false)); // Guard denies access

      const productDTO = {
        name: 'Test Product',
        description: 'Test Description',
        price: '100.00',
        stock: 5,
        brand: 'Rolex',
        referenceNumber: 'ABC123456789',
      };

      try {
        await controller.create(productDTO);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('findAll', () => {
    it('should find all products', async () => {
      const page = 1;
      const pageSize = 10;
      const paginatedProducts: PaginatedProductsDTO = {
        data: [{
          id: 1,
          name: 'Test Product',
          description: 'Test Description',
          price: '100.00',
          stock: 5,
          brand: 'Rolex',
          referenceNumber: 'ABC123456789'
        }],
        total: 0,
        page,
        pageSize,
        totalPages : 10
      };

      jest.spyOn(productService, 'findAll').mockResolvedValue(paginatedProducts);

      const result = await controller.findAll(page, pageSize);
      expect(result).toBe(paginatedProducts);
    });
  });

  describe('search', () => {
    it('should return a paginated list of products', async () => {
      const paginatedProducts: PaginatedProductsDTO = {
        data: [{ id: 1, name: 'Test Product', description: 'Test Description',  price: '100.00', stock: 5, brand: 'Brand', referenceNumber: 'ABC123456789' }],
        total: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      };

      jest.spyOn(productService, 'search').mockResolvedValue(paginatedProducts);

      const query = 'Test';
      const page = 1;
      const pageSize = 10;

      const result = await controller.search(query, page, pageSize);
      expect(result).toBe(paginatedProducts);
      expect(productService.search).toHaveBeenCalledWith(query, page, pageSize);
    });
  });

  describe('findOne', () => {
    it('should return product details', async () => {
      const product: ProductDTO = { id: 1, name: 'Test Product', description: 'Test Description',  price: '100.00', stock: 5, brand: 'Brand', referenceNumber: 'ABC123456789' };

      jest.spyOn(productService, 'findOne').mockResolvedValue(product);

      const id = 1;

      const result = await controller.findOne(id);
      expect(result).toBe(product);
      expect(productService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a product if guard allows', async () => {
      const updateProductDTO: UpdateProductDTO = { name: 'Updated Product', description: 'Updated Description',  price: '100.00', stock: 10, brand: 'Updated Brand' };
      const updatedProduct: ProductDTO = { id: 1, name: 'Updated Product', description: 'Updated Description',  price: '100.00', stock: 10, brand: 'Updated Brand', referenceNumber: 'ABC123456789' };

      jest.spyOn(productService, 'update').mockResolvedValue(updatedProduct);
      jest.spyOn(guard, 'canActivate').mockReturnValue(Promise.resolve(true)); // Guard allows access

      const id = 1;

      const result = await controller.update(id, updateProductDTO);
      expect(result).toBe(updatedProduct);
      expect(productService.update).toHaveBeenCalledWith(id, updateProductDTO);
    });

    it('should not update a product if guard denies access', async () => {
      jest.spyOn(guard, 'canActivate').mockReturnValue(Promise.resolve(false)); // Guard denies access

      const id = 1;
      const updateProductDTO: UpdateProductDTO = { name: 'Updated Product', description: 'Updated Description',  price: '100.00', stock: 10, brand: 'Updated Brand' };

      try {
        await controller.update(id, updateProductDTO)
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});

