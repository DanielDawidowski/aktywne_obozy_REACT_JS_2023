import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log({ state: user });
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      setOk(true);
    }
  }, [user]);

  return ok ? <Outlet /> : <LoadingToRedirect />;
};

export default AdminRoute;

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && navigate("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="container p-5 text-center">
      <p>Przekierowuje do strony głownej za {count} s</p>
    </div>
  );
};
