import Loginform from "./components/Loginform";
// import Navbar from "./components/Navbar";
import adminAuth from "./hooks/adminAuth";
// import Mainnav from "./components/Mainnav";
import Home from "./components/Home";
import AdminReg from "./components/adminReg";
import AppRoute from "./routes/appRouter";
function App() {
  const { loading, theme } = adminAuth();

  // console.log(theme);

  if (loading) {
    return <p className="text-4xl text-primary">LOADING</p>;
  }

  return (
    // <div data-theme="valentine" className="min-h-screen">
    <div data-theme={theme ? "valentine" : "wireframe"} className="min-h-screen">
      <AppRoute />
    </div>
  );
}

export default App;
