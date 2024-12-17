import { IProduct } from './product.interface';
import { Product } from './product.model';

//user can do
const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};
const getSingleProductByProductID = async (id: string) => {
  const result = Product.findById(id);
  return result;
};

//vendor can do
const createProductIntoDB = async (payLoad: IProduct): Promise<IProduct> => {
  const product = new Product(payLoad);
  return await product.save();
};
const updateProductInfoInDB = async (
  productId: string,
  payload: Partial<IProduct>,
) => {
  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const result = await Product.findByIdAndUpdate(productId, {
    isDeleted: true,
  });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  deleteProductFromDB,
  getAllProducts,
  getSingleProductByProductID,
  updateProductInfoInDB,
};
