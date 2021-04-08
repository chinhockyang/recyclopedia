import json

def jsonToGeoJson(infile, outfile, binType, trunc=None):
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
    # add a boolean variable showMarker to toggle the visibility of markers rendered on the map
    newpoint['properties'] = {
                                "binType": binType,
                                "address": address,
                                "postcode": postcode,
                                "showMarker": False
                              }

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
jsonToGeoJson('./recyclebins.json', './testbinsGeo.json', 'recyclebins', 3)
jsonToGeoJson('./recyclebins.json', './recyclebinsGeo.json', 'recyclebins')
jsonToGeoJson('./ewaste.json', './ewasteGeo.json', 'ewaste')
jsonToGeoJson('./secondhandcollecn.json', './secondhandcollecnGeo.json', 'secondhandcollecn')
jsonToGeoJson('./rvm.json', './rvmGeo.json', 'rvm')
jsonToGeoJson('./cashfortrash.json', './cashfortrashGeo.json', 'rvm')
jsonToGeoJson('./lighting.json', 'lightingGeo.json', 'lighting')