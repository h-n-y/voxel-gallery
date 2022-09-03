
const modelData = [

  /*
   *  ACCESSORIES
   */

  {
    id: "camera-bag",
    name: "Camera Bag",
    assetName: "camera-bag",
    category: "Accessories",
    sceneBgColor: {
      top: "rgb(219, 207, 151)",
      bottom: "rgb(115, 106, 62)"
    },
  },
  {
    id: "leather-bag",
    name: "Leather Bag",
    assetName: "leather-bag",
    category: "Accessories",
    sceneBgColor: {
      top: "white",
      bottom: "rgb(212, 212, 212)"
    },
  },
  {
    id: "leather-satchel",
    name: "Leather Satchel",
    assetName: "leather-satchel",
    category: "Accessories",
    sceneBgColor: {
      top: "rgb(249, 249, 249)",
      bottom: "rgb(90, 33, 26)"
    },
  },
  {
    id: "propeller-hat",
    name: "Propeller Hat",
    assetName: "propeller-hat",
    category: "Accessories",
    sceneBgColor: {
      top: "rgb(54, 54, 54)",
      bottom: "rgb(33, 33, 33)"
    },
  },
  {
    id: "scarf",
    name: "Scarf",
    assetName: "scarf",
    category: "Accessories",
    sceneBgColor: {
      top: "rgb(244, 227, 208)",
      bottom: "rgb(218, 202, 186)"
    },
  },
  {
    id: "scifi-glasses",
    name: "Scifi Glasses",
    assetName: "scifi-glasses",
    category: "Accessories",
    sceneBgColor: {
      top: "rgb(248, 172, 80)",
      bottom: "rgb(100, 27, 75)"
    },
  },
  {
    id: "sunglasses",
    name: "Sunglasses",
    assetName: "sunglasses",
    category: "Accessories",
    sceneBgColor: {
      top: "rgb(79, 255, 185)",
      bottom: "rgb(40, 57, 124)"
    },
  },
  {
    id: "visor",
    name: "Visor",
    assetName: "visor",
    category: "Accessories",
    sceneBgColor: {
      top: "white",
      bottom: "rgb(255, 142, 76)"
    },
  },
  {
    id: "watch",
    name: "Watch",
    assetName: "watch",
    category: "Accessories",
    sceneBgColor: {
      top: "rgb(106, 106, 106)",
      bottom: "rgb(46, 46, 46)"
    },
  },

  /*
   * ANIMALS
   */

  {
    id: "crocodile",
    name: "Crocodile",
    assetName: "crocodile",
    category: "Animals",
    sceneBgColor: {
      top: "rgb(214, 206, 191)",
      bottom: "rgb(68, 53, 49)"
    },
  },
  {
    id: "monarch-butterfly",
    name: "Monarch Butterfly",
    assetName: "monarch-butterfly",
    category: "Animals",
    sceneBgColor: {
      top: "rgb(192, 176, 121)",
      bottom: "rgb(43, 43, 43)"
    },
  },
  {
    id: "panda",
    name: "Panda",
    assetName: "panda",
    category: "Animals",
    sceneBgColor: {
      top: "rgb(220, 208, 189)",
      bottom: "rgb(124, 108, 96)"
    },
  },
  {
    id: "wasp",
    name: "Wasp",
    assetName: "wasp",
    category: "Animals",
    sceneBgColor: {
      top: "rgb(95, 77, 42)",
      bottom: "rgb(67, 49, 26)"
    },
  },

  // TODO: Minify the images for the models below.
  // tnypng.com may have been throttling your usage


  /*
   * FISH
   */

  {
    id: "angler",
    name: "Angler",
    assetName: "angler",
    category: "Fish",
    sceneBgColor: {
      top: "rgb(76, 143, 153)",
      bottom: "rgb(39, 13, 11)"
    },
  },
  {
    id: "clownfish",
    name: "Clownfish",
    assetName: "clownfish",
    category: "Fish",
    sceneBgColor: {
      top: "rgb(95, 151, 221)",
      bottom: "rgb(17, 27, 40)"
    },
  },
  {
    id: "moorish-idol",
    name: "Moorish Idol",
    assetName: "moorish-idol",
    category: "Fish",
    sceneBgColor: {
      top: "rgb(247, 239, 142)",
      bottom: "rgb(105, 23, 124)"
    },
  },
  {
    id: "royal-blue-tang",
    name: "Royal Blue Tang",
    assetName: "royal-blue-tang",
    category: "Fish",
    sceneBgColor: {
      top: "rgb(57, 55, 92)",
      bottom: "rgb(29, 28, 47)",
    },
  },

  /*
   * LANDSCAPES
   */

  {
    id: "kerzaz-oasis",
    name: "Kerzaz Oasis",
    assetName: "kerzaz-oasis",
    category: "Landscapes",
    sceneBgColor: {
      top: "rgb(251, 222, 129)",
      bottom: "rgb(78, 48, 34)"
    },
  },

  /*
   * PEOPLE
   */

  {
    id: "chef",
    name: "Chef",
    assetName: "chef",
    category: "People",
    sceneBgColor: {
      top: "rgb(211, 216, 229)",
      bottom: "rgb(26, 27, 30)"
    },
  },
  {
    id: "magician",
    name: "Magician",
    assetName: "magician",
    category: "People",
    sceneBgColor: {
      top: "white",
      bottom: "rgb(200, 200, 200)"
    },
  },
]
// TODO: comment
modelData.sort((a, b) => a.name < b.name ? -1 : 1)

export default modelData;

export const heroModel = {
  id: 'stiletto-heels',
  name: 'Stiletto Heels',
  assetName: 'stiletto-heels',
  sceneBgColor: {
    top: '#eee',
    bottom: '#eee'
  }
};
