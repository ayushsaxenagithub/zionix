import collections
import urllib.parse
import base64
import hmac
import hashlib
import urllib.request
import json

def product_import_tme():
    # /product/product_import_tme/

    token = '0f89076a8f6852a5cebe39c5422318538800cd5c0e6ee'  # Replace with your token
    app_secret = 'fd5a595a6eda52c936f3'  # Replace with your app secret

    params = {
        'SymbolList[0]': 'NE555D',
        'SymbolList[1]': '1N4007-DC',
        'Country': 'PL',
        'Currency': 'PLN',
        'Language': 'PL',
    }

    response = api_call('Products/GetPricesAndStocks', params, token, app_secret, True)
    response = json.loads(response)
    print(response)

def api_call(action, params, token, app_secret, show_header=False):
    api_url = 'https://api.tme.eu/' + action + '.json'
    params['Token'] = token

    params = collections.OrderedDict(sorted(params.items()))

    encoded_params = urllib.parse.urlencode(params)
    signature_base = 'POST' + '&' + urllib.parse.quote(api_url, '') + '&' + urllib.parse.quote(encoded_params, '')

    api_signature = base64.b64encode(hmac.new(app_secret.encode(), signature_base.encode(), hashlib.sha1).digest()).decode().rstrip()
    params['ApiSignature'] = api_signature

    http_header = {
        "Content-type": "application/x-www-form-urlencoded",
    }

    # Create your HTTP request
    req = urllib.request.Request(api_url, urllib.parse.urlencode(params).encode(), http_header)

    # Submit your request
    res = urllib.request.urlopen(req)
    html = res.read().decode()

    return html

print(product_import_tme())
