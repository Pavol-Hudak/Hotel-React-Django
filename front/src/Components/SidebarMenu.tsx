import '../CSS/sidebar.css'
import { useEffect } from 'react';


const SidebarMenu: React.FC = () => {

    useEffect(() => {
        // Add smooth scrolling behavior to anchor links
        const sidebarLinks = document.querySelectorAll('.sidebar-list a');
    
        sidebarLinks.forEach((link) => {
          link.addEventListener('click', (event) => {
            event.preventDefault();
    
            const targetId:any = link.getAttribute('href')?.substring(1); // Remove the '#' from the href
            const targetSection = document.getElementById(targetId);
    
            if (targetSection) {
              targetSection.scrollIntoView({
                behavior: 'smooth',
              });
            }
          });
        });
      }, []);

    return(
        <div className="sidebar-container">
            <ul className="sidebar-list">
                <li>
                    <a href="#personal-information">Personal information</a>
                </li>
                <li>
                    <a href="#your-reservation">Your reservations</a>
                </li>
                <li>
                    <a href="#personal-information2">Placeholder</a>
                </li>
                <li> 
                    <a href="/profile">Placeholder</a>
                </li>
            </ul>
        </div>
    )
}
export default SidebarMenu;