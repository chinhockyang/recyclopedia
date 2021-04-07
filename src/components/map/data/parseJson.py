import json
with open('recyclebins.json') as f:
  data = json.load(f)
print(data['SrchResults'][0])
print(data['SrchResults'][1])

bins = data['SrchResults']
print(len(bins))

keys = bins[0].keys()
print(keys)
keys = bins[1].keys()
print(keys)

# GeoJson format
# {
#   "geometry": {
#     "type": "Point",
#     "coordinates": [lat, lng]
#     },
#   "type": "Feature",
#   "properties": {
#     # arbitrary properties
#   }
# }

newbins = []
for bin in bins[1:]:
  newbin = {}
  latlng = bin['LatLng'].split(',')
  lat = float(latlng[0])
  lng = float(latlng[1])
  newbin['geometry'] = {"type": "Point", "coordinates": [lng,lat]}
  newbin['type'] = "Feature"
  address = str(bin['ADDRESSBLOCKHOUSENUMBER']) + ' ' + str(bin['ADDRESSSTREETNAME'])
  postcode = bin['ADDRESSPOSTALCODE']
  newbin['properties'] = {"address": address, "postcode": postcode}
  newbins.append(newbin)

geoJson = {
  "type": "FeatureCollection",
  "features": newbins
}

with open('recyclebinsGeo.json', 'w') as newfile:
  json.dump(geoJson, newfile)

geoJson_trunc = {
  "type": "FeatureCollection",
  "features": newbins[:3]
}
with open('testbins.json', 'w') as newtestfile:
  json.dump(geoJson_trunc, newtestfile)