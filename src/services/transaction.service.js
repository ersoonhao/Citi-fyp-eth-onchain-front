import http from "../http-common";

class TransactionDataService {
  getAllPrimo() {
    return http.get("/read_primo");
  }

  getPrimo(id) {
    return http.get(`/one_primo/${id}`);
  }

  getAllSgx() {
    return http.get("/read_sgx");
  }

  getSgx(id) {
    return http.get(`/one_sgx/${id}`);
  }

  getAllReconcile() {
    return http.get("/read_reconcile");
  }

  getReconcile(id) {
    return http.get(`/one_reconcile/${id}`);
  }
}

export default new TransactionDataService();