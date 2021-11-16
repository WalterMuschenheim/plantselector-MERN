import React from "react";
import PlantCard from "./PlantCardComponent";
import { Spinner } from "./SpinnerComponent";

function PlantList(props) {
  if (!props.isLoading) {
    return (
      <div className="container" style={{ marginTop: `${props.navHeight}px` }}>
        <div className="container" id="plantlist">
          <div className="row row-content">
            <div className="" id="plantlist-inner">
              <div className="card-columns">
                {props.plants.map(function (plant) {
                  return (
                    <PlantCard
                      plant={plant}
                      collapseHandler={props.collapseHandler}
                      collapse={props.collapse}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default PlantList;
