import xml.etree.ElementTree as ET
import csv

# Parse the sitemap
tree = ET.parse('data/sitemap.xml')
root = tree.getroot()

# Define namespace
ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
prefix = 'https://www.systemoverflow.com/learn/ml-'

# Extract matching URLs
urls = []
for url_elem in root.findall('sm:url', ns):
    loc = url_elem.find('sm:loc', ns)
    if loc is not None and loc.text and loc.text.startswith(prefix):
        urls.append([loc.text])

# Write to CSV
with open('ml_urls.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    for url in urls:
        writer.writerow(url)

print(f"Extracted {len(urls)} URLs to ml_urls.csv")
