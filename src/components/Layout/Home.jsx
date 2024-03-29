import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Home = () => {
    return (
        <div>
            {/* Header component is common. outlet is used for changing components.  */}
            <Header></Header>               
            <Outlet></Outlet>
        </div>
    );
};

export default Home;