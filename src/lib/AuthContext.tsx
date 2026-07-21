/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string; // mobile number is the ID
  name: string;
  mobile: string;
  role: "student";
}

interface AuthContextProps {
  currentUser: User | null;
  loading: boolean;
  sendOTP: (mobile: string) => Promise<{ success: boolean; otp: string }>;
  verifyOTP: (mobile: string, name: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const USERS_DB_KEY = "aaa_users_db";
const SESSION_KEY = "aaa_current_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session
  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        setCurrentUser(JSON.parse(session));
      } catch (e) {
        console.error("Failed to restore session", e);
      }
    }
    setLoading(false);
  }, []);

  const sendOTP = async (mobile: string) => {
    // Generate a simple 6-digit OTP code
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem(`otp_${mobile}`, generatedOTP);

    const apiKey = (import.meta as any).env.VITE_FAST2SMS_API_KEY;
    if (apiKey && apiKey !== "YOUR_FAST2SMS_API_KEY_HERE" && apiKey.trim() !== "") {
      try {
        const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
          method: "POST",
          headers: {
            "authorization": apiKey,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "variables_values": generatedOTP,
            "route": "otp",
            "numbers": mobile
          })
        });
        const result = await response.json();
        if (result.return) {
          console.log("OTP successfully sent via Fast2SMS API:", result);
        } else {
          console.warn("Fast2SMS API error, using local simulator:", result);
        }
      } catch (err) {
        console.error("Fast2SMS API failed, using local simulator:", err);
      }
    } else {
      console.log("No Fast2SMS API Key found, using local simulated OTP:", generatedOTP);
    }

    return { success: true, otp: generatedOTP };
  };

  const verifyOTP = async (mobile: string, name: string, otp: string) => {
    const storedOtp = sessionStorage.getItem(`otp_${mobile}`);
    if (!storedOtp || storedOtp !== otp) {
      return { success: false, error: "Invalid OTP code. Please try again." };
    }

    const usersRaw = localStorage.getItem(USERS_DB_KEY);
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    let matched = users.find((u: any) => u.mobile === mobile);
    if (!matched) {
      // Register new user with entered name
      matched = {
        id: mobile,
        name: name.trim() || `Student (${mobile.slice(-4)})`,
        mobile: mobile,
        role: "student",
      };
      users.push(matched);
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    } else {
      // Optionally update name if they entered a new one
      if (name.trim() && matched.name !== name.trim()) {
        matched.name = name.trim();
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
      }
    }

    const userPayload: User = {
      id: matched.id,
      name: matched.name,
      mobile: matched.mobile,
      role: matched.role
    };

    setCurrentUser(userPayload);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userPayload));
    sessionStorage.removeItem(`otp_${mobile}`);

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, sendOTP, verifyOTP, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
