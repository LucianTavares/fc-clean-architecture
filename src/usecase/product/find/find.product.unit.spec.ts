import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product A", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit teste find product use case", () => {

    it("should find a product", async () => {
        const productMockRepository = MockRepository();
        const usecase = new FindProductUseCase(productMockRepository);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Product A",
            price: 10
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("should not find a product", async () => {
        const productMockRepository = MockRepository();
        const usecase = new FindProductUseCase(productMockRepository);

        const input = {
            id: "456"
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found")
    })
})