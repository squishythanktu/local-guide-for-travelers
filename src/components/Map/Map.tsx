/* eslint-disable @typescript-eslint/no-unused-vars */
import { LatLng, LatLngExpression, divIcon, point } from 'leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import 'leaflet/dist/leaflet.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Location } from 'src/types/tour.type'
import MapSearchControl from '../MapSearchControl/MapSearchControl'
import './react-leaflet.css'

interface MapProps {
  onMarkersUpdate: (markers: LatLngExpression[]) => void
  isSelect?: boolean
  locations?: Location[]
}

const Map: React.FC<MapProps> = ({ onMarkersUpdate, locations }: MapProps) => {
  // const [centerLocation, setCenterLocation] = useState([16.047079, 108.20623])
  const [markers, setMarkers] = useState<LatLngExpression[]>([])
  const prov = new OpenStreetMapProvider()

  const convertLocationToLatLngExpression = (location: Location): LatLngExpression => {
    return {
      lat: location.latitude,
      lng: location.longitude
    }
  }

  const convertLocationsToLatLngExpressions = useCallback((locations: Location[]): LatLngExpression[] => {
    return locations.map(convertLocationToLatLngExpression)
  }, [])

  const formattedMarkers: LatLngExpression[] = useMemo(
    () => convertLocationsToLatLngExpressions(locations || []),
    [convertLocationsToLatLngExpressions, locations]
  )

  useEffect(() => {
    onMarkersUpdate(markers)
    if (formattedMarkers.length > 0) setMarkers(formattedMarkers)

    // if (markers && markers.length > 0) {
    //   setCenterLocation([(markers[0] as LatLng).lat, (markers[0] as LatLng).lng])
    // }
  }, [markers, onMarkersUpdate, formattedMarkers, locations])

  // const ChangeMapView = ({ coords }: { coords: LatLngTuple }) => {
  //   const map = useMap()
  //   map.setView(coords, map.getZoom())

  //   return null
  // }

  const AddMarkerOnClick = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setMarkers([...markers, [lat, lng]])
      }
    })
    return null
  }

  const removeMarker = (pos: LatLng) => {
    const formattedPos = [pos.lat, pos.lng]
    setMarkers((prevCoord) => prevCoord.filter((coord) => JSON.stringify(coord) !== JSON.stringify(formattedPos)))
  }

  const customClusterIcon = (cluster: { getChildCount: () => unknown }) =>
    divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: 'custom-marker-cluster',
      iconSize: point(33, 33, true)
    })

  const customMarkerIcon = (index: number) =>
    divIcon({
      html: `<div class="marker-label">${index + 1}</div>`,
      className: 'custom-marker-label',
      iconSize: [38, 38]
    })

  return (
    <MapContainer center={[16.047079, 108.20623]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <MapSearchControl
        provider={prov}
        showMarker={false}
        showPopup={false}
        popupFormat={({ result }) => result.label}
        maxMarkers={3}
        retainZoomLevel={false}
        animateZoom={true}
        autoClose={false}
        searchLabel={'Enter address'}
        keepResult={true}
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={customClusterIcon}>
        {/* {!isSelect && <AddMarkerOnClick />} */}
        <AddMarkerOnClick />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            eventHandlers={{
              click: (e) => removeMarker(e.latlng)
            }}
            icon={customMarkerIcon(index)}
          ></Marker>
        ))}
      </MarkerClusterGroup>
      {/* <ChangeMapView coords={centerLocation} /> */}
    </MapContainer>
  )
}

export default Map
