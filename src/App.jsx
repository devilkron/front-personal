
import adminAuth from "./hooks/adminAuth";

import AppRoute from "./routes/appRouter";
function App() {
  const { loading, theme } = adminAuth();

  // console.log(theme);

  if (loading) {
    return <p className="text-4xl text-primary">LOADING</p>;
  }

  return (
    // <div data-theme="valentine" className="min-h-screen">
    <div data-theme={theme ? "sunset" : "light"} className="min-h-screen">
      <AppRoute />
    </div>
  );
}

export default App;
