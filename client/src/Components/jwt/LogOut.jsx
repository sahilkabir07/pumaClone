import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext";

export const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    if (!loggedOut) {
      logout();
      toast.success("Logged out successfully!");
      console.log("🔒 User logged out");
      setLoggedOut(true);
      navigate("/login");
    }
  }, [logout, navigate, loggedOut]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 pt-28">
      <div className="text-lg text-gray-700 font-medium">
        Logging you out...
      </div>
    </div>
  );
};
