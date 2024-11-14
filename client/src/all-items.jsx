/*export async function loadItems() {
  try {
    const response = await fetch("http://localhost:3000/items", {
      method: "GET",
      mode: "no-cors",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
  
}
*/
export const singleItem = {
  id: null,
  name: "",
  url: "",
  condition: "",
  condition_id: 0,
  description: "",
};



export const allItems = [
  {
    id: 1,
    name: "Canon EOS R6 Mark II Bod",
    url: "https://i.ebayimg.com/images/g/CvgAAOSwx9djre5E/s-l1600.webp",
    condition: "New",
    description: "Fantastic Camera! 4K Video! ",
  },
  {
    id: 2,
    name: "LG OLED65C3P 65-Inch OLED evo C3 4K Smart TV",
    url: "https://i.ebayimg.com/thumbs/images/g/wYcAAOSwV2hka69F/s-l960.webp",
    condition: "Open Box",
    description: "Amazing Product!",
  },
  {
    id: 3,
    name: "Sony MDRRF912RK Wireless Stereo Home Theater Headphones, Black",
    url: "https://i.ebayimg.com/images/g/FVQAAOSwBQJlxBp3/s-l1600.webp",
    condition: "Refurbished",
    description: "The best Headphones you could get..",
  },
  {
    id: 4,
    name: "FAO Schwarz Stage Stars Portable Piano and Synthesizer",
    url: "https://i.ebayimg.com/images/g/LmcAAOSwvPNmoZuq/s-l1600.webp",
    condition: "Used",
    description: "",
  },

  {
    id: 5,
    name: "Versace Womens Sport Tech Stainless Steel 40mm Strap Fashion Watch",
    url: "https://i.ebayimg.com/images/g/zNEAAOSwZo9mfuv9/s-l1600.webp",
    condition: "Open Box",
    description: "So beautiful!",
  },

  {
    id: 6,
    name: "Amazon Essentials Men's Easy to Read Strap Watch",
    url: "https://m.media-amazon.com/images/I/81SkKZjDDyL._AC_SY550_.jpg",
    condition: "Open Box",
    description: "You will Look fantastic with this beautiful Watch!",
  },
];
