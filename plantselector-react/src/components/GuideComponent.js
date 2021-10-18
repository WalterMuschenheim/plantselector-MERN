import React, { useState, useEffect, useRef } from "react";
import {
  Collapse,
  Popover,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
} from "reactstrap";
import { Router, Switch, Route, Redirect, useParams } from "react-router-dom";
import { Spinner } from "./SpinnerComponent";
import Favorite from "./FavoriteComponent";

function Guide(props) {
  const [status, setStatus] = useState("Closed");

  const [currentPlant, setPlant] = useState(null);

  const onPlantChange = (plant) => setPlant(plant);

  const onEntering = () => setStatus("Opening...");

  const onEntered = () => setStatus("Opened");

  const onExiting = () => setStatus("Closing...");

  const onExited = () => setStatus("Closed");

  const guideRef = useRef(null);

  useEffect(() => {
    //get the height of the guide and make that the offset value
    if (!props.isLoading) {
      let guideRect = guideRef.current.getBoundingClientRect();
      props.updateGuideHeight(guideRect.height);
    }
  }, [status, currentPlant]);

  function GuideContent(props) {
    useEffect(() => {
      onPlantChange(props.plant);
    }, [props.plant]);

    const PopoverItem = (props) => {
      const { position, topic, plant } = props;

      const [popoverOpen, setPopoverOpen] = useState(false);

      const toggle = () => setPopoverOpen(!popoverOpen);

      return (
        <div class={"modal-popover " + position}>
          <a id={"Popover-" + position} role="button"></a>
          <Popover
            trigger="hover"
            placement="right"
            isOpen={popoverOpen}
            target={"Popover-" + position}
            toggle={toggle}
          >
            <PopoverHeader>{topic}</PopoverHeader>
            <PopoverBody>{plant[`${topic}`]}</PopoverBody>
          </Popover>
        </div>
      );
    };

    const popovers = [
      {
        position: "top",
        topic: "light",
      },
      {
        position: "middle",
        topic: "height",
      },
      {
        position: "bottom",
        topic: "care",
      },
    ];

    const InnerContent = () => {
      if (props.plant.imageURL) {
        return (
          <div className="row row-content">
            <div className="col-md-4">
              {popovers.map((popover) => {
                return (
                  <PopoverItem
                    position={popover.position}
                    topic={popover.topic}
                    plant={props.plant}
                  />
                );
              })}
              <div id="modal-image-container">
                <img
                  src={`./plantselector-react/assets/images/${props.plant.imageURL}`}
                  alt={props.plant.plantName}
                />
              </div>
            </div>

            <div className="guide-text col-md-8">
              {props.plant.longDescription}
            </div>
          </div>
        );
      } else {
        return (
          <div className="row row-content">
            <div className="guide-text col-12">
              {props.plant.longDescription}
            </div>
          </div>
        );
      }
    };

    return (
      <div className="container guide" id="plant-guide">
        <div className="container guide-item">
          <div className="row">
            <div className="col-11">
              <h4>{props.plant.name}</h4>
            </div>
            <div className="col-1">
              <h4>
                <Favorite
                  updateFavorites={props.updateFavorites}
                  favorites={props.favorites}
                  plantName={props.plant.name}
                  favorite={props.favorite}
                  user={props.user}
                />
              </h4>
            </div>
          </div>
          <InnerContent />
        </div>
      </div>
    );
  }

  function SinglePlantGuide(props) {
    let { plantName } = useParams();
    return (
      <GuideContent
        updateGuideHeight={props.updateGuideHeight}
        collapse={props.collapse}
        plant={props.plants.filter((plant) => plant.name === `${plantName}`)[0]}
        updateFavorites={props.updateFavorites}
        favorites={props.favorites}
        favorite={props.favorites.includes(`${plantName}`)}
        user={props.user}
      />
    );
  }

  function UserGuide(props) {
    useEffect(() => {
      onPlantChange(props.plant);
    }, [props.plant]);
    const roomList = Object.keys(props.rooms).map((room) => {
      const types = ["height", "light", "care"];
      return (
        <div className="row">
          <div className="col-md-4">
            <h5>
              <span id="delete-room" onClick={() => props.removeRoom(room)}>
                x&nbsp;
              </span>
              <span>{room}</span>
            </h5>
          </div>
          <div className="col-md-8">
            {types.map((type) =>
              props.rooms[room].map((item) => {
                if (item[0] === type) {
                  return <span>{item[1]}, </span>;
                }
              })
            )}
          </div>
        </div>
      );
    });
    const [userFormValue, setUserFormValue] = useState({
      name: undefined,
      password: undefined,
    });
    const [errMess, setErrMess] = useState("");

    const userForm = (
      <form className="form-inline navbar-nav">
        <input
          className="form-control"
          id="loginName"
          type="text"
          placeholder="User Name"
          name="name"
          value={userFormValue.name !== undefined ? userFormValue.name : null}
          onChange={(event) =>
            setUserFormValue({ ...userFormValue, name: event.target.value })
          }
        />
        <input
          className="form-control"
          id="loginPass"
          type="text"
          placeholder="Password"
          name="password"
          value={
            userFormValue.password !== undefined ? userFormValue.password : null
          }
          onChange={(event) =>
            setUserFormValue({ ...userFormValue, password: event.target.value })
          }
        />
        <input
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            let newErrMess = "";
            if (userFormValue.name === undefined) {
              newErrMess += "you must include a user name. ";
            }
            if (userFormValue.password === undefined) {
              newErrMess += "you must include a password. ";
            }
            if (
              userFormValue.name !== undefined &&
              userFormValue.password !== undefined
            ) {
              setErrMess("");
              props.fetchUser(userFormValue);
            } else {
              setErrMess(newErrMess);
            }
            console.log("error message", errMess, userFormValue, alert);
          }}
        />
        <div className="alert">{errMess}</div>
      </form>
    );

    return (
      <div className="container guide" id="plant-guide">
        <div className="container guide-item">
          <div className="row">
            <div className="col-12">
              {props.user !== null ? (
                <h4>{`${props.user.name}'s Profile`}</h4>
              ) : (
                <h4>Log In</h4>
              )}
            </div>
          </div>

          {props.user === null ? (
            userForm
          ) : (
            <div className="row">
              <div className="col-md-5">
                <button onClick={props.logoutUser}>log out</button>
              </div>
              <div className="col-md-7">{roomList}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!props.isLoading) {
    return (
      <Collapse
        isOpen={props.collapse}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      >
        <div ref={guideRef}>
          <Switch>
            <Route path="/rooms" exact>
              <UserGuide
                rooms={props.rooms}
                removeRoom={props.removeRoom}
                criteria={props.criteria}
                fetchUser={props.fetchUser}
                logoutUser={props.logoutUser}
                user={props.user}
                updateGuideHeight={props.updateGuideHeight}
                collapse={props.collapse}
                plants={props.plants}
                updateFavorites={props.updateFavorites}
                favorites={props.favorites}
              />
            </Route>
            <Route path="/:plantName">
              <SinglePlantGuide
                updateGuideHeight={props.updateGuideHeight}
                collapse={props.collapse}
                plants={props.plants}
                updateFavorites={props.updateFavorites}
                favorites={props.favorites}
                user={props.user}
              />
            </Route>

            <Redirect to="Light" />
          </Switch>
        </div>
      </Collapse>
    );
  }
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Spinner />
        </div>
      </div>
    );
  }
}

export default Guide;
