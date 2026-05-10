import axios from 'axios';

const strapiToken = '5ff349578ccac7ef1d535e4d7e84b570f97b3f22290114045bf656448aeaeed4006b9c37c83c61d486a9df78beeb7bd2e0a465185f0b512665cf6c9beebb7dc288db783c4c4e3890af44079c84c7e3e4baae59994dec070fe307fc58b777e772f7ff911608892f40a678c9040933e43ee5a2677e0585bfa5512477aa045bf8e5';
const apiUrl = `https://hap.appfabrikken.no/api`;
const defaultTimeout = 30000;

const useApiService = () => {
  const axiosInstance = axios.create();
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${strapiToken}`;

  function prepareUrl(url: string) {
    return apiUrl + '/' + url;
  }

  async function get(path: string, options: any = {}) {
    // eslint-disable-next-line
    return new Promise(async (resolve, reject) => {
      const url = prepareUrl(path);
      const requestOptions = {
        timeout: options.timeout || defaultTimeout,
        responseType: options.responseType || 'json',
        params: options.params,
      };
      try {
        const response = await axiosInstance.get(url, requestOptions);

        return resolve(response.data);
      } catch (err) {
        return reject(err);
      }
    });
  }

  async function post(path: string, data: object, options: any = {}) {
    // eslint-disable-next-line
    return new Promise(async (resolve, reject) => {
      const url = prepareUrl(path);
      const requestOptions = {
        timeout: options.timeout || defaultTimeout,
        responseType: options.responseType || 'json',
        params: options.params,
      };
      try {
        const response = await axiosInstance.post(url, data, requestOptions);

        return resolve(response.data);
      } catch (err) {
        return reject(err);
      }
    });
  }

  //   async function post(path, data, token = undefined, options = {}) {
  //     return new Promise(async (resolve, reject) => {
  //       const url = prepareUrl(path);
  //       const requestOptions = {
  //         timeout: options.timeout || defaultTimeout,
  //       };
  //       try {
  //         let response;
  //         if (!token) {
  //           response = await axiosInstance.post(url, data, requestOptions);
  //         } else {
  //           response = await axiosInstance.post(url, data, {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //             ...requestOptions,
  //           });
  //         }
  //         resolve(response.data);
  //       } catch (err) {
  //         return reject(err);
  //       }
  //     });
  //   }

  return {
    get,
    post,
  };
};

export { useApiService };
