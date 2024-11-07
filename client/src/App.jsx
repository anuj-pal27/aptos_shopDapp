import { useEffect, useState } from "react";
import axios from 'axios';
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
// import Wallet from "./pages/Wallet";
import CheckOut from "./pages/CheckOut";
import Orders from "./pages/Orders";


// function App() {
//   // const url = "https://fakestoreapi.com/products";
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     try {
//       async function fetchData() {
//         setLoading(true);
//         axios
//           .get(import.meta.env.VITE_LOCALHOST)
//           .then((newdata) => setData(newdata.data))
//           .catch((err) => console.log(err));
//         // axios.get('http://localhost:8080').then((newdata)=>setData(newdata.data)).catch((err)=>console.log(err))
//         setLoading(false);
//       }
//       fetchData();
//     } catch (error) {
//       console.log("error while fetching data", error);
//     }
//   }, [data]);
//   return (
//     <>
      //   <div className="overflow-x-hidden">
      // <Navbar>
      //     <Routes>
      //       <Route path="/" element={<Home data={data} loading={loading} />} />
      //       <Route path="/cart" element={<Cart />} />
      //       <Route path="/wallet" element={<Wallet />} />
      //       <Route path="/checkout" element={<CheckOut />} />
      //       <Route path="/order" element={<Orders />} />
      //     </Routes>
      
      // </Navbar>
      // </div>
      
//     </>
//   );
// }

// export default App;
import { WalletProvider } from "./pages/WalletProvider";
import WalletConnection from "./pages/WalletConnection";

const App = () => {

      // const url = "https://fakestoreapi.com/products";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      async function fetchData() {
        setLoading(true);
        axios
          .get(import.meta.env.VITE_LOCALHOST)
          .then((newdata) => setData(newdata.data))
          .catch((err) => console.log(err));
        // axios.get('http://localhost:8080').then((newdata)=>setData(newdata.data)).catch((err)=>console.log(err))
        setLoading(false);
      }
      fetchData();
    } catch (error) {
      console.log("error while fetching data", error);
    }
  }, [data]);

    return (

      <div className="App">
          <div className="overflow-x-hidden">
      <Navbar>
          <Routes>
            <Route path="/" element={<Home data={data} loading={loading} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wallet" element={<WalletConnection/>} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/order" element={<Orders />} />
          </Routes>
      
      </Navbar>
      </div>
      </div>

    )
}
export default App;