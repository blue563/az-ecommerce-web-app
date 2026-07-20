import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './products/product.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const repo = app.get(getRepositoryToken(Product));

  const existingCount = await repo.count(); //befor import from Fake Store API check if they has been imported already to avoid duplicates due to accidental rerun of this script
  if (existingCount > 0) {
    console.log(`Database already has ${existingCount} products, skipping seed.`);
    await app.close();
    return;
  }

  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();

  for (const p of products) {
    await repo.save({
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.image,
    });
  }

  console.log(`Seeded ${products.length} products.`);
  await app.close();
}

seed();