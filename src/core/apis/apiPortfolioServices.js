import * as ROUTE_LIST from './apis-list';
import apiUserServices from './apiUserServices';

export async function getCountries () {
  return await apiUserServices.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.COUNTRIES}`).then((res) => {
        return res.data.data.map(option => ({ value: option.id, label: option.name }));      
    });
};

export async function getCategoryDetails () {
    //return await apiUserServices.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.CATEGORIES}`).then((res) => {
       //return res.data.data.data
       return [
        {
          category_name: "Electronics",
          id: 101,
          subcategory: [
            {
              id: 1,
              category_id: 101,
              sub_category_name: "Phone",
              status: 2,
              created_a: "2021-05-18T12:58:16.536Z",
              brands: [
                {
                  id: 21,
                  sub_category_id: 1,
                  brand_name: "Samsung",
                  status: 2,
                  created_at: "2021-05-18T12:58:16.536Z"
                },
                {
                  id: 22,
                  sub_category_id: 1,
                  brand_name: "Apple",
                  status: 2,
                  created_at: "2021-05-18T12:58:16.536Z"
                },
                {
                  id: 23,
                  sub_category_id: 1,
                  brand_name: "Nokia",
                  status: 2,
                  created_at: "2021-05-18T12:58:16.536Z"
                },
                {
                  id: 24,
                  sub_category_id: 1,
                  brand_name: "LG",
                  status: 2,
                  created_at: "2021-05-18T12:58:16.536Z"
                }
              ]
            },
            {
              id: 102,
              category_id: 1,
              sub_category_name: "Laptops",
              status: 2,
              created_at: "2021-05-18T12:58:16.536Z",
              brands: []
            },
            {
              id: 103,
              category_id: 1,
              sub_category_name: "Chargers",
              status: 2,
              created_at: "2021-05-18T12:58:16.536Z",
              brands: []
            },
            {
              id: 104,
              category_id: 1,
              sub_category_name: "Cables",
              status: 2,
              created_at: "2021-05-18T12:58:16.536Z",
              brands: []
            }
          ]
        },
        
        //

        {
            category_name: "food",
            id: 222,
            subcategory: [
              {
                id: 301,
                category_id: 101,
                sub_category_name: "pizza",
                status: 2,
                created_a: "2021-05-18T12:58:16.536Z",
                brands: [
                  {
                    id: 31,
                    sub_category_id: 301,
                    brand_name: "peperoni",
                    status: 2,
                    created_at: "2021-05-18T12:58:16.536Z"
                  },
                  {
                    id: 32,
                    sub_category_id: 301,
                    brand_name: "vegy",
                    status: 2,
                    created_at: "2021-05-18T12:58:16.536Z"
                  },
                ]
              },
              {
                id: 302,
                category_id: 1,
                sub_category_name: "burgers",
                status: 2,
                created_at: "2021-05-18T12:58:16.536Z",
                brands: [
                  {
                    id: 402,
                    sub_category_id: 302,
                    brand_name: "deek duke",
                    status: 2,
                    created_at: "2021-05-18T12:58:16.536Z"
                  },
                ]
              },
            ]
          },
      ]
    }

export async function getProductDetails (id) {
  console.log('inside get prod details')
  return await apiUserServices.get('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/product_details?product_id=10').then((res) => {

    console.log('resp --> : ',res)
        return null;
    });
};
