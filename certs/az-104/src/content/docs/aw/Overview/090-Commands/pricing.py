
# Example:
# python .\pricing.py -q "serviceName eq 'Virtual Machines' and armRegionName eq 'centralus'"
# REST
# "https://prices.azure.com/api/retail/prices?api-version=2021-10-01-preview"

import argparse
import json
import requests
from tabulate import tabulate 


def build_pricing_table(json_data, table_data):
    for item in json_data['Items']:
        meter = item['meterName']
        table_data.append([item['armSkuName'], item['retailPrice'], item['unitOfMeasure'], item['armRegionName'], meter, item['productName']])
        
def main(api_url, query, tf):
    table_data = []
    table_data.append(['SKU', 'Retail Price', 'Unit of Measure', 'Region', 'Meter', 'Product Name'])
    
    response = requests.get(api_url, params={'$filter': query})
    json_data = json.loads(response.text)
    
    build_pricing_table(json_data, table_data)
    nextPage = json_data['NextPageLink']
    
    while(nextPage):
        response = requests.get(nextPage)
        json_data = json.loads(response.text)
        nextPage = json_data['NextPageLink']
        build_pricing_table(json_data, table_data)

    print(tabulate(table_data, headers='firstrow', tablefmt=tf))

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-u", "--uri", default="https://prices.azure.com/api/retail/prices", required=False, type=str, help="Azure Pricing API endpoint URI")
    parser.add_argument("-v", "--api-version", default="?api-version=2021-10-01-preview", required=False, type=str, help="Azure Pricing API version")
    parser.add_argument("-q", "--query", default="armRegionName eq 'southcentralus' and armSkuName eq 'Standard_NP20s' and priceType eq 'Consumption' and contains(meterName, 'Spot')", required=False, type=str, help="Azure Pricing API query string")
    parser.add_argument("--table-fmt", default="psql", required=False, type=str, help="Azure Pricing API query resultset output format")
    args = parser.parse_args()
    print(args)
    main(api_url=args.uri + args.api_version, query=args.query, tf=args.table_fmt)