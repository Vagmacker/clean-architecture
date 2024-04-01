import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export default class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryInterface) {}

    async execute(aCommand: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const aProduct = ProductFactory.create('a', aCommand.name, aCommand.price);
        
        await this.productRepository.create(new Product(aProduct.id, aProduct.name, aProduct.price));

        return {
            id: aProduct.id,
            name: aProduct.name,
            price: aProduct.price
        }
    }
}