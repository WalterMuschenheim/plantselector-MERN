let categories = { height: ["0 to 3", "3 to 9"], light: ["bright", "dim"] };

const plants = {};
for (const plant in plants) {
  for (const criterion in plant.criteria) {
    const cats = Object.keys(categories);
    if (!cats.includes(criterion)) {
      categories[criterion] = [];
    }
    if (!categories[criterion].includes(plant.criteria[criterion])) {
      categories[criterion].push(plant.criteria[criterion]);
    }
  }
}

const FilterNavDropdown = () => {
  for (const category in this.props.categories) {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          {`${category.toLocaleUpperCase()}`}
        </DropdownToggle>
        <DropdownMenu id={`${category}`}>
          {() => {
            for (const item in category) {
              return (
                <DropdownItem
                  className="filter-item"
                  data-crittype={`${category}`}
                  data-critval={`${item}`}
                >
                  {`${item}`}
                </DropdownItem>
              );
            }
          }}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
};

const RoomsDropdown = () => {
  if (this.props.rooms !== undefined) {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Rooms
        </DropdownToggle>
        <DropdownMenu id="rooms">
          {() => {
            for (const item in this.props.rooms) {
              return (
                <DropdownItem
                  className="filter-item"
                  data-crittype="rooms"
                  data-critval={`${item}`}
                >
                  {`${item}`}
                </DropdownItem>
              );
            }
          }}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
};
