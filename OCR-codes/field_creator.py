# read the csv

import csv
import json

def get_region_from_row(row):
    left = int(row[0])
    top = int(row[1])
    width  = int(row[2]) - int(row[0])
    height = int(row[3]) - int(row[1])
    if row[6] != '' :
        index = int(row[6]) - 1
    else :
        index = 0
    return {"index" : index, "region" : [left, top, width, height]}

def csv_to_json(csv_file, json_file):
    data = []
    done_fields = {'dummy'}
    
    # Read data from the CSV file
    with open(csv_file, 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        rows = list(csvreader)
        for i in range(1, len(rows)):
            row = rows[i]
            page_number = row[4]
            field_name = row[5]
            field_type = row[7]
            if field_name in done_fields:
                continue

            regions = []
            regions.append(get_region_from_row(row))
            while True:
                if i+1 < len(rows) and rows[i+1][5] != field_name:
                    break
                i += 1
                if i >= len(rows):
                    break
                row = rows[i]
                regions.append(get_region_from_row(row))
            data.append({
                "name": field_name,
                "type": field_type,
                "page_number": page_number,
                "regions": regions
            })
            done_fields.add(field_name)
            
    # print(data)
    
    # Write data to the JSON file
    with open(json_file, 'w') as jsonfile:
        json.dump(data, jsonfile, indent=2)

if __name__ == "__main__":
    csv_file = 'region(old).csv'
    json_file = 'region.json'
    csv_to_json(csv_file, json_file)
