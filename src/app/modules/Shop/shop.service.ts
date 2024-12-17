import { IShop } from './shop.interface';
import { Shop } from './shop.model';

// admin function
const blacklistVendorShop = async () => {};

//vendor function
const createShopIntoDB = async (payLoad: IShop): Promise<IShop> => {
  const shop = new Shop(payLoad);
  return await shop.save();
};
const updateShopInfoInDB = async (shopId: string, payload: Partial<IShop>) => {
  const result = await Shop.findByIdAndUpdate(shopId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const viewOrderHistoryForHisShop = async () => {};

const getAllVendorShops = async (vendorId: string) => {
  const result = await Shop.find({ vendorId: vendorId });
  return result;
};
const getSingleShopByShopId = async (shopId: string) => {
  const result = Shop.findById(shopId);
  return result;
};

export const ShopServices = {
  blacklistVendorShop,
  createShopIntoDB,
  updateShopInfoInDB,
  viewOrderHistoryForHisShop,
  getAllVendorShops,
  getSingleShopByShopId,
};
