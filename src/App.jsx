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
    // {
    //   id: 4,
    //   name: "password",
    //   type: "password",
    //   placeholder: "Password",
    //   errorMessage:
    //     "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    //   label: "Password",
    //   pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    //   required: true,
    // },
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
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: values.name,
      email: values.email,
      phoneNumber: values.contact,
      category: values.category,
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
          // if (window.confirm("Your records has been saved")) {
          //   document.location = "http://stackoverflow.com/";
          // }
          alert("Your records has been saved");
        window.location = "https://paramupyog.com/pages/copy-of-catalogue";
      })
      .catch((error) => console.log("error", error));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Enter your Details!!</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
