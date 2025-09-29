import TopNavbar from "components/Navbars/TopNavbar";

function RegularLayout({ children }) {
  return (
    <>
      <TopNavbar />
      <div className="main-content">{children}</div>
    </>
  );
}

export default RegularLayout