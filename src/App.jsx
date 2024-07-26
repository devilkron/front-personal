
import adminAuth from "./hooks/adminAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoute from "./routes/appRouter";
function App() {
  const { loading, theme } = adminAuth();

  // console.log(theme);

  if (loading) {
    return <span className="loading loading-ring loading-lg">Loading</span>
  }

  return (
    // <div data-theme="valentine" className="min-h-screen">
    <div data-theme={theme ? "sunset" : "light"} className="min-h-screen">
      <ToastContainer/>
      <AppRoute />
    </div>
  );
}

export default App;
