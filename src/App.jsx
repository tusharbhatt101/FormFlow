// import "./App.css";
// import Form from "./Form";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route exact path="/" element={<Form />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import "./App.css";
import FormInput from "./Components/FormInput";

const App = () => {
  const [option,setOption]=useState(null)
  const [buttonLoader,setButtonLoader]=useState(false)
  const [values, setValues] = useState({
    name: "",
    email: "",
    contact: "",
    category: "",
  });

  const categories = [
    "Retailer",
    "Wholesaler",
    "Distributor",
    "Caterer",
    "Restaurant or cafe owner",
    "Others please specify",
  ];

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage: "It should allow only characters",
      label: "Name",
      pattern: "^[a-zA-Z ]+$",
      required: true,
    },

    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "contact",
      type: "tel",
      placeholder: "Phone Number",
      label: "Phone Number",
      errorMessage: "It should be of 10 digits!",
      pattern: "[0-9]{10}",
      required: true,
    },
    {
      id: 4,
      name: "category",
      type: "dropdown",
      placeholder: "Category",
      errorMessage: "It should allow only characters",
      label: "Category",
      options: categories,
      required: true,
    },
    {
      id: 5,
      name: "other",
      type: "text",
      placeholder: "Other category",
      errorMessage:
        "It should not be empty",
      label: "",
     
      required: true,
    },
    // {
    //   id: 5,
    //   name: "confirmPassword",
    //   type: "password",
    //   placeholder: "Confirm Password",
    //   errorMessage: "Passwords don't match!",
    //   label: "Confirm Password",
    //   pattern: values.password,
    //   required: true,
    // },
  ];

  const handleSubmit = (e) => {
    setButtonLoader(true)
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: values.name,
      email: values.email,
      phoneNumber: values.contact,
      category: option== "Others please specify"?values.other : values.category,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.event-plus.in/api2/user/addUser", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.responseCode == 201)
        setButtonLoader(false)
          // if (window.confirm("Your records has been saved")) {
          //   document.location = "http://stackoverflow.com/";
          // }
          // alert("Your records has been saved");
        window.location = "https://paramupyog.com/pages/copy-of-catalogue";
      })
      .catch((error) => {
        setButtonLoader(false)
        console.log("error", error)});
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
console.log(values,"values")
  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Enter your Details!!</h1>
        {(option== "Others please specify"?inputs:inputs.slice(0,-1)).map((input) => (
          <FormInput
            key={input.id}
            setOption={setOption}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="animated-button" type="submit">
       
{buttonLoader && <span className="loading loading--full-height"></span>}
          Submit</button>
      </form>
    </div>
  );
};

export default App;
