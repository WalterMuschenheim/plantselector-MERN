import React, { Component } from "react";
import PlantList from "./PlantListComponent";
import FilterNav from "./FilterNavComponent";
import Guide from "./GuideComponent";
import ReactDOM from "react-dom";
import { filter } from "minimatch";
import { connect } from "react-redux";
import { HashRouter, withRouter } from "react-router-dom";
import {
  addCriteria,
  removeCriteria,
  clearCriteria,
  updateSearch,
  collapseHandler,
  updateGuideHeight,
  updateNavHeight,
  updateSticky,
  fetchPlants,
  saveRoom,
  removeRoom,
  fetchUser,
  signUpUser,
  logoutUser,
  setUserFormValue,
  updateFavorites,
  loginFailed,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    header: state.header,
    plants: state.plants,
    user: state.user,
    userForm: state.userForm,
  };
};

const mapDispatchToProps = (dispatch) => ({
  /* functions to edit criteria list and to update toasts and navbar links according to that list */
  addCriteriaToStore: (type, criterium) =>
    dispatch(addCriteria(type, criterium)),
  removeCriteriaFromStore: (criterium) => dispatch(removeCriteria(criterium)),
  clearCriteria: (type) => dispatch(clearCriteria(type)),
  updateSearch: (searchTerms) => dispatch(updateSearch(searchTerms)),
  /* functions to expand or collapse the guide and pass information to make the nav bar sticky on scroll */
  collapseHandler: () => dispatch(collapseHandler()),
  updateGuideHeight: (rectHeight) => dispatch(updateGuideHeight(rectHeight)),
  updateNavHeight: (rectHeight) => dispatch(updateNavHeight(rectHeight)),
  updateSticky: (isSticky) => dispatch(updateSticky(isSticky)),
  /* more functions! */
  fetchPlants: () => dispatch(fetchPlants()),
  saveRoom: (criteria, room, rooms, token) =>
    dispatch(saveRoom(criteria, room, rooms, token)),
  removeRoom: (roomId, token) => dispatch(removeRoom(roomId, token)),
  fetchUser: ({ name, password }) => dispatch(fetchUser(name, password)),
  signUpUser: ({ name, password }) => dispatch(signUpUser(name, password)),
  logoutUser: (token) => dispatch(logoutUser(token)),
  setUserFormValue: (key, value) => dispatch(setUserFormValue(key, value)),
  resetUserErrorMessage: () => {
    console.log("reset error message");
    dispatch(loginFailed(null));
  },
  updateFavorites: (plantName, favorites, token) =>
    dispatch(updateFavorites(plantName, favorites, token)),
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.formControll = this.formControll.bind(this);
    this.userFormControll = this.userFormControll.bind(this);
    this.updateCriteria = this.updateCriteria.bind(this);
    this.toggleFilterFavorites = this.toggleFilterFavorites.bind(this);
  }
  state = {
    filterFavorites: false,
  };
  componentDidMount() {
    this.props.fetchPlants();
  }

  /* function to filter grid of plants based on current criteria */

  plantFilter(plants, criteria, searchValue) {
    const criteriaTypes = ["height", "light", "care"];
    //filter the plant array based on user-entered criteria
    const filteredPlants = plants.filter((plant) => {
      //for each plant, check each criteria type against user entered data
      const trueOrFalse = criteriaTypes.map((type) => {
        //get get all user entered criteria that correspond to each type
        const filteredCriteria = criteria.filter(
          (criterium) => criterium[0] === type
        );
        //if there are any user-enetered criteria of a certain type, check if at least one of them matches plant's property for the same type and return true or false
        return filteredCriteria.length > 0
          ? filteredCriteria.some(
              (criterium) => plant[`${type}`] === criterium[1]
            )
          : true;
      });
      //for the array of reduced results for each type, reduce them all to false if any are false and true if all are true. If the array is empty, return true
      const reducedTrueOrFlase =
        trueOrFalse.length > 0
          ? trueOrFalse.reduce((truths, truth) =>
              truths === false || truth === false ? false : true
            )
          : true;
      //finally, the filter on the plant list array will return true if the criteria tests reduce to true and the keywords or name of the plant match any search terms entered. if there are no search terms, return true.
      return (
        reducedTrueOrFlase &&
        (searchValue !== undefined
          ? plant.name
              .concat(plant.keywords)
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          : true)
      );
    });

    return filteredPlants;
  }

  /* functions to edit criteria list and to update toasts and navbar links according to that list */

  updateCriteria(type, val) {
    if (
      this.props.filters.criteria.find(function (currentVal) {
        return currentVal[1] === val;
      }) === undefined
    ) {
      this.props.addCriteriaToStore(type, val);
    } else {
      this.props.removeCriteriaFromStore(val);
    }
  }

  formControll(ev) {
    this.props.updateSearch(ev.target.value);
  }

  userFormControll(key, ev) {
    this.props.setUserFormValue(key, ev.target.value);
  }

  toggleFilterFavorites() {
    this.setState({ filterFavorites: !this.state.filterFavorites });
  }

  valCheck(item, criteria) {
    var check = item.dataset.critval;
    return (
      criteria.find(function (value) {
        return value[1] === check;
      }) !== undefined
    );
  }

  render() {
    const favsOrPlants = this.state.filterFavorites
      ? this.props.plants.plants.filter((plant) =>
          this.props.user.favorites.includes(plant.name)
        )
      : this.props.plants.plants;
    const filteredPlants = this.plantFilter(
      favsOrPlants,
      this.props.filters.criteria,
      this.props.filters.searchValue
    );
    return (
      <div className="App">
        <Guide
          collapseHandler={this.props.collapseHandler}
          updateFavorites={this.props.updateFavorites}
          favorites={this.props.user.favorites}
          removeRoom={this.props.removeRoom}
          rooms={this.props.user.rooms}
          roomsErrMess={this.props.user.errMess}
          criteria={this.props.filters.criteria}
          updateGuideHeight={this.props.updateGuideHeight}
          updateNavHeight={this.props.updateNavHeight}
          collapse={this.props.header.collapse}
          guideHeight={this.props.header.guideHeight}
          plants={this.props.plants.plants}
          isLoading={this.props.plants.isLoading}
          plantsErrMess={this.props.plants.errMess}
          userFormControll={this.userFormControll}
          userFormValue={this.props.userForm}
          fetchUser={this.props.fetchUser}
          signUpUser={this.props.signUpUser}
          logoutUser={this.props.logoutUser}
          user={this.props.user.user}
          errMess={this.props.user.errMess}
          resetUserErrorMessage={this.props.resetUserErrorMessage}
        />
        <FilterNav
          updateCriteria={this.updateCriteria}
          clearCriteria={this.props.clearCriteria}
          criteria={this.props.filters.criteria}
          rooms={this.props.user.rooms}
          saveRoom={this.props.saveRoom}
          user={this.props.user.user}
          toggleFilterFavorites={this.toggleFilterFavorites}
          valCheck={this.valCheck}
          formControll={this.formControll}
          collapseHandler={this.props.collapseHandler}
          updateNavHeight={this.props.updateNavHeight}
          updateSticky={this.props.updateSticky}
          formValue={this.props.filters.searchValue}
          collapse={this.props.header.collapse}
          guideHeight={this.props.header.guideHeight}
          sticky={this.props.header.sticky}
          filterFavorites={this.state.filterFavorites}
        />
        <PlantList
          plants={filteredPlants}
          isLoading={this.props.plants.isLoading}
          errMess={this.props.plants.errMess}
          navHeight={this.props.header.navHeight}
          collapseHandler={this.props.collapseHandler}
          collapse={this.props.header.collapse}
        />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
