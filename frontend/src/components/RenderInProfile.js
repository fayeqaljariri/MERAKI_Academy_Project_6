import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import "../components/RenderInProfile.css";
import Modal from "react-modal";
import Rider from "./rider";
const RenderInTheProfile = () => {
  const [ownTrips, setOwnTrips] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const renderOwnTrips = async () => {
    const userId = localStorage.getItem("User");
    await axios
      .get(`http://localhost:5000/profileRender/${userId}`)
      .then((result) => {
        console.log(result);
        setOwnTrips(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    renderOwnTrips();
  }, []);
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };
  const rejectRider = (tripId, seats) => {
    seats -= 1;
    axios
      .put(`http://localhost:5000/reject/${tripId}`, { seats })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [softZero, setSoftZero] = useState(0);
  //what is left is to return the result using HOF
  const rejectAndHide = (tripId) => {
    axios.put(`http://localhost:5000/reject/${tripId}`);
  };
  const setModalIsOpenToTrue = (id) => {
    setModalIsOpen(true);
    const prdctId = localStorage.setItem("id", id);
  };
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div id="MyTrips">
        <h4>My trips</h4>
      </div>

      <div className="gridcontainer">
        {ownTrips.map((elem, index) => {
          return (
            <div id="spacing">
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>
                  <p key={index}> Going to: {elem.TRIPto}</p>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    <p> Start Point: {elem.TRIPfrom}</p>
                  </Card.Title>
                  <Card.Text>
                    <p>Number of seats: {elem.numberOfSeats}</p>

                    <p>Number of passengers: {elem.passengers}</p>

                    <p>Charge per passenger: {elem.Price} JD</p>
                  </Card.Text>
                </Card.Body>{" "}
                <div>
                      <button
                        className="homebuttons"
                        onClick={() => {
                          setModalIsOpenToTrue(elem.id);
                        }}
                      >
                        passenger request
                      </button>
                    </div>

                <Modal isOpen={modalIsOpen}>
                      <button onClick={setModalIsOpenToFalse}>x</button>
                      {/* <Exmodal /> */}
                      <Rider></Rider>
                    </Modal>
              </Card>
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RenderInTheProfile;
