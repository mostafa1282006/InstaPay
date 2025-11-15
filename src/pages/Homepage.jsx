import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="w-full h-dvh flex justify-center">
      <div className="container">
        <header className="flex font-bold  text-3xl pt-7 justify-between items-center">
          <Link to="insta"><button className="btn btn-primary text-xl font-bold">Click Of InstaPay page</button></Link>
          <Link to="login"><button className="btn btn-primary text-xl font-bold">Click Of Login page</button></Link>
        </header>
        <div className="w-full h-[90vh] flex justify-center items-center">
          <h1 className="font-bold text-3xl">This Is Home Page</h1>
        </div>
      </div>
    </div>
  );
}
