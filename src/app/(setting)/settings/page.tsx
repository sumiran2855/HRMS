"use client"

import { useState } from "react"
import {
  User, Mail, Phone, MapPin, Bell, Shield, Palette, Globe,
  Edit2, Save, X, Plus, Trash2, CheckCircle, Eye, EyeOff,
  Monitor, Moon, Sun, LogOut, ChevronRight
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [editProfile, setEditProfile] = useState(false)
  const [editNotifications, setEditNotifications] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [theme, setTheme] = useState("system")

  const [profile, setProfile] = useState({
    firstName: "Sumiran",
    lastName: "Biswas",
    email: "sumiran.b@cisinlabs.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles",
    language: "English",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    projectUpdates: true,
    deadlineReminders: true,
    teamMessages: true,
    weeklyReport: true,
  })

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "preferences", label: "Preferences", icon: Globe },
  ]

  const handleSaveProfile = () => {
    setEditProfile(false)
    // Save logic here
  }

  const handleSaveNotifications = () => {
    setEditNotifications(false)
    // Save logic here
  }

  const handleChangePassword = () => {
    if (password.new === password.confirm) {
      setPassword({ current: "", new: "", confirm: "" })
      // Change password logic here
    }
  }

  return (
    <div className="settings-page">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>

        {/* Page Title */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>Settings</div>
          <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 3 }}>Manage your account settings and preferences</div>
        </div>

        {/* Settings Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24, alignItems: "start" }}>

          {/* Sidebar Tabs */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    border: "none",
                    background: isActive ? "#f1f5f9" : "transparent",
                    cursor: "pointer",
                    fontSize: 13.5,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#0f172a" : "#64748b",
                    transition: "all 0.15s",
                    fontFamily: "inherit",
                  }}
                >
                  <Icon style={{ width: 18, height: 18 }} />
                  {tab.label}
                  {isActive && <ChevronRight style={{ width: 16, height: 16, marginLeft: "auto" }} />}
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
            
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: 800 }}>
                      {profile.firstName[0]}{profile.lastName[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{profile.firstName} {profile.lastName}</div>
                      <div style={{ fontSize: 12.5, color: "#64748b", marginTop: 2 }}>{profile.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditProfile(!editProfile)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: editProfile ? "1.5px solid #e2e8f0" : "1.5px solid #3b82f6",
                      background: editProfile ? "transparent" : "#3b82f6",
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: editProfile ? "#64748b" : "#fff",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.15s",
                    }}
                  >
                    {editProfile ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { label: "First Name", key: "firstName", icon: User },
                    { label: "Last Name", key: "lastName", icon: User },
                    { label: "Email", key: "email", icon: Mail },
                    { label: "Phone", key: "phone", icon: Phone },
                    { label: "Location", key: "location", icon: MapPin },
                  ].map((field) => {
                    const Icon = field.icon
                    return (
                      <div key={field.key}>
                        <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8", display: "block", marginBottom: 6 }}>
                          {field.label}
                        </label>
                        {editProfile ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Icon style={{ width: 16, height: 16, color: "#94a3b8" }} />
                            <input
                              value={profile[field.key as keyof typeof profile]}
                              onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                              style={{
                                flex: 1,
                                height: 40,
                                borderRadius: 8,
                                border: "1.5px solid #e2e8f0",
                                padding: "0 12px",
                                fontSize: 13.5,
                                color: "#0f172a",
                                outline: "none",
                                fontFamily: "inherit",
                                background: "#fff",
                                transition: "border-color 0.15s",
                              }}
                              onFocus={(e) => (e.target.style.borderColor = "#334155")}
                              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                            />
                          </div>
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Icon style={{ width: 16, height: 16, color: "#94a3b8" }} />
                            <div style={{ fontSize: 13.5, color: "#0f172a", fontWeight: 500 }}>{profile[field.key as keyof typeof profile]}</div>
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {editProfile && (
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
                      <button
                        onClick={() => setEditProfile(false)}
                        style={{
                          padding: "8px 20px",
                          borderRadius: 8,
                          border: "1.5px solid #e2e8f0",
                          background: "transparent",
                          fontSize: 12.5,
                          fontWeight: 600,
                          color: "#64748b",
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        style={{
                          padding: "8px 20px",
                          borderRadius: 8,
                          border: "1.5px solid #3b82f6",
                          background: "#3b82f6",
                          fontSize: 12.5,
                          fontWeight: 600,
                          color: "#fff",
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div style={{ padding: "24px" }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Notification Preferences</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Choose how you want to receive notifications</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {[
                    { label: "Email Notifications", key: "email", description: "Receive notifications via email" },
                    { label: "Push Notifications", key: "push", description: "Receive push notifications in browser" },
                    { label: "SMS Notifications", key: "sms", description: "Receive notifications via SMS" },
                  ].map((item) => (
                    <div
                      key={item.key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 0",
                        borderBottom: "1px solid #f1f5f9",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{item.description}</div>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                        style={{
                          width: 48,
                          height: 26,
                          borderRadius: 13,
                          border: "none",
                          background: notifications[item.key as keyof typeof notifications] ? "#3b82f6" : "#e2e8f0",
                          cursor: "pointer",
                          position: "relative",
                          transition: "background 0.2s",
                        }}
                      >
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: "#fff",
                            position: "absolute",
                            top: 2,
                            left: notifications[item.key as keyof typeof notifications] ? 24 : 2,
                            transition: "left 0.2s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 32, marginBottom: 24 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>Notification Types</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {[
                      { label: "Project Updates", key: "projectUpdates" },
                      { label: "Deadline Reminders", key: "deadlineReminders" },
                      { label: "Team Messages", key: "teamMessages" },
                      { label: "Weekly Reports", key: "weeklyReport" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "14px 0",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <div style={{ fontSize: 13.5, fontWeight: 500, color: "#0f172a" }}>{item.label}</div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                          style={{
                            width: 44,
                            height: 24,
                            borderRadius: 12,
                            border: "none",
                            background: notifications[item.key as keyof typeof notifications] ? "#3b82f6" : "#e2e8f0",
                            cursor: "pointer",
                            position: "relative",
                            transition: "background 0.2s",
                          }}
                        >
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              background: "#fff",
                              position: "absolute",
                              top: 2,
                              left: notifications[item.key as keyof typeof notifications] ? 22 : 2,
                              transition: "left 0.2s",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div style={{ padding: "24px" }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Security</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Manage your password and security settings</div>
                </div>

                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 16 }}>Change Password</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { label: "Current Password", key: "current" },
                      { label: "New Password", key: "new" },
                      { label: "Confirm Password", key: "confirm" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8", display: "block", marginBottom: 6 }}>
                          {field.label}
                        </label>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password[field.key as keyof typeof password]}
                            onChange={(e) => setPassword({ ...password, [field.key]: e.target.value })}
                            style={{
                              flex: 1,
                              height: 40,
                              borderRadius: 8,
                              border: "1.5px solid #e2e8f0",
                              padding: "0 12px",
                              fontSize: 13.5,
                              color: "#0f172a",
                              outline: "none",
                              fontFamily: "inherit",
                              background: "#fff",
                              transition: "border-color 0.15s",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#334155")}
                            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 8,
                              border: "1.5px solid #e2e8f0",
                              background: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              transition: "border-color 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#334155")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                          >
                            {showPassword ? <EyeOff style={{ width: 16, height: 16, color: "#64748b" }} /> : <Eye style={{ width: 16, height: 16, color: "#64748b" }} />}
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleChangePassword}
                      style={{
                        padding: "10px 24px",
                        borderRadius: 8,
                        border: "1.5px solid #3b82f6",
                        background: "#3b82f6",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#fff",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        marginTop: 8,
                        alignSelf: "flex-start",
                      }}
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div style={{ padding: "16px", borderRadius: 10, background: "#fef2f2", border: "1px solid #fee2e2" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <LogOut style={{ width: 18, height: 18, color: "#dc2626" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#991b1b" }}>Sign Out</div>
                      <div style={{ fontSize: 12, color: "#b91c1c", marginTop: 1 }}>Sign out of your account on all devices</div>
                    </div>
                    <button
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: "1.5px solid #dc2626",
                        background: "#dc2626",
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: "#fff",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div style={{ padding: "24px" }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Appearance</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Customize the look and feel of your workspace</div>
                </div>

                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 16 }}>Theme</div>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[
                      { id: "light", label: "Light", icon: Sun },
                      { id: "dark", label: "Dark", icon: Moon },
                      { id: "system", label: "System", icon: Monitor },
                    ].map((option) => {
                      const Icon = option.icon
                      const isActive = theme === option.id
                      return (
                        <button
                          key={option.id}
                          onClick={() => setTheme(option.id)}
                          style={{
                            flex: 1,
                            padding: "16px",
                            borderRadius: 10,
                            border: isActive ? "2px solid #3b82f6" : "1.5px solid #e2e8f0",
                            background: isActive ? "#eff6ff" : "#fff",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "all 0.15s",
                          }}
                        >
                          <Icon style={{ width: 20, height: 20, color: isActive ? "#3b82f6" : "#64748b", marginBottom: 8 }} />
                          <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? "#3b82f6" : "#0f172a" }}>{option.label}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 16 }}>Font Size</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      { id: "small", label: "Small", size: "12px" },
                      { id: "medium", label: "Medium", size: "14px" },
                      { id: "large", label: "Large", size: "16px" },
                    ].map((option) => (
                      <button
                        key={option.id}
                        style={{
                          padding: "10px 20px",
                          borderRadius: 8,
                          border: "1.5px solid #e2e8f0",
                          background: "#fff",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          fontSize: option.size,
                          fontWeight: 500,
                          color: "#0f172a",
                          transition: "all 0.15s",
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Settings */}
            {activeTab === "preferences" && (
              <div style={{ padding: "24px" }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Preferences</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Set your language and regional preferences</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8", display: "block", marginBottom: 6 }}>
                      Language
                    </label>
                    <select
                      value={profile.language}
                      onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                      style={{
                        width: "100%",
                        height: 40,
                        borderRadius: 8,
                        border: "1.5px solid #e2e8f0",
                        padding: "0 12px",
                        fontSize: 13.5,
                        color: "#0f172a",
                        outline: "none",
                        fontFamily: "inherit",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Japanese">Japanese</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8", display: "block", marginBottom: 6 }}>
                      Timezone
                    </label>
                    <select
                      value={profile.timezone}
                      onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                      style={{
                        width: "100%",
                        height: 40,
                        borderRadius: 8,
                        border: "1.5px solid #e2e8f0",
                        padding: "0 12px",
                        fontSize: 13.5,
                        color: "#0f172a",
                        outline: "none",
                        fontFamily: "inherit",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Asia/Kolkata">India (IST)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8", display: "block", marginBottom: 6 }}>
                      Date Format
                    </label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {[
                        { id: "mdy", label: "MM/DD/YYYY" },
                        { id: "dmy", label: "DD/MM/YYYY" },
                        { id: "ymd", label: "YYYY-MM-DD" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          style={{
                            padding: "10px 16px",
                            borderRadius: 8,
                            border: "1.5px solid #e2e8f0",
                            background: "#fff",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            fontSize: 12.5,
                            fontWeight: 500,
                            color: "#0f172a",
                            transition: "all 0.15s",
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .settings-page > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
