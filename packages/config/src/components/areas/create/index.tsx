import {useState} from 'react'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import {CreateAreaDto} from '../../../../../api/src/areas/dto/create-area.dto.ts';
import axios from 'axios';

const AreaCreateComponent = () => {
    // [-33.9276133, 18.5506329]
    const center = {
        lat: -33.9276133,
        lng: 18.5506329,
    }

    const [formData, setFormData] = useState<CreateAreaDto>({
        name: '',
        level: 0,
        code: '',
        coordinates: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
    }
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/areas', formData);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="h-screen flex items-center justify-center m-20">
                <div className="card w-2/5 shadow-sm">
                    <div className="card-body">
                        <h1 className="card-title">Geo IAM Configuration</h1>

                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Add new Area record</legend>

                                <label htmlFor="name" className="fieldset-label">Name</label>
                                <input
                                  name="name"
                                  id="name"
                                  type="text"
                                  onChange={handleInputChange}
                                  value={formData.name}
                                  required
                                  maxLength={50}
                                  className="input"
                                  placeholder="Complete area name"
                                />

                                <label className="fieldset-label">Level</label>
                                <select
                                  name="level"
                                  id="level"
                                  onChange={handleSelectChange}
                                  required
                                  className="select"
                                  defaultValue="Pick a browser">
                                    <option disabled={true}>Select the level</option>
                                    <option value="0">L0 Suburb</option>
                                    <option value="1">L1 City</option>
                                    <option value="2">L2 National</option>
                                </select>

                                <label className="fieldset-label">Code (optional)</label>
                                <input
                                  name="code"
                                  id="code"
                                  type="text"
                                  onChange={handleInputChange}
                                  value={formData.code}
                                  required
                                  maxLength={50}
                                  className="input"
                                  placeholder="Area Code"
                                />

                                <label className="fieldset-label">Coordinates (optional)</label>
                                <input
                                  name="coordinates"
                                  id="coordinates"
                                  type="text"
                                  onChange={handleInputChange}
                                  value={formData.coordinates}
                                  required
                                  maxLength={50}
                                  className="input"
                                  placeholder="[-33.9276133, 18.5506329]"
                                />
                                <p className="fieldset-label">Drag the map marker to pin the approximate center of the area's location (TODO!)</p>
                                <MapContainer
                                  center={center}
                                  zoom={12}
                                  style={{width: "600px", height: "400px"}}>
                                    <TileLayer
                                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[-33.9276133, 18.5506329]} draggable={true}>
                                        <Popup>

                                        </Popup>
                                    </Marker>
                                </MapContainer>

                                <button className="btn btn-primary btn-wide" type="submit">Create</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AreaCreateComponent
