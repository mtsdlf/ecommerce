import './Aside.css'

export const Aside = ({ children }) => {
  return (
    <aside className="aside flex flex-row ">
      {children}
    </aside>
  );
};
