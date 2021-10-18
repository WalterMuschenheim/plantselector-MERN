var heightofplant = [
  "0 to 1 foot",
  "1 to 3 feet",
  "3 to 6 feet",
  "6 to 9 feet",
  "over 9 feet",
];
var lightofplant = [
  "low indirect",
  "bright indirect",
  "partial direct",
  "full direct",
];
var careofplant = [
  "loves neglect",
  "tolerates neglect",
  "needs attention",
  "needs extra attention",
];

export const PLANTS = [
  {
    name: "Ficus",
    imageURL: "ficus.jpg",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur sagittis tellus, eget congue leo tempor quis. Nunc interdum ex nec felis commodo ultrices. Vestibulum non dui sit amet turpis ullamcorper condimentum. Quisque vitae finibus dolor. Donec at egestas nisl, at gravida ex. Etiam euismod leo tellus, eu lobortis justo venenatis non. Duis vel augue nec elit placerat aliquam sit amet a elit. Fusce in congue arcu. Nam in mauris molestie, pretium nisi eget, porttitor ligula. Maecenas lobortis sem vitae tempus dapibus. Sed sed turpis libero. Nunc ac elit id leo posuere pharetra vitae ac velit. Duis sed arcu nulla.",
    keywords: "",
    height: heightofplant[Math.floor(Math.random() * 4)],
    light: lightofplant[Math.floor(Math.random() * 4)],
    care: careofplant[Math.floor(Math.random() * 4)],
  },

  {
    name: "Antler Fern",
    imageURL: "antlerfern.jpg",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    longDescription:
      "Ut vel imperdiet dui. Maecenas ante enim, sodales at efficitur id, bibendum ut mauris. Proin volutpat est eget luctus laoreet. Curabitur suscipit posuere mi. Nullam mattis, elit in cursus aliquam, neque purus fermentum enim, eu laoreet nibh massa sed odio. Ut faucibus, sem eu egestas molestie, sapien lectus pharetra sapien, id consequat massa lacus ut dui. Donec tortor nibh, imperdiet sed porttitor a, efficitur in ante. Sed at pulvinar neque, id pretium magna. Vivamus volutpat nisl lectus, fringilla lacinia leo molestie et. Vestibulum id nisi luctus, vulputate massa eu, tincidunt velit. Proin vestibulum nunc a ex pulvinar, eget fermentum tellus porttitor. In iaculis sed erat nec vehicula. Morbi volutpat, ligula quis auctor fermentum, augue quam auctor magna, vel tincidunt nulla erat vitae dui. Sed eu est id sapien vestibulum venenatis eu et nunc. In id auctor urna, sit amet accumsan nulla. Aenean eu nisl luctus, euismod magna sit amet, imperdiet turpis.",
    keywords: "",
    height: heightofplant[Math.floor(Math.random() * 4)],
    light: lightofplant[Math.floor(Math.random() * 4)],
    care: careofplant[Math.floor(Math.random() * 4)],
  },

  {
    name: "Bird of Paradise",
    imageURL: "birdofparadise.jpg",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    longDescription:
      "Nam odio libero, sodales nec sodales a, tempus at neque. Donec eu diam congue, placerat tellus id, ultrices eros. Nunc a mi libero. Maecenas leo sapien, scelerisque sit amet congue et, fermentum at tellus. Nunc ut dolor est. Mauris pharetra, neque ac malesuada congue, lorem nunc pellentesque nulla, auctor bibendum sapien urna bibendum erat. Duis nec vehicula nibh. Nam nec congue est, non mattis est. Ut ante mi, rhoncus a massa in, tincidunt porta mauris. Nullam sit amet tellus eu magna semper accumsan consectetur eget enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed rhoncus mauris. Aliquam erat volutpat. Suspendisse ipsum lacus, molestie sed consectetur nec, blandit vel ex. Mauris mattis, nisi nec congue sodales, erat purus ultrices ex, in tincidunt lorem elit rutrum lorem. Donec consequat pharetra tempus.",
    keywords: "",
    height: heightofplant[Math.floor(Math.random() * 4)],
    light: lightofplant[Math.floor(Math.random() * 4)],
    care: careofplant[Math.floor(Math.random() * 4)],
  },

  {
    name: "Birds Nest Fern",
    imageURL: "birdsnestfern.jpg",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    longDescription:
      "Nam odio libero, sodales nec sodales a, tempus at neque. Donec eu diam congue, placerat tellus id, ultrices eros. Nunc a mi libero. Maecenas leo sapien, scelerisque sit amet congue et, fermentum at tellus. Nunc ut dolor est. Mauris pharetra, neque ac malesuada congue, lorem nunc pellentesque nulla, auctor bibendum sapien urna bibendum erat. Duis nec vehicula nibh. Nam nec congue est, non mattis est. Ut ante mi, rhoncus a massa in, tincidunt porta mauris. Nullam sit amet tellus eu magna semper accumsan consectetur eget enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed rhoncus mauris. Aliquam erat volutpat. Suspendisse ipsum lacus, molestie sed consectetur nec, blandit vel ex. Mauris mattis, nisi nec congue sodales, erat purus ultrices ex, in tincidunt lorem elit rutrum lorem. Donec consequat pharetra tempus.",
    keywords: "",
    height: heightofplant[Math.floor(Math.random() * 4)],
    light: lightofplant[Math.floor(Math.random() * 4)],
    care: careofplant[Math.floor(Math.random() * 4)],
  },

  {
    name: "Cactus",
    imageURL: "cactus.jpg",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    longDescription:
      "Nam odio libero, sodales nec sodales a, tempus at neque. Donec eu diam congue, placerat tellus id, ultrices eros. Nunc a mi libero. Maecenas leo sapien, scelerisque sit amet congue et, fermentum at tellus. Nunc ut dolor est. Mauris pharetra, neque ac malesuada congue, lorem nunc pellentesque nulla, auctor bibendum sapien urna bibendum erat. Duis nec vehicula nibh. Nam nec congue est, non mattis est. Ut ante mi, rhoncus a massa in, tincidunt porta mauris. Nullam sit amet tellus eu magna semper accumsan consectetur eget enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed rhoncus mauris. Aliquam erat volutpat. Suspendisse ipsum lacus, molestie sed consectetur nec, blandit vel ex. Mauris mattis, nisi nec congue sodales, erat purus ultrices ex, in tincidunt lorem elit rutrum lorem. Donec consequat pharetra tempus.",
    keywords: "",
    height: heightofplant[Math.floor(Math.random() * 4)],
    light: lightofplant[Math.floor(Math.random() * 4)],
    care: careofplant[Math.floor(Math.random() * 4)],
  },

  {
    name: "Dracaena",
    imageURL: "dracaena.jpg",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    longDescription:
      "Nam odio libero, sodales nec sodales a, tempus at neque. Donec eu diam congue, placerat tellus id, ultrices eros. Nunc a mi libero. Maecenas leo sapien, scelerisque sit amet congue et, fermentum at tellus. Nunc ut dolor est. Mauris pharetra, neque ac malesuada congue, lorem nunc pellentesque nulla, auctor bibendum sapien urna bibendum erat. Duis nec vehicula nibh. Nam nec congue est, non mattis est. Ut ante mi, rhoncus a massa in, tincidunt porta mauris. Nullam sit amet tellus eu magna semper accumsan consectetur eget enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed rhoncus mauris. Aliquam erat volutpat. Suspendisse ipsum lacus, molestie sed consectetur nec, blandit vel ex. Mauris mattis, nisi nec congue sodales, erat purus ultrices ex, in tincidunt lorem elit rutrum lorem. Donec consequat pharetra tempus.",
    keywords: "",
    height: heightofplant[Math.floor(Math.random() * 4)],
    light: lightofplant[Math.floor(Math.random() * 4)],
    care: careofplant[Math.floor(Math.random() * 4)],
  },

  {
    name: "Iron Plant",
    imageURL: "ironplant.jpg",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    longDescription:
      "Nam odio libero, sodales nec sodales a, tempus at neque. Donec eu diam congue, placerat tellus id, ultrices eros. Nunc a mi libero. Maecenas leo sapien, scelerisque sit amet congue et, fermentum at tellus. Nunc ut dolor est. Mauris pharetra, neque ac malesuada congue, lorem nunc pellentesque nulla, auctor bibendum sapien urna bibendum erat. Duis nec vehicula nibh. Nam nec congue est, non mattis est. Ut ante mi, rhoncus a massa in, tincidunt porta mauris. Nullam sit amet tellus eu magna semper accumsan consectetur eget enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed rhoncus mauris. Aliquam erat volutpat. Suspendisse ipsum lacus, molestie sed consectetur nec, blandit vel ex. Mauris mattis, nisi nec congue sodales, erat purus ultrices ex, in tincidunt lorem elit rutrum lorem. Donec consequat pharetra tempus.",
    keywords: "",
    height: heightofplant[Math.floor(Math.random() * 4)],
    light: lightofplant[Math.floor(Math.random() * 4)],
    care: careofplant[Math.floor(Math.random() * 4)],
  },

  {
    name: "Pothos",
    imageURL: "pothos.jpg",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    longDescription:
      "Nam odio libero, sodales nec sodales a, tempus at neque. Donec eu diam congue, placerat tellus id, ultrices eros. Nunc a mi libero. Maecenas leo sapien, scelerisque sit amet congue et, fermentum at tellus. Nunc ut dolor est. Mauris pharetra, neque ac malesuada congue, lorem nunc pellentesque nulla, auctor bibendum sapien urna bibendum erat. Duis nec vehicula nibh. Nam nec congue est, non mattis est. Ut ante mi, rhoncus a massa in, tincidunt porta mauris. Nullam sit amet tellus eu magna semper accumsan consectetur eget enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed rhoncus mauris. Aliquam erat volutpat. Suspendisse ipsum lacus, molestie sed consectetur nec, blandit vel ex. Mauris mattis, nisi nec congue sodales, erat purus ultrices ex, in tincidunt lorem elit rutrum lorem. Donec consequat pharetra tempus.",
    keywords: "",
    height: heightofplant[Math.floor(Math.random() * 4)],
    light: lightofplant[Math.floor(Math.random() * 4)],
    care: careofplant[Math.floor(Math.random() * 4)],
  },

  {
    name: "Pathos",
    imageURL: "pothos.jpg",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    longDescription:
      "Nam odio libero, sodales nec sodales a, tempus at neque. Donec eu diam congue, placerat tellus id, ultrices eros. Nunc a mi libero. Maecenas leo sapien, scelerisque sit amet congue et, fermentum at tellus. Nunc ut dolor est. Mauris pharetra, neque ac malesuada congue, lorem nunc pellentesque nulla, auctor bibendum sapien urna bibendum erat. Duis nec vehicula nibh. Nam nec congue est, non mattis est. Ut ante mi, rhoncus a massa in, tincidunt porta mauris. Nullam sit amet tellus eu magna semper accumsan consectetur eget enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed rhoncus mauris. Aliquam erat volutpat. Suspendisse ipsum lacus, molestie sed consectetur nec, blandit vel ex. Mauris mattis, nisi nec congue sodales, erat purus ultrices ex, in tincidunt lorem elit rutrum lorem. Donec consequat pharetra tempus.",
    keywords: "",
    height: heightofplant[Math.floor(Math.random() * 4)],
    light: lightofplant[Math.floor(Math.random() * 4)],
    care: careofplant[Math.floor(Math.random() * 4)],
  },

  {
    name: "Zeezee",
    imageURL: "zeezee.jpg",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    longDescription:
      "Nam odio libero, sodales nec sodales a, tempus at neque. Donec eu diam congue, placerat tellus id, ultrices eros. Nunc a mi libero. Maecenas leo sapien, scelerisque sit amet congue et, fermentum at tellus. Nunc ut dolor est. Mauris pharetra, neque ac malesuada congue, lorem nunc pellentesque nulla, auctor bibendum sapien urna bibendum erat. Duis nec vehicula nibh. Nam nec congue est, non mattis est. Ut ante mi, rhoncus a massa in, tincidunt porta mauris. Nullam sit amet tellus eu magna semper accumsan consectetur eget enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum sed rhoncus mauris. Aliquam erat volutpat. Suspendisse ipsum lacus, molestie sed consectetur nec, blandit vel ex. Mauris mattis, nisi nec congue sodales, erat purus ultrices ex, in tincidunt lorem elit rutrum lorem. Donec consequat pharetra tempus.",
    keywords: "",
    height: heightofplant[Math.floor(Math.random() * 4)],
    light: lightofplant[Math.floor(Math.random() * 4)],
    care: careofplant[Math.floor(Math.random() * 4)],
  },
];
