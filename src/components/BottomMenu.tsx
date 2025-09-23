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
  const barRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<number | null>(null);

  const animateActiveX = (toPx: number, durationMs = 400) => {
    if (!barRef.current) return;
    // cancel previous anim
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const style = getComputedStyle(barRef.current);
    const current = parseFloat(style.getPropertyValue("--active-x")) || 0;
    const start = current;
    const delta = toPx - start;
    const t0 = performance.now();
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const step = () => {
      const p = Math.min(1, (performance.now() - t0) / durationMs);
      const val = start + delta * ease(p);
      barRef.current!.style.setProperty("--active-x", `${val}px`);
      if (p < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    };
    animRef.current = requestAnimationFrame(step);
  };

  const menuItems = [
    { img: SelectConcept, alt: "Concept", label: "CONCEPT", value: 'concept' },
    { img: SelectLocation, alt: "Location", label: "LOCATION", value: 'location' },
    { img: AiButton, alt: "AI", label: "AI", value: 'ai' },
    { img: Select360VR, alt: "360 VR", label: "360 VR", value: '360vr' },
    { img: SelectRegister, alt: "Register", label: "REGISTER", value: 'register' },
  ];

  useEffect(() => {
    const idx = menuItems.findIndex(item => item.value === activatedMenu);
    if (idx !== -1 && btnRefs.current[idx]) {
      const btn = btnRefs.current[idx];
      const left = btn.offsetLeft + btn.offsetWidth / 2 - 32;
      setIndicatorLeft(left);
      // animate CSS var for notch center (circle center)
      animateActiveX(left + 32);
    }
  }, [activatedMenu, menuItems]);

  return (
    <div className='bottom-menu'>
      <div className='bottom-menu__container' ref={barRef}>
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