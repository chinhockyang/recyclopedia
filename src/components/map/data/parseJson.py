import json

def jsonToGeoJson(infile, outfile, trunc=None):
  with open(infile) as f:
    data = json.load(f)
  points = data['SrchResults']
  
  newpoints = []
  # exclude first ele which contains metadata
  for point in points[1:]:
    newpoint = {}
    latlng = point['LatLng'].split(',')
    lat = float(latlng[0])
    lng = float(latlng[1])
    newpoint['geometry'] = {"type": "Point", "coordinates": [lng,lat]}
    newpoint['type'] = "Feature"

    # repopulate address details in GeoJson format
    postcode = point['ADDRESSPOSTALCODE']
    address = str(point['ADDRESSBLOCKHOUSENUMBER'])
    if 'ADDRESSSTREETNAME' in point.keys():
      address += ' ' + str(point['ADDRESSSTREETNAME'])
    if 'ADDRESSBUILDINGNAME' in point.keys():
      address = point['ADDRESSBUILDINGNAME'] + ', ' + address
    if 'ADDRESSUNITNUMBER' in point.keys():
      address += ', ' + point['ADDRESSUNITNUMBER']
    
    # add all needed properties to new Feature
    # add a boolean variable to toggle the visibility of markers rendered on the map
    newpoint['properties'] = {"address": address, "postcode": postcode, "showMarker": True}

    newpoints.append(newpoint)
  
  # cut off how many features to parse
  end = len(newpoints)
  if trunc:
    end = trunc

  geoJson = {
    "type": "FeatureCollection",
    "features": newpoints[:end]
  }
  with open(outfile, 'w') as f:
    json.dump(geoJson, f)
jsonToGeoJson('./recyclebins.json', './testbinsGeo.json', 3)
jsonToGeoJson('./recyclebins.json', './recyclebinsGeo.json')
jsonToGeoJson('./ewaste.json', './ewasteGeo.json')
jsonToGeoJson('./secondhandcollecn.json', './secondhandcollecnGeo.json')
jsonToGeoJson('./rvm.json', './rvmGeo.json')
jsonToGeoJson('./lighting.json', 'lightingGeo.json')