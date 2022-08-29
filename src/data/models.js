const modelData = [

  /*
   *  ACCESSORIES
   */

  {
    id: "camera-bag",
    name: "Camera Bag",
    assetName: "camera-bag",
    category: "Accessories",
    description: "",
  },
  {
    id: "leather-bag",
    name: "Leather Bag",
    assetName: "leather-bag",
    category: "Accessories",
    description: "",
  },
  {
    id: "leather-satchel",
    name: "Leather Satchel",
    assetName: "leather-satchel",
    category: "Accessories",
    description: "",
  },
  {
    id: "propeller-hat",
    name: "Propeller Hat",
    assetName: "propeller-hat",
    category: "Accessories",
    description: "",
  },
  {
    id: "scarf",
    name: "Scarf",
    assetName: "scarf",
    category: "Accessories",
    description: "",
  },
  {
    id: "scifi-glasses",
    name: "Scifi Glasses",
    assetName: "scifi-glasses",
    category: "Accessories",
    description: "",
  },
  {
    id: "sunglasses",
    name: "Sunglasses",
    assetName: "sunglasses",
    category: "Accessories",
    description: "",
  },
  {
    id: "visor",
    name: "Visor",
    assetName: "visor",
    category: "Accessories",
    description: "",
  },
  {
    id: "watch",
    name: "Watch",
    assetName: "watch",
    category: "Accessories",
    description: "",
  },

  /*
   * ANIMALS
   */

  {
    id: "crocodile",
    name: "Crocodile",
    assetName: "crocodile",
    category: "Animals",
    description: "",
  },
  {
    id: "monarch-butterfly",
    name: "Monarch Butterfly",
    assetName: "monarch-butterfly",
    category: "Animals",
    description: "",
  },
  {
    id: "panda",
    name: "Panda",
    assetName: "panda",
    category: "Animals",
    description: "",
  },
  {
    id: "wasp",
    name: "Wasp",
    assetName: "wasp",
    category: "Animals",
    description: "",
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
    description: "",
  },
  {
    id: "clownfish",
    name: "Clownfish",
    assetName: "clownfish",
    category: "Fish",
    description: "",
  },
  {
    id: "moorish-idol",
    name: "Moorish Idol",
    assetName: "moorish-idol",
    category: "Fish",
    description: "",
  },
  {
    id: "royal-blue-tang",
    name: "Royal Blue Tang",
    assetName: "royal-blue-tang",
    category: "Fish",
    description: "",
  },

  /*
   * LANDSCAPES
   */

  {
    id: "kerzaz-oasis",
    name: "Kerzaz Oasis",
    assetName: "kerzaz-oasis",
    category: "Landscapes",
    description: "",
  },

  /*
   * PEOPLE
   */

  {
    id: "chef",
    name: "Chef",
    assetName: "chef",
    category: "People",
    description: "",
  },
  {
    id: "magician",
    name: "Magician",
    assetName: "magician",
    category: "People",
    description: "",
  },
]

modelData.sort((a, b) => a.name < b.name ? -1 : 1)

export default modelData;
