import json

def extract_requests(items, path=""):
    results = []
    for item in items:
        current_path = path + "/" + item['name']
        if 'request' in item:
            req = item['request']
            method = req.get('method', 'GET')
            url = req.get('url', {}).get('raw', '')
            results.append(f"- **{method}** `{url}`\n  - Path: {current_path}")
        elif 'item' in item:
            results.extend(extract_requests(item['item'], current_path))
    return results

def find_ifashe(items, path=""):
    results = []
    for item in items:
        current_path = path + "/" + item['name']
        if "ifashe" in item['name'].lower():
            if 'item' in item:
                results.extend(extract_requests(item['item'], current_path))
            elif 'request' in item:
                req = item['request']
                method = req.get('method', 'GET')
                url = req.get('url', {}).get('raw', '')
                results.append(f"- **{method}** `{url}`\n  - Path: {current_path}")
        elif 'item' in item:
            results.extend(find_ifashe(item['item'], current_path))
    return results

if __name__ == "__main__":
    with open('Hameau des Jeunes.postman_collection.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    endpoints = find_ifashe(data.get('item', []))
    
    with open('ifashe_endpoints.md', 'w', encoding='utf-8') as f:
        f.write("# Ifashe Tugufashe Endpoints\n\n")
        f.write("\n".join(endpoints))
