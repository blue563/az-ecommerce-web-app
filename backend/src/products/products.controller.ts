import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('categories')
  findCategories() {
    return this.productsService.findCategories();
  }

  @Get('category/:name')
  findByCategory(@Param('name') name: string) {
    return this.productsService.findByCategory(name);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
}