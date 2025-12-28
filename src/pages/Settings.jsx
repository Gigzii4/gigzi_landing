import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ArrowLeft, Moon, Sun, Bell, Shield, HelpCircle, Info, FileText, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  const settingsSections = [
    {
      title: 'App Settings',
      items: [
        {
          icon: darkMode ? Moon : Sun,
          label: 'Dark Mode',
          description: 'Enable dark theme',
          action: () => setDarkMode(!darkMode),
          type: 'toggle',
          value: darkMode,
        },
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Push notifications',
          action: () => setNotifications(!notifications),
          type: 'toggle',
          value: notifications,
        },
        {
          icon: Shield,
          label: 'Location Services',
          description: 'Allow location access',
          action: () => setLocationServices(!locationServices),
          type: 'toggle',
          value: locationServices,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          description: 'Get help with your account',
          path: '/support',
        },
        {
          icon: Info,
          label: 'About Us',
          description: 'Learn more about Gigzi',
          path: '/about',
        },
        {
          icon: FileText,
          label: 'Terms & Conditions',
          description: 'Read our terms',
          path: '/terms',
        },
        {
          icon: Lock,
          label: 'Privacy Policy',
          description: 'How we protect your data',
          path: '/privacy',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#021d5c] via-[#06328c] to-[#4D55CC] text-white pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link to="/account" className="inline-flex items-center text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-white/80">Customize your app experience</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex items-center justify-between p-4 ${
                    itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mr-3">
                      <item.icon className="w-5 h-5 text-[#4D55CC]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  {item.type === 'toggle' ? (
                    <button
                      onClick={item.action}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        item.value ? 'bg-[#4D55CC]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          item.value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
          <div className="p-4 border-b border-gray-100">
            <p className="text-gray-500 text-xs mb-1">App Version</p>
            <p className="font-semibold text-gray-900">1.0.0</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl p-4 font-semibold flex items-center justify-center transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

