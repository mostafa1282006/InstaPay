import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="w-full h-dvh flex justify-center">
      <div className="container">
        <header className="flex font-bold text-3xl p-3 justify-between items-center">
          <Link to="insta">This Is InstaPay page</Link>
          <Link to="login">This Is Login page</Link>
        </header>
        <div className="w-full h-[90vh] flex justify-center items-center">
          <h1 className="font-bold text-3xl">This Is Home Page</h1>
        </div>
      </div>
    </div>
  );
}
