import { Nav, Tab } from "../components/About.styled";
import { Links } from "../components/SharedLayout.styled";
import { Outlet } from "react-router-dom";

const About = () => {
  return (
    <main style={{ minHeight: "625px" }}>
      <div>
        <Nav>
          <ul>
            <Tab>
              <Links to="/about/">Про нас</Links>
            </Tab>
            <Tab>
              <Links to="team">Дізнайтеся про нашу команду</Links>
            </Tab>
            <Tab>
              <Links to="reviews">Ознайомтесь з відгуками</Links>
            </Tab>
          </ul>
        </Nav>

        <Outlet />
      </div>
    </main>
  );
};
export default About;
