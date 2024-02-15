import  { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

export const CustomSelect = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
   const [selectedText, setSelectedText] = useState('Seleccionar'); 
  const optionsRef = useRef(null);
  const elementsBelowRef = useRef([]);



  useEffect(() => {
    if (isOpen && optionsRef.current) {
      const { height } = optionsRef.current.getBoundingClientRect();
      elementsBelowRef.current.forEach((element) => {
        if (element) { // Verifica que element no sea null
          element.style.marginTop = `${height}px`;
        }
      });
    } else {
      elementsBelowRef.current.forEach((element) => {
        if (element) { // Verifica que element no sea null
          element.style.marginTop = '0';
        }
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setIsOpen(true);
      }
    };
  
    window.addEventListener('click', handleWindowClick);
  
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    console.log({isOpen})
    setSelectedOption(option);
    setIsOpen(false);

    onChange(option.value); // Propagar el valor seleccionado al componente padre
  };





  return (
    <div className="custom-select">
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : 'Seleccionar'}
      </div>
      {isOpen && (
        <div className="options" ref={optionsRef}>
          {options.map((option) => (
            <div key={option.value} className="option" onClick={() => handleSelect(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
      {/* Espacio adicional para desplazar elementos debajo del select */}
      <div ref={(ref) => elementsBelowRef.current.push(ref)}></div>
    </div>
  );
};
