"use client";

import { useState, useEffect } from "react";
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

// Cognito Config
const poolData = {
  UserPoolId: "eu-west-2_fTZM2TOWe",
  ClientId: "5uob9vnl9u9l070t9b1t9g5fo6",
};
const userPool = new CognitoUserPool(poolData);

const API_URL = "https://h0ko7cn4ja.execute-api.eu-west-2.amazonaws.com";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<"bookings" | "messages">("bookings");
  const [checkingSession, setCheckingSession] = useState(true);

  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // Data State
  const [data, setData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Check Session
  useEffect(() => {
    console.log("Checking session...");
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          console.error("Session error:", err);
          setCheckingSession(false);
          return;
        }
        if (session.isValid()) {
          console.log("Session valid");
          setUser(session);
        } else {
          console.log("Session invalid");
        }
        setCheckingSession(false);
      });
    } else {
      console.log("No current user found");
      setCheckingSession(false);
    }
  }, []);

  // Fetch Data on User/View Change
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, view]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const token = user.getIdToken().getJwtToken();
      const res = await fetch(`${API_URL}/admin/${view}`, {
        headers: {
          Authorization: token
        }
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error(e);
    }
    setDataLoading(false);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    const authenticationData = { Username: username, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = { Username: username, Pool: userPool };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        setUser(result);
        setLoading(false);
      },
      onFailure: (err) => {
        console.error("Cognito Login Error:", err);
        setLoginError(err.message || JSON.stringify(err));
        setLoading(false);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // Handle force change password by just setting it to the one used
        cognitoUser.completeNewPasswordChallenge(password, {}, {
          onSuccess: (result) => {
            setUser(result);
            setLoading(false);
          },
          onFailure: (err) => {
            setLoginError("Password challenge failed: " + err.message);
            setLoading(false);
          }
        });
      }
    });
  };

  const handleLogout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) cognitoUser.signOut();
    setUser(null);
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive mb-4"></div>
          <p className="text-olive font-serif text-lg">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-sand max-w-md w-full">
          <h1 className="text-2xl font-serif font-bold text-olive mb-6 text-center">Admin Login</h1>
          {loginError && <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <button disabled={loading} type="submit" className="w-full py-2 bg-olive text-white rounded-md font-bold hover:bg-brown">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-olive">Admin Dashboard</h1>
          <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-red-500">Sign Out</button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView("bookings")}
            className={`px-4 py-2 rounded-md font-medium ${view === "bookings" ? "bg-olive text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
          >
            Table Bookings
          </button>
          <button
            onClick={() => setView("messages")}
            className={`px-4 py-2 rounded-md font-medium ${view === "messages" ? "bg-olive text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
          >
            Messages
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {dataLoading ? (
            <div className="p-8 text-center text-gray-500">Loading data...</div>
          ) : data.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No records found.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {view === "bookings" ? (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item: any, idx) => (
                  <tr key={idx}>
                    {view === "bookings" ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date} {item.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.guests}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phone}<br />{item.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {item.status}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{item.message}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
