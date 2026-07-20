import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: number): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
  }

  findCategories(): Promise<string[]> {
    return this.productsRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .getRawMany()
      .then((rows) => rows.map((r) => r.category));
  }

  findByCategory(category: string): Promise<Product[]> {
    return this.productsRepository.findBy({ category });
  }
}