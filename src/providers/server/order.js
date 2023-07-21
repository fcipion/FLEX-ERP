import Base from "../base";
import { url } from "../../api/Peticiones";

class Order extends Base {
  constructor() {
    super({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("serviceToken")}`,
      },
    });
  }

  async getFileOrderSession(data) {
    return this.post("/order/visor-files", data);
  }
}

export default new Order();
