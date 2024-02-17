import Navbar from "./Navbar";
import Search from "./Search";
import '../CSS/home.css'
const Home: React.FC = () => {
  const locations_dict = {
    'Presov': 'Heart of eastern Slovakia',
    'Kosice': 'Jozkossrko',
    'Seoul': 'Jozkossrko',
    'Busan': 'Jozkossrko'
  };
  return (
    <div className='main-container'>
      {/* <Navbar/> */}
      <div style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex:'1'}}>
        <Search/>
      </div>
      <div className="seasonsImage">
        <img id="title-image"src="/static/season_summer.webp" alt="seasons"/>
      </div>
      <section className="locations">
        <div className="locations-container">
          <div className="locations-item">
            <a href="https://upload.wikimedia.org/wikipedia/commons/f/f1/W_Hotel_in_Union_Square_New_York_City.JPG">
              <img src='/static/hotel_cropped.jpg' alt={Object.keys(locations_dict)[0]}/>
              <div className="locations-content">
                <h1 className="location-title">{Object.keys(locations_dict)[0]}</h1>
                <p>{Object.values(locations_dict)[0]}</p>
              </div>
            </a>
            
          </div>
          <div className="locations-item">
            <a href="https://upload.wikimedia.org/wikipedia/commons/f/f1/W_Hotel_in_Union_Square_New_York_City.JPG">
            <img src='/static/hotel_cropped.jpg' alt={Object.keys(locations_dict)[1]}/>
              <div className="locations-content">
                <h1 className="location-title">{Object.keys(locations_dict)[1]}</h1>
                <p>{Object.values(locations_dict)[1]}</p>
              </div>
            </a>
            
          </div>
          <div className="locations-item">
            <a href="https://upload.wikimedia.org/wikipedia/commons/f/f1/W_Hotel_in_Union_Square_New_York_City.JPG">
            <img src='/static/hotel_cropped.jpg' alt={Object.keys(locations_dict)[2]}/>
              <div className="locations-content">
              <h1 className="location-title">{Object.keys(locations_dict)[2]}</h1>
              <p>{Object.values(locations_dict)[2]}</p>
              </div>
            </a>
          </div>
          <div className="locations-item">
            <a href="https://upload.wikimedia.org/wikipedia/commons/f/f1/W_Hotel_in_Union_Square_New_York_City.JPG">
            <img src='/static/hotel_cropped.jpg' alt={Object.keys(locations_dict)[3]}/>
              <div className="locations-content">
                <h1 className="location-title">{Object.keys(locations_dict)[3]}</h1>
                <p>{Object.values(locations_dict)[3]}</p>
              </div>
            </a>            
          </div>
        </div>
      </section>
      <section className="locations activities">
      <div className="locations-container activities-container">
          <div className="locations-item">
            <a href="https://upload.wikimedia.org/wikipedia/commons/f/f1/W_Hotel_in_Union_Square_New_York_City.JPG">
              <img src='/static/hotel_cropped.jpg' alt={Object.keys(locations_dict)[0]}/>
              <div className="locations-content">
                <h1 className="location-title">{Object.keys(locations_dict)[0]}</h1>
                <p>{Object.values(locations_dict)[0]}</p>
              </div>
            </a>
            
          </div>
          <div className="locations-item">
            <a href="https://upload.wikimedia.org/wikipedia/commons/f/f1/W_Hotel_in_Union_Square_New_York_City.JPG">
            <img src='/static/hotel_cropped.jpg' alt={Object.keys(locations_dict)[1]}/>
              <div className="locations-content">
                <h1 className="location-title">{Object.keys(locations_dict)[1]}</h1>
                <p>{Object.values(locations_dict)[1]}</p>
              </div>
            </a>
            
          </div>
          <div className="locations-item">
            <a href="https://upload.wikimedia.org/wikipedia/commons/f/f1/W_Hotel_in_Union_Square_New_York_City.JPG">
            <img src='/static/hotel_cropped.jpg' alt={Object.keys(locations_dict)[2]}/>
              <div className="locations-content">
              <h1 className="location-title">{Object.keys(locations_dict)[2]}</h1>
              <p>{Object.values(locations_dict)[2]}</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section className="special-offer">
        <div className="offer-container">
          <a className="offer-item" href="/offers">
            <img src="/static/season_summer.webp" alt="special_offer"/>
            <div>sdadsa</div>
          </a>

        </div>

      </section>
      <footer>

      </footer>
    </div>
  );
}
export default Home;
