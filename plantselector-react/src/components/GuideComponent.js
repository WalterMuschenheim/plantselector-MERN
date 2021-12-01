import React, { useState, useEffect, useRef } from "react";
import {
  Collapse,
  Popover,
  Button,
  PopoverBody,
  PopoverHeader,
} from "reactstrap";
import { Router, Switch, Route, Redirect, useParams } from "react-router-dom";
import { Spinner } from "./SpinnerComponent";
import Favorite from "./FavoriteComponent";
import baseUrl from "../shared/baseUrl";

function UserGuide(props) {
  // useEffect(() => {
  //   onPlantChange(props.plant);
  // }, [props.plant]);
  const roomList = Object.keys(props.rooms).map((room) => {
    const types = ["height", "light", "care"];
    return (
      <div className="row" key={room}>
        <div className="col-md-4">
          <h5>
            <span
              class="delete-room pointer"
              onClick={() =>
                props.removeRoom(props.rooms[room]._id, props.user.token)
              }
            >
              x&nbsp;
            </span>
            <span>{room}</span>
          </h5>
        </div>
        <div className="col-md-8">
          <div className="row">
            {types.map((type) => (
              <ul key={type} className="col-md">
                {props.rooms[room].criteria.map((item) => {
                  if (item[0] === type) {
                    return <li key={item[1]}>{item[1]}</li>;
                  }
                })}
              </ul>
            ))}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container guide" id="plant-guide">
      <div className="container guide-item">
        <div className="row">
          <div className="col-12">
            {props.user !== null ? (
              <h4>{`${props.user.name}'s Profile`}</h4>
            ) : (
              <h4>{props.formTitle}</h4>
            )}
          </div>
        </div>

        {props.user === null ? (
          <div>
            <UserForm
              formTitle={props.form}
              formHandler={props.formHandler}
              userFormControll={props.userFormControll}
              userFormValue={props.userFormValue}
              toggleLogin={props.toggleLogin}
              logInOrSignup={props.logInOrSignup}
              errMess={props.errMess}
              toggleErrorMessage={props.toggleErrorMessage}
              resetUserErrorMessage={props.resetUserErrorMessage}
            />
            <div>
              <span
                onClick={() => {
                  props.toggleLogin();
                  props.resetUserErrorMessage();
                }}
              >
                {props.logInOrSignup}
              </span>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-5">
              <Button
                onClick={() => {
                  props.logoutUser(props.user.token);
                  props.turnOffFilterFavorites();
                }}
              >
                log out
              </Button>
            </div>
            <div className="col-md-7">{roomList}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function UserForm(props) {
  const [errMess, setErrMess] = useState("");
  return (
    <form className="form-inline navbar-nav">
      <input
        className="form-control"
        id="loginName"
        type="text"
        placeholder="User Name"
        name="name"
        value={
          props.userFormValue.name !== undefined
            ? props.userFormValue.name
            : null
        }
        onChange={(event) => props.userFormControll("name", event)}
      />
      <input
        className="form-control"
        id="loginPass"
        type="text"
        placeholder="Password"
        name="password"
        value={
          props.userFormValue.password !== undefined
            ? props.userFormValue.password
            : null
        }
        onChange={(event) => props.userFormControll("password", event)}
      />
      <Button
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          let newErrMess = "";
          console.log(
            "sigup form errors",
            props.userFormValue.name !== undefined
              ? props.userFormValue.name.length
              : props.userFormValue.name,
            props.userFormValue.password !== undefined
              ? props.userFormValue.password.length
              : props.userFormValue.password
          );
          if (
            props.userFormValue.name === undefined ||
            props.userFormValue.name.length === 0
          ) {
            newErrMess += "You must include a user name \n";
          }
          if (
            props.userFormValue.password === undefined ||
            props.userFormValue.password.length === 0
          ) {
            newErrMess += "You must include a password \n";
          }
          if (
            // props.userFormValue.name !== undefined &&
            // props.userFormValue.name.length !== 0 &&
            // props.userFormValue.password !== undefined &&
            // props.userFormValue.password.length !== 0
            newErrMess === ""
          ) {
            setErrMess(newErrMess);
            props.resetUserErrorMessage();
            console.log(props.userFormValue);
            props.formHandler(props.userFormValue);
          } else {
            setErrMess(newErrMess);
          }
        }}
      >
        Submit
      </Button>
      <div className="alert">
        {errMess !== ""
          ? errMess
          : props.errMess !== null
          ? props.errMess.message !== undefined
            ? props.errMess.message
            : props.toggleErrorMessage
          : null}
      </div>
    </form>
  );
}

function Guide(props) {
  const [status, setStatus] = useState("Closed");

  const [currentPlant, setPlant] = useState(null);

  const onPlantChange = (plant) => setPlant(plant);

  const [logIn, setLogIn] = useState(true);

  const toggleLogin = () => setLogIn(!logIn);

  const onEntering = () => setStatus("Opening...");

  const onEntered = () => setStatus("Opened");

  const onExiting = () => setStatus("Closing...");

  const onExited = () => setStatus("Closed");

  const guideRef = useRef(null);

  useEffect(() => {
    //get the height of the guide and make that the offset value
    if (!props.isLoading) {
      let guideRect = guideRef.current.getBoundingClientRect();
      // props.updateGuideHeight(guideRect.height);
      props.updateGuideHeight(guideRect.bottom);
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
        <div className={"modal-popover " + position}>
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
                    key={popover.topic}
                    position={popover.position}
                    topic={popover.topic}
                    plant={props.plant}
                  />
                );
              })}
              <div id="modal-image-container">
                <img
                  src={`${baseUrl}/images/${props.plant.imageURL}`} //get image from server
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
                rooms={props.user.rooms}
                removeRoom={props.removeRoom}
                criteria={props.criteria}
                logoutUser={props.logoutUser}
                user={props.user.user}
                updateGuideHeight={props.updateGuideHeight}
                collapse={props.collapse}
                plants={props.plants}
                updateFavorites={props.updateFavorites}
                favorites={props.user.favorites}
                turnOffFilterFavorites={props.turnOffFilterFavorites}
                formTitle={logIn ? "Log In" : "Sign Up"}
                formHandler={logIn ? props.fetchUser : props.signUpUser}
                userFormControll={props.userFormControll}
                userFormValue={props.userFormValue}
                toggleLogin={toggleLogin}
                logInOrSignup={
                  logIn
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Log In"
                }
                toggleErrorMessage={
                  logIn
                    ? "There was a problem logging in"
                    : "There was a problem signing up"
                }
                errMess={props.user.errMess}
                resetUserErrorMessage={props.resetUserErrorMessage}
              />
            </Route>
            <Route path="/:plantName">
              <SinglePlantGuide
                updateGuideHeight={props.updateGuideHeight}
                collapse={props.collapse}
                plants={props.plants}
                updateFavorites={props.updateFavorites}
                favorites={props.user.favorites}
                user={props.user.user}
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
