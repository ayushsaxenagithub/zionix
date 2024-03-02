const axios = require('axios');
const crypto = require('crypto');
const qs = require('querystring');

const productImportTME = async () => {
  const token = '0f89076a8f6852a5cebe39c5422318538800cd5c0e6ee'; // Replace with your token
  const appSecret = 'fd5a595a6eda52c936f3'; // Replace with your app secret

  const params = {
    'SymbolList[0]': 'NE555D',
    'SymbolList[1]': '1N4007-DC',
    'Country': 'PL',
    'Currency': 'PLN',
    'Language': 'PL',
    'Token': token
  };

  const sortedParams = Object.keys(params).sort().reduce((r, k) => (r[k] = params[k], r), {});
  const encodedParams = qs.stringify(sortedParams);

  const apiURL = 'https://api.tme.eu/Products/GetPricesAndStocks.json';
  const signatureBase = 'POST' + '&' + encodeURIComponent(apiURL) + '&' + encodeURIComponent(encodedParams);

  const apiSignature = crypto.createHmac('sha1', appSecret).update(signatureBase).digest('base64').trim();
  sortedParams['ApiSignature'] = apiSignature;

  try {
    const response = await axios.post(apiURL, qs.stringify(sortedParams), {
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

productImportTME();
