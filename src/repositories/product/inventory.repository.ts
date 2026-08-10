import BaseRepository from "../base/BaseRepository.js";
import { IInventory, inventorySchema } from "../../models/inventory.Schema.js";

class InventoryRepository extends BaseRepository<IInventory> {
  constructor() {
    super("Inventory", inventorySchema);
  }
}

export default new InventoryRepository();
