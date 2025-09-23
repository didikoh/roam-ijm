import SelectConcept from "@assets/menu/concept.webp";
import SelectLocation from "@assets/menu/location.webp";
import AiButton from "@assets/menu/Ai-Button.png";
import Select360VR from "@assets/menu/360VR.webp";
import SelectRegister from "@assets/menu/register.webp";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@context/AppContext";

const BottomMenu = () => {
  const { activatedMenu, setActivatedMenu } = useAppContext();
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const menuItems = [
    { img: SelectConcept, alt: "Concept", label: "CONCEPT", value: 'concept' },
    { img: SelectLocation, alt: "Location", label: "LOCATION", value: 'location' },
    { img: AiButton, alt: "AI Chatbot", label: "AI", value: 'ai' },
    { img: Select360VR, alt: "Gallery", label: "Gallery", value: 'gallery' },
    { img: SelectRegister, alt: "Register", label: "REGISTER", value: 'register' },
  ];

  useEffect(() => {
    const idx = menuItems.findIndex(item => item.value === activatedMenu);
    if (idx !== -1 && btnRefs.current[idx]) {
      const btn = btnRefs.current[idx];
      setIndicatorLeft(btn.offsetLeft + btn.offsetWidth / 2 - 32); // 27.5 = indicator宽度一半
    }
  }, [activatedMenu, menuItems]);

  return (
    <div className='bottom-menu'>
      <div className='bottom-menu__container'>
        {menuItems.map((item, idx) => (
          <button
            className={
              'bottom-menu__item' +
              (activatedMenu === item.value ? ' bottom-menu__item--active' : '')
            }
            key={item.label}
            onClick={() => setActivatedMenu(item.value)}
            ref={el => { btnRefs.current[idx] = el; }}
          >
            <img src={item.img} alt={item.alt} />
            <span>{item.label}</span>
          </button>
        ))}
        {activatedMenu && (<div
          className="bottom-menu__indicator"
          style={{
            left: indicatorLeft,
            transition: "left 0.4s cubic-bezier(.4,0,.2,1)"
          }}
        ></div>
        )}
      </div>
    </div>
  )
}

export default BottomMenu