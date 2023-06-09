import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';





const Map = () => {

  const [currentId, setCurrentId] = React.useState(0)

  const pinId = [1, 2, 3, 4]

  function handleClick(event) {
    console.log(event.target)
    setCurrentId(event.target.id)
  }

  const [selectedRegion, setSelectedRegion] = React.useState("All");

  const handleSelectRegion = (event) => {
    setSelectedRegion(event.target.value);
  };


  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };





  const [dataReceived, setDataReceived] = React.useState([])
  React.useEffect(() => {
    const getData = async () => {
      try {
        const addr = `http://localhost:5001/api/data/?region=${selectedRegion}${selectedOptions.length > 0 ? selectedOptions.map(option => `&type=${option}`).join('') : ''}`
        const response = await fetch(addr)
        const data = await response.json()
        setDataReceived(data)
      } catch (error) {
        console.log("Error encountered during GET request: ", error.message)
      }
    }
    getData()
  }, [selectedRegion, selectedOptions])



  const listItems = dataReceived.map((element, index) => (
    <ListGroup.Item key={index}>
      <h3><a href={element.link}>{element.name}</a></h3>
      {element.openingHours && <p>Opening Hours: {element.openingHours}</p>}
      <p>{element.description}</p>
      <p>Address: <a href={element.mapLink}>{element.address}</a></p>
    </ListGroup.Item>
  ));

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div id="mapPage">
          <h1 className="my-4 text-center" style={{ fontFamily: "Magilio" }}>Activities</h1>
{/*           
          {allPins}
          <p>{currentId}</p>
          <div>{currentId ? <Popup handleClick={handleClick} /> : null}</div> */}
          <div className="mt-4 row justify-content-center mb-5">
          <div className="col-md-6">
            <div className="text-center">
            <label className="fw-bold form-label" htmlFor="region">Select a region:</label>
            <select className="mx-auto w-50 form-select" id="region" value={selectedRegion} onChange={handleSelectRegion}>
              <option value="All">All</option>
              <option value="Central">Central</option>
              <option value="East">East</option>
              <option value="North">North</option>
              <option value="West">West</option>
            </select>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <label className="fw-bold form-label">Activity Type:</label>
            <div>
              <label className="align-items-start mx-auto form-check-label ">
                <input
                  type="checkbox"
                  value="Educational"
                  checked={selectedOptions.includes('Educational')}
                  onChange={handleCheckboxChange}
                  className="form-check-input me-2"
                />
                Educational
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Dining"
                  checked={selectedOptions.includes('Dining')}
                  onChange={handleCheckboxChange}
                  className="form-check-input me-2"
                />
                F&amp;B
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Recycling"
                  checked={selectedOptions.includes('Recycling')}
                  onChange={handleCheckboxChange}
                  className="form-check-input me-2"
                />
                Recycling Machines
              </label>
            </div>
     
            </div>
          </div>
          {selectedOptions.length > 0 && (
            <ListGroup>{listItems}</ListGroup>
          )}
        </div>
      </div>
    </div>
  )
};

export default Map;