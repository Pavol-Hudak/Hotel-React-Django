import { useLocation } from "react-router-dom";
import RoomList from "./RoomList";

const RoomsPreview:React.FC = () => {
    const location = useLocation();
    const {parsedData} = location.state || {parsedData: []};
    return(
        <div>
            {/* <Navbar/> */}
            <RoomList roomData={parsedData} />
        </div>
        )
}
export default RoomsPreview;