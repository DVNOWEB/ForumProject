
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/Rootlayout/Rootlayout";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import { UserProvider } from "./Context/Context";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Details />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};
    

export default App;
