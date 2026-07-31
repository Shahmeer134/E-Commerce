import BaseRepository from "../base/BaseRepository";
import { IInventory, inventorySchema } from "../../models/inventory.Schema";

class InventoryRepository extends BaseRepository<IInventory> {
  constructor() {
    super("Inventory", inventorySchema);
  }
}

export default new InventoryRepository();
