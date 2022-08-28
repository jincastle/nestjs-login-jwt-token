import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
}
