import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { socketService } from "@service/socket/socket.service";
import { AppRouter } from "@root/routes";
import Toast from "@components/toast/Toast";
import { useSelector } from "react-redux";

function App() {
  const notifications = useSelector((state) => state.notifications);

  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

  return (
    <>
      {notifications && notifications.length > 0 && (
        <Toast position="top-right" toastList={notifications} autoDelete={false} />
      )}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
