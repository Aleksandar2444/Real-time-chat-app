import "./Navbar.css";

function Navbar() {
  return (
    <div className="Navbar">
      {/* <p>Fast</p>
      <p>Chat</p> */}
      <p aria-label="FastChat">
        <span data-text="F">F</span>
        <span data-text="A">A</span>
        <span data-text="S">S</span>
        <span data-text="T">T</span>
        <span data-text="C">C</span>
        <span data-text="H">H</span>
        <span data-text="A">A</span>
        <span data-text="T">T</span>
      </p>
    </div>
  );
}

export default Navbar;
