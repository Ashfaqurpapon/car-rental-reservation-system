import { Product } from '../product/product.model';
import { IProductCategory } from './ProductCategory.interface';
import { ProductCategory } from './ProductCategory.model';

const getAllProductCategory = async () => {
  const result = await ProductCategory.find();
  return result;
};
const getAllProductsByCategory = async (productCategoryId: string) => {
  const result = await Product.find({ productCategory: productCategoryId });
  return result;
};

//vendor can do
const createProductCategoryIntoDB = async (
  payLoad: IProductCategory,
): Promise<IProductCategory> => {
  const productCategory = new ProductCategory(payLoad);
  return await productCategory.save();
};

export const ProductCategoryServices = {
  createProductCategoryIntoDB,
  getAllProductCategory,
  getAllProductsByCategory,
};
