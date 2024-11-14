import * as Yup from "yup";

//const url1 = /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+\.[a-z0-9]$/i;

//const url2 = /^((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/i;
/*const url3 =
  /^((http|https):\/\/)?(www.)?(?!.(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-%\/@?]+)([^\/\w\?[a-zA-Z0-9-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const url =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/i;
*/

export const itemSchema = Yup.object().shape({
  itemName: Yup.string()
    .min(10, "At least 10 Chars!")
    .max(100, "Too Long!")
    .required("This field is Required!"),
  itemLink: Yup.string()
    .url("Invalid URL!")
    //.matches(url, "Invalid URL!")
    .required("A link is Required!"),
  condition: Yup.string().required("You have to select one of the options!"),
  description: Yup.string()
    .min(20, "Please describe it in more words!")
    .max(700, " You reached the maximum of the description field!")
    .required("This field is Required!"),
});
