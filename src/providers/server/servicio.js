import Base from "../base";
import { url } from "../../api/Peticiones";

class Servicio extends Base {
  constructor() {
    super({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("serviceToken")}`,
      },
    });
  }

  formatDataOrder(vendedor, data) {
    let _data = { ...data };
    let formdata = new FormData();
    let details = [];

    Array.from(_data.detalles || []).forEach((__data) => {
      let galeries = [];

      Array.from(__data.galeria || []).forEach((data) => {
        const file = data.file || {};

        galeries.push({
          name: data.customName || data.name,
          size: file.size || data.size,
          ...(data.src ? { src: data.src } : {}),
        });
      });

      details.push({
        ...__data,
        galeria: galeries,
      });
    });

    formdata.append("sucursal", _data.sucursal);
    formdata.append("cliente", _data.cliente);
    formdata.append("doctor", _data.doctor);
    formdata.append("vendedor", vendedor);
    formdata.append("comentarios", _data.comentarios);
    formdata.append("fecha", _data.fecha);
    formdata.append("fecha_compromiso", _data.fecha_compromiso);
    formdata.append("estatus", _data.estatus);
    formdata.append("compania", "");
    formdata.append("detalles", JSON.stringify(details));

    return formdata;
  }

  async create(data) {
    return this.post("/registro_orden_servicio", data);
  }

  async updateOrder(id, data) {
    return this.update(`/actualizar_orden_servicio/${id}`, data);
  }
}

export default new Servicio();
