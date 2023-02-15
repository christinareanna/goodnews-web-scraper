import React, { useState, useEffect } from "react";
import './App.css';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  // const [message, setmessage] = useState("");


  // fetch('http://localhost:8000')
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  // const Data = () => {

  //   fetch("http://localhost:8000").then(async response => {
  //     try {
  //       const data = await response.json()
  //       console.log('Response data???', data)
  //     } catch (error) {
  //       console.log("Error done happened here folks")
  //       console.error(error)
  //     }
  //   })
  // }

  // const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        <ul>
          {items.map((item, idx) => (
            <li item={item} key={idx}>
              {item.title} {item.url}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// useEffect(() => {
//   fetch("http://localhost:8000/items")
//   .then(res => res.json())
//   .then(data => setData(data))
// }, [])



// return (
//   <ul>

//   </ul>
// <div>
// <p><Data/></p> */}
// <Router>
//   <Routes>
//     <Route path="/">{response}</Route>
//   </Routes>
// </Router>
// </div>
//   );
// }

export default App;
