import Product from "../../../domain/product/entity/product";
import { OutputListProductDto } from "./list.product.dto";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export default class ListProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryInterface) {

    }

    async execute(): Promise<OutputListProductDto> {
        return OutputMapper.toOutput((await this.productRepository.findAll()))
    }
}

class OutputMapper {
    static toOutput(aProducts: Product[]): OutputListProductDto {
        return {
            products: aProducts.map((p) => ({
              id: p.id,
              name: p.name,
              price: p.price
            })),
          };
    }
}