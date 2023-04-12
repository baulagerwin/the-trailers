import Navbar from "../navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="layout">
      <div className="layout__navbar">
        <Navbar />
      </div>
      <div className="layout__page">{children}</div>
    </div>
  );
}

export default Layout;
