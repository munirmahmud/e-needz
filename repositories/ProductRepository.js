import Repository, { baseUrl, serializeQuery } from "./Repository";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

class ProductRepository {
  async getSearchRecords(params) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/retrieve_category_product`, {
      method: "POST",
      body: JSON.stringify({
        per_page: params.per_page,
        page_offset: params.page_offset,
        product_name: params.product_name,
        category_id: "",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 200) {
          return result.data;
        }
      })
      .catch((error) => console.log("error", error));

    // const reponse = await Repository.get(`${apiURL}/retrieve_category_product`)
    //   .then((response) => {
    //     console.log(response)
    //     return response.data
    //   })
    //   .catch((error) => ({ error: JSON.stringify(error) }))
    // return reponse
  }

  async getRecords(params) {
    const reponse = await Repository.get(
      `${apiURL}/products?${serializeQuery(params)}`
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProducts(params) {
    const reponse = await Repository.get(
      `${baseUrl}/products?${serializeQuery(params)}`
    )
      .then((response) => {
        if (response.data && response.data.length > 0) {
          return response.data;
        } else {
          return null;
        }
      })

      .catch((error) => {
        console.log(JSON.stringify(error));
        return null;
      });
    return reponse;
  }

  async getBrands() {
    const reponse = await Repository.get(`${baseUrl}/brands`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProductCategories() {
    const reponse = await Repository.get(`${baseUrl}/product-categories`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getTotalRecords() {
    const reponse = await Repository.get(`${baseUrl}/products/count`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProductsById(payload) {
    const reponse = await Repository.get(`${baseUrl}/products/${payload}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProductsByCategory(payload) {
    const reponse = await Repository.get(
      `${baseUrl}/product-categories?slug=${payload}`
    )
      .then((response) => {
        if (response.data) {
          if (response.data.length > 0) {
            return response.data[0];
          }
        } else {
          return null;
        }
      })
      .catch(() => {
        return null;
      });
    return reponse;
  }

  async getProductsByBrand(payload) {
    const reponse = await Repository.get(`${baseUrl}/brands?slug=${payload}`)
      .then((response) => {
        if (response.data) {
          if (response.data.length > 0) {
            return response.data[0];
          }
        } else {
          return null;
        }
      })
      .catch(() => {
        return null;
      });
    return reponse;
  }

  async getProductsByBrands(payload) {
    let query = "";
    payload?.forEach((item) => {
      if (query === "") {
        query = `id_in=${item}`;
      } else {
        query = query + `&id_in=${item}`;
      }
    });
    const reponse = await Repository.get(`${baseUrl}/brands?${query}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProductsByBrands(payload) {
    let query = "";
    payload?.forEach((item) => {
      if (query === "") {
        query = `id_in=${item}`;
      } else {
        query = query + `&id_in=${item}`;
      }
    });
    const reponse = await Repository.get(`${baseUrl}/brands?${query}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProductsByPriceRange(payload) {
    const reponse = await Repository.get(
      `${baseUrl}/products?${serializeQuery(payload)}`
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProductsByIds(payload) {
    const endPoint = `${baseUrl}/products?${payload}`;
    const reponse = await Repository.get(endPoint)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          return response.data;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        return null;
      });
    return reponse;
  }
}

export default new ProductRepository();
