import React, { useState, useEffect, useRef } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import * as Router from "react-router-dom";
import Toasts from "./ToastComponent";

function FilterNav(props) {
  const isSticky = props.sticky === true ? "navbar-sticky" : "";

  const navbarRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleScroll = (stickiness, guideHeight, navHeight) => {
    console.log(
      "scrollY in here is" + window.scrollY,
      "nav height is " + navHeight,
      "guide height is " + guideHeight
    );
    if (window.scrollY >= guideHeight) {
      if (stickiness !== true) {
        props.updateSticky(true);
        props.updateNavHeight(navHeight);
      }
    } else {
      if (stickiness !== false) {
        props.updateSticky(false);
        props.updateNavHeight(0);
      }
    }
  };

  useEffect(() => {
    var navRect = navbarRef.current.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(props.sticky, props.guideHeight, navRect.height);
    };
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [props.guideHeight, props.sticky]);

  useEffect(() => {
    var navRect = navbarRef.current.getBoundingClientRect();
    handleScroll(props.sticky, props.guideHeight, navRect.height);
  }, [props.guideHeight]);

  const Dropdowns = (props) => {
    useEffect(() => {
      var filterItems = document.querySelectorAll(".filter-item");
      for (let i = 0; i < filterItems.length; i++) {
        filterItems[i].addEventListener("click", (ev) =>
          props.updateCriteria(
            ev.target.dataset.crittype,
            ev.target.dataset.critval
          )
        );
        if (props.valCheck(filterItems[i], props.criteria)) {
          filterItems[i].classList.add("active");
        }
      }
      var clearItems = document.querySelectorAll(".clear-item");
      for (let i = 0; i < clearItems.length; i++) {
        clearItems[i].addEventListener("click", (ev) =>
          props.clearCriteria(ev.target.dataset.critclear)
        );
      }
      var rooms = document.querySelectorAll(".rooms");
      for (let i = 0; i < rooms.length; i++) {
        rooms[i].addEventListener("click", (ev) => {
          const types = ["height", "light", "care"];
          types.forEach((type) => props.clearCriteria(type));
          const room = props.rooms[ev.target.dataset.critval].criteria;
          room.forEach((criterion) => {
            props.updateCriteria(criterion[0], criterion[1]);
          });
        });
      }
    }, []);

    const UserProfile = (props) => {
      return (
        <NavItem id="guideitem" className="nav-item">
          <Router.NavLink to="/rooms" activeClassName="active">
            <NavLink id="userProfile" role="button">
              {props.user !== null ? "User Profile" : "Login"}
            </NavLink>
          </Router.NavLink>
        </NavItem>
      );
    };

    const roomList = Object.keys(props.rooms).map((room) => {
      return (
        <DropdownItem
          key={room}
          className="rooms"
          data-crittype="rooms"
          data-critval={room}
        >
          {room}
        </DropdownItem>
      );
    });

    const RoomsDropdown = () => {
      return (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Rooms
          </DropdownToggle>
          <DropdownMenu id="rooms">{roomList}</DropdownMenu>
        </UncontrolledDropdown>
      );
    };

    return (
      <Nav className="navbar-nav d-flex" navbar>
        <NavItem
          id="guideitem"
          className={props.collapse ? "nav-item active" : "nav-item "}
        >
          <NavLink
            id="guidebutton"
            role="button"
            onClick={props.collapseHandler}
          >
            Guide
          </NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Height
          </DropdownToggle>
          <DropdownMenu id="plantheight">
            <DropdownItem
              className="filter-item"
              data-crittype="height"
              data-critval="0 to 1 foot"
            >
              0 to 1 foot
            </DropdownItem>
            <DropdownItem
              className="filter-item"
              data-crittype="height"
              data-critval="1 to 3 feet"
            >
              1 to 3 feet
            </DropdownItem>
            <DropdownItem
              className="filter-item"
              data-crittype="height"
              data-critval="3 to 6 feet"
            >
              3 to 6 feet
            </DropdownItem>
            <DropdownItem
              className="filter-item"
              data-crittype="height"
              data-critval="6 to 9 feet"
            >
              6 to 9 feet
            </DropdownItem>
            <DropdownItem
              className="filter-item"
              data-crittype="height"
              data-critval="over 9 feet"
            >
              over 9 feet
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem className="clear-item" data-critclear="height">
              Clear All
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Light
          </DropdownToggle>
          <DropdownMenu id="plantlight">
            <DropdownItem
              className="filter-item"
              data-crittype="light"
              data-critval="low indirect"
            >
              low indirect
            </DropdownItem>
            <DropdownItem
              className="filter-item"
              data-crittype="light"
              data-critval="bright indirect"
            >
              bright indirect
            </DropdownItem>
            <DropdownItem
              className="filter-item"
              data-crittype="light"
              data-critval="partial direct"
            >
              partial direct
            </DropdownItem>
            <DropdownItem
              className="filter-item"
              data-crittype="light"
              data-critval="full direct"
            >
              full direct
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem className="clear-item" data-critclear="light">
              Clear All
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Care
          </DropdownToggle>
          <DropdownMenu id="plantcare">
            <DropdownItem
              className="filter-item"
              data-crittype="care"
              data-critval="loves neglect"
            >
              loves neglect
            </DropdownItem>
            <DropdownItem
              className="filter-item"
              data-crittype="care"
              data-critval="tolerates neglect"
            >
              tolerates neglect
            </DropdownItem>
            <DropdownItem
              className="filter-item"
              data-crittype="care"
              data-critval="needs attention"
            >
              needs attention
            </DropdownItem>
            <DropdownItem
              className="filter-item"
              data-crittype="care"
              data-critval="needs extra attention"
            >
              needs extra attention
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem className="clear-item" data-critclear="care">
              Clear All
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <UserProfile user={props.user} />
        {Object.entries(props.rooms).length > 0 && <RoomsDropdown />}
        {props.user ? (
          <NavLink
            id="favoritesToggle"
            role="button"
            className={props.filterFavorites ? "active" : ""}
            onClick={props.toggleFilterFavorites}
          >
            Favorites
          </NavLink>
        ) : null}
      </Nav>
    );
  };

  const RenderToasts = (props) => {
    const types = ["height", "light", "care"];
    const makeToasts = types.map((type) => {
      if (
        props.criteria &&
        props.criteria.find(function (criterium) {
          return criterium[0] === type;
        }) !== undefined
      ) {
        return (
          <Toasts
            key={type}
            updateCriteria={props.updateCriteria}
            clearCriteria={props.clearCriteria}
            criteria={props.criteria.filter(function (criterium) {
              return criterium[0] === type;
            })}
            crittype={type}
          />
        );
      }
    });

    return (
      <div className="d-none d-lg-flex" style={{ maxWidth: 200 + "px" }}>
        <div id="toastcontainer">
          {makeToasts}
          {props.criteria.length > 0 && (
            <SaveRoomToast
              saveRoom={props.saveRoom}
              rooms={props.rooms}
              criteria={props.criteria}
              user={props.user}
              collapseHandler={props.collapseHandler}
              collapse={props.collapse}
            />
          )}
        </div>
      </div>
    );
  };
  const SaveRoomForm = (props) => {
    const [roomFormValue, setRoomFormValue] = useState();
    const history = Router.useHistory();
    return (
      <form className="room-form">
        <input
          className="form-control"
          id="login"
          type="text"
          placeholder="Room Name"
          value={roomFormValue}
          onChange={(event) => setRoomFormValue(event.target.value)}
        />
        <button
          type="submit"
          className="btn btn-light btn-block"
          onClick={(event) => {
            event.preventDefault();
            if (props.user) {
              props.saveRoom(
                props.criteria,
                roomFormValue,
                props.rooms,
                props.user.token
              );
              console.log("rooms", props.rooms);
            } else {
              history.push("/rooms");
              if (!props.collapse) {
                props.collapseHandler();
              }
            }
          }}
        >
          Save Room
        </button>
      </form>
    );
  };
  const SaveRoomToast = (props) => {
    return (
      <Toast /*isOpen={show}*/>
        <ToastHeader
          icon={
            <svg
              className="bd-placeholder-img rounded mr-2"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              role="img"
            >
              <rect width="100%" height="100%" fill="darkslategrey"></rect>
            </svg>
          }
        >
          Save Room
        </ToastHeader>
        <ToastBody>
          <SaveRoomForm
            saveRoom={props.saveRoom}
            rooms={props.rooms}
            criteria={props.criteria}
            user={props.user}
            collapseHandler={props.collapseHandler}
            collapse={props.collapse}
          />
        </ToastBody>
      </Toast>
    );
  };

  return (
    <div id="navbarcontainer" className={isSticky} ref={navbarRef}>
      <div className="container">
        <Navbar light expand="lg">
          <NavbarBrand href="#">Plant Selector</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar className="justify-content-between">
            <Dropdowns
              valCheck={props.valCheck}
              updateCriteria={props.updateCriteria}
              clearCriteria={props.clearCriteria}
              collapseHandler={props.collapseHandler}
              collapse={props.collapse}
              criteria={props.criteria}
              toggleFilterFavorites={props.toggleFilterFavorites}
              filterFavorites={props.filterFavorites}
              rooms={props.user.rooms}
              user={props.user.user}
            />
            <form className="form-inline navbar-nav">
              <input
                className="form-control"
                id="plantsearch"
                type="search"
                placeholder="Keyword Search"
                value={props.formValue}
                onChange={props.formControll}
              />
            </form>
            {props.criteria.length > 0 && (
              <SaveRoomForm
                saveRoom={props.saveRoom}
                rooms={props.user.rooms}
                criteria={props.criteria}
                user={props.user.user}
                collapseHandler={props.collapseHandler}
                collapse={props.collapse}
              />
            )}
          </Collapse>
          <RenderToasts
            updateCriteria={props.updateCriteria}
            clearCriteria={props.clearCriteria}
            criteria={props.criteria}
            saveRoom={props.saveRoom}
            rooms={props.user.rooms}
            user={props.user.user}
            collapseHandler={props.collapseHandler}
            collapse={props.collapse}
          />
        </Navbar>
      </div>
    </div>
  );
}

export default FilterNav;
