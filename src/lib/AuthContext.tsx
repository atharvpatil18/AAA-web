/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string; // Email ID is the ID
  name: string;
  email: string;
  role: "student";
}

interface AuthContextProps {
  currentUser: User | null;
  loading: boolean;
  sendEmailOTP: (email: string, name: string) => Promise<{ success: boolean; error?: string; otp: string }>;
  verifyEmailOTP: (email: string, name: string, otp: string) => Promise<{ success: boolean; error?: string }>;
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

  const sendEmailOTP = async (email: string, name: string) => {
    // Generate a simple 6-digit OTP code
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem(`email_otp_${email}`, generatedOTP);

    const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
    const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

    const hasConfig = serviceId && serviceId !== "YOUR_SERVICE_ID_HERE" &&
                      templateId && templateId !== "YOUR_TEMPLATE_ID_HERE" &&
                      publicKey && publicKey !== "YOUR_PUBLIC_KEY_HERE";

    if (hasConfig) {
      try {
        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              to_name: name,
              to_email: email,
              otp_code: generatedOTP
            }
          })
        });

        if (response.ok) {
          console.log("Verification email sent successfully via EmailJS!");
          return { success: true, otp: generatedOTP };
        } else {
          const errMsg = await response.text();
          console.warn("EmailJS gateway responded with error:", errMsg);
          return { success: false, error: `EmailJS Gateway Error: ${errMsg}`, otp: generatedOTP };
        }
      } catch (err: any) {
        console.error("EmailJS API request failed:", err);
        return { success: false, error: `Network Connection Error: ${err.message || err}`, otp: generatedOTP };
      }
    } else {
      console.log("EmailJS keys not configured. Local simulated Email OTP code is:", generatedOTP);
      return { success: true, otp: generatedOTP };
    }
  };

  const verifyEmailOTP = async (email: string, name: string, otp: string) => {
    const storedOtp = sessionStorage.getItem(`email_otp_${email}`);
    if (!storedOtp || storedOtp !== otp) {
      return { success: false, error: "Invalid verification code. Please try again." };
    }

    const usersRaw = localStorage.getItem(USERS_DB_KEY);
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    let matched = users.find((u: any) => u.email === email);
    if (!matched) {
      // Register new user with entered name and email
      matched = {
        id: email,
        name: name.trim() || `Student (${email.split("@")[0]})`,
        email: email,
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
      email: matched.email,
      role: matched.role
    };

    setCurrentUser(userPayload);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userPayload));
    sessionStorage.removeItem(`email_otp_${email}`);

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, sendEmailOTP, verifyEmailOTP, logout }}>
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
