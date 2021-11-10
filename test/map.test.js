import Map from "../client/components/Map";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// write a test for the Map component
  
describe("Map", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Map />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
}
);
