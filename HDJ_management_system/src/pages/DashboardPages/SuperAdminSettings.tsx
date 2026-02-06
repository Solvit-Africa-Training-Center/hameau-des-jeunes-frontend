import { useState } from 'react';
import {
  Building2,
  User,
  Palette,
  Bell,
  Lock,
  Globe,
  ChevronRight,
  Download,
  Pencil,
  Monitor,
  KeyRound
} from 'lucide-react';

type SettingsSection = 
  | 'organization' 
  | 'personal' 
  | 'appearance' 
  | 'notifications' 
  | 'security' 
  | 'localization';

interface OrganizationProfile {
  organizationName: string;
  primaryContactEmail: string;
  address: string;
  phoneNumber: string;
}

interface PersonalProfile {
  fullName: string;
  email: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  desktopAlerts: boolean;
}

interface SystemPreferences {
  twoFactorAuth: boolean;
  automaticDataExport: boolean;
}

function SuperAdminSettings() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('organization');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Organization Profile State
  const [orgProfile, setOrgProfile] = useState<OrganizationProfile>({
    organizationName: 'Hameau des Jeunes Saint Kizito',
    primaryContactEmail: 'contact@saintkizito.org',
    address: 'Mushaka, Rwanda',
    phoneNumber: '+250 788 000 000'
  });

  // Personal Profile State
  const [personalProfile, setPersonalProfile] = useState<PersonalProfile>({
    fullName: 'Hameau des Jeunes Saint Kizito',
    email: 'contact@saintkizito.org'
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    desktopAlerts: true
  });

  // System Preferences State
  const [systemPrefs, setSystemPrefs] = useState<SystemPreferences>({
    twoFactorAuth: true,
    automaticDataExport: true
  });

  // Localization State
  const [language, setLanguage] = useState('English(US)');
  const [timezone, setTimezone] = useState('Central Africa Time(GMT+2)');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const handleOrgProfileChange = (field: keyof OrganizationProfile, value: string) => {
    setOrgProfile({ ...orgProfile, [field]: value });
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handlePersonalProfileChange = (field: keyof PersonalProfile, value: string) => {
    setPersonalProfile({ ...personalProfile, [field]: value });
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSaveChanges = () => {
    const newErrors: Record<string, string> = {};

    if (activeSection === 'organization') {
      if (!orgProfile.organizationName.trim()) {
        newErrors.organizationName = 'Organization name is required';
      }
      if (!validateEmail(orgProfile.primaryContactEmail)) {
        newErrors.primaryContactEmail = 'Please enter a valid email address';
      }
      if (!orgProfile.address.trim()) {
        newErrors.address = 'Address is required';
      }
      if (!validatePhone(orgProfile.phoneNumber)) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    }

    if (activeSection === 'personal') {
      if (!personalProfile.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (!validateEmail(personalProfile.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    alert('Changes saved successfully!');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'organization':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Organization Profile</h2>
            <p className="text-sm text-gray-600 mb-6">Manage your organization profile settings</p>

            <div className="flex gap-8 mt-6">
              {/* Organization Logo */}
              <div className="relative shrink-0">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                  <Building2 className="w-16 h-16 text-gray-400" />
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-emerald-900 border-2 border-white flex items-center justify-center hover:bg-emerald-800 transition-colors">
                  <Pencil className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Organization Form */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={orgProfile.organizationName}
                      onChange={(e) => handleOrgProfileChange('organizationName', e.target.value)}
                      className={`w-full px-3.5 py-2.5 border ${
                        errors.organizationName ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:border-transparent`}
                    />
                    {errors.organizationName && (
                      <p className="text-xs text-red-500 mt-1">{errors.organizationName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Contact Email
                    </label>
                    <input
                      type="email"
                      value={orgProfile.primaryContactEmail}
                      onChange={(e) => handleOrgProfileChange('primaryContactEmail', e.target.value)}
                      className={`w-full px-3.5 py-2.5 border ${
                        errors.primaryContactEmail ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:border-transparent`}
                    />
                    {errors.primaryContactEmail && (
                      <p className="text-xs text-red-500 mt-1">{errors.primaryContactEmail}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={orgProfile.address}
                      onChange={(e) => handleOrgProfileChange('address', e.target.value)}
                      className={`w-full px-3.5 py-2.5 border ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:border-transparent`}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={orgProfile.phoneNumber}
                      onChange={(e) => handleOrgProfileChange('phoneNumber', e.target.value)}
                      className={`w-full px-3.5 py-2.5 border ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:border-transparent`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'personal':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Personal Profile</h2>
            <p className="text-sm text-gray-600 mb-6">Manage your personal profile settings</p>

            <div className="flex gap-8 mt-6">
              {/* Personal Avatar */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 border-2 border-gray-300 rounded-full flex items-center justify-center bg-gray-50">
                  <User className="w-14 h-14 text-gray-400" />
                </div>
                <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-emerald-900 border-2 border-white flex items-center justify-center hover:bg-emerald-800 transition-colors">
                  <Pencil className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Personal Form */}
              <div className="flex-1 ml-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={personalProfile.fullName}
                      onChange={(e) => handlePersonalProfileChange('fullName', e.target.value)}
                      className={`w-full px-3.5 py-2.5 border ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:border-transparent`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={personalProfile.email}
                      onChange={(e) => handlePersonalProfileChange('email', e.target.value)}
                      className={`w-full px-3.5 py-2.5 border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:border-transparent`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Appearance & Branding</h2>
            <p className="text-sm text-gray-600 mb-6">Manage your appearance & branding settings</p>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Interface Theme
              </label>
              <div className="grid grid-cols-2 gap-5">
                {/* Light Theme */}
                <div
                  onClick={() => setTheme('light')}
                  className={`cursor-pointer border-2 ${
                    theme === 'light' ? 'border-emerald-900 bg-green-50' : 'border-gray-200'
                  } rounded-xl p-5 transition-all hover:border-emerald-900`}
                >
                  <div className="w-full h-32 bg-white border border-gray-200 rounded-lg overflow-hidden mb-3">
                    <div className="h-10 bg-gray-100"></div>
                    <div className="h-22 bg-white"></div>
                  </div>
                  <span className="block text-sm font-medium text-gray-900 text-center">
                    Light Mode
                  </span>
                </div>

                {/* Dark Theme */}
                <div
                  onClick={() => setTheme('dark')}
                  className={`cursor-pointer border-2 ${
                    theme === 'dark' ? 'border-emerald-900 bg-green-50' : 'border-gray-200'
                  } rounded-xl p-5 transition-all hover:border-emerald-900`}
                >
                  <div className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden mb-3">
                    <div className="h-10 bg-gray-900"></div>
                    <div className="h-22 bg-gray-800"></div>
                  </div>
                  <span className="block text-sm font-medium text-gray-900 text-center">
                    Dark Mode
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Appearance & Branding</h2>
            <p className="text-sm text-gray-600 mb-6">Manage your appearance & branding settings</p>

            <div className="space-y-5 mt-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications({ ...notifications, emailNotifications: !notifications.emailNotifications })
                  }
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                    notifications.emailNotifications ? 'bg-emerald-900' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Desktop Alerts */}
              <div className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">Desktop Alerts</h3>
                  <p className="text-sm text-gray-600">Show browser notifications</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications({ ...notifications, desktopAlerts: !notifications.desktopAlerts })
                  }
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                    notifications.desktopAlerts ? 'bg-emerald-900' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      notifications.desktopAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Security & Access</h2>
            <p className="text-sm text-gray-600 mb-6">Manage your security & access settings</p>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Current Session
              </label>
              <div className="flex items-center justify-between p-5 border border-gray-200 rounded-xl mb-5">
                <div className="flex items-center gap-4">
                  <Monitor className="w-6 h-6 text-gray-700" />
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      Macbook Pro - Kigali, RW
                    </h3>
                    <p className="text-sm text-gray-600">Last active 2 minutes ago</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                  Logout
                </button>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <KeyRound className="w-5 h-5 text-blue-600" />
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                  Change Account Password
                </a>
              </div>
            </div>
          </div>
        );

      case 'localization':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Localization</h2>
            <p className="text-sm text-gray-600 mb-6">Manage your localization settings</p>

            <div className="mt-6">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    System Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:border-transparent"
                  >
                    <option>English(US)</option>
                    <option>English(UK)</option>
                    <option>French</option>
                    <option>Kinyarwanda</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:border-transparent"
                  >
                    <option>Central Africa Time(GMT+2)</option>
                    <option>East Africa Time(GMT+3)</option>
                    <option>West Africa Time(GMT+1)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    // Main container - takes full width and height with gray background
    <div className="w-full h-screen bg-gray-50 overflow-y-auto">
      {/* 
        ==========================================
        TODO: Add your TopBar/Navbar component here
        ==========================================
        Example: <TopBar />
        
        Your TopBar component should go here if you have one.
        This is where you would place your navigation header.
      */}

      <div className="flex w-full h-full">
        {/* 
          ==========================================
          TODO: Add your Sidebar component here
          ==========================================
          Example: <Sidebar />
          
          Your Sidebar component should go here if you have one.
          This is where you would place your side navigation menu.
        */}

        {/* Settings Content Area - This is the main settings content */}
        <div className="flex-1 p-8">
          {/* Page Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">System Settings</h1>
              <p className="text-sm text-gray-600">
                Configure organization profile, system preferences, and security.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-emerald-900 text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors">
              <Download className="w-5 h-5" />
              Export Financial Report
            </button>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-[400px_1fr] gap-6">
              {/* Settings Menu - Left Side */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveSection('organization')}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-lg border transition-all text-sm font-medium ${
                    activeSection === 'organization'
                      ? 'bg-emerald-900 border-emerald-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5" />
                    Organization Profile
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveSection('personal')}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-lg border transition-all text-sm font-medium ${
                    activeSection === 'personal'
                      ? 'bg-emerald-900 border-emerald-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" />
                    Personal Profile
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveSection('appearance')}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-lg border transition-all text-sm font-medium ${
                    activeSection === 'appearance'
                      ? 'bg-emerald-900 border-emerald-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5" />
                    Appearance & Branding
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveSection('notifications')}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-lg border transition-all text-sm font-medium ${
                    activeSection === 'notifications'
                      ? 'bg-emerald-900 border-emerald-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5" />
                    Notification Rules
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveSection('security')}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-lg border transition-all text-sm font-medium ${
                    activeSection === 'security'
                      ? 'bg-emerald-900 border-emerald-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5" />
                    Security & Access
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveSection('localization')}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-lg border transition-all text-sm font-medium ${
                    activeSection === 'localization'
                      ? 'bg-emerald-900 border-emerald-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5" />
                    Localization
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Settings Content Panel - Right Side */}
              <div className="flex flex-col gap-8">
                {renderContent()}

                <button
                  onClick={handleSaveChanges}
                  className="self-end px-8 py-3 bg-emerald-900 text-white rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors"
                >
                  Save Changes
                </button>

                {/* System Preferences */}
                <div className="bg-gray-50 rounded-xl p-6 mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-5">System Preferences</h3>

                  <div className="space-y-5">
                    {/* Two-Factor Authentication */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-200">
                      <div>
                        <h4 className="text-base font-medium text-gray-900 mb-1">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-gray-600">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setSystemPrefs({ ...systemPrefs, twoFactorAuth: !systemPrefs.twoFactorAuth })
                        }
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          systemPrefs.twoFactorAuth ? 'bg-emerald-900' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                            systemPrefs.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Automatic Data Export */}
                    <div className="flex items-center justify-between py-5">
                      <div>
                        <h4 className="text-base font-medium text-gray-900 mb-1">
                          Automatic Data Export
                        </h4>
                        <p className="text-sm text-gray-600">
                          Daily backup of beneficiary data to secure storage
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setSystemPrefs({
                            ...systemPrefs,
                            automaticDataExport: !systemPrefs.automaticDataExport,
                          })
                        }
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          systemPrefs.automaticDataExport ? 'bg-emerald-900' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                            systemPrefs.automaticDataExport ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminSettings;