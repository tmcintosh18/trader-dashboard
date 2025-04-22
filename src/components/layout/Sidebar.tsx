import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarIcon,
  ChartPieIcon,
  ArrowTrendingDownIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'COT Positioning', href: '/cot', icon: ChartBarIcon },
  { name: 'Options OI', href: '/options', icon: ChartPieIcon },
  { name: 'Short Sale & Dark Pool', href: '/short-sale', icon: ArrowTrendingDownIcon },
  { name: 'Sentiment & News', href: '/sentiment', icon: ChatBubbleLeftRightIcon },
  { name: 'Insider Trades', href: '/insider', icon: UserGroupIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Trader Dashboard</h1>
        <ThemeToggle />
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${isActive
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5
                    ${isActive
                      ? 'text-indigo-500 dark:text-indigo-400'
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}
                  `}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Trader Intelligence Dashboard v1.0
        </div>
      </div>
    </div>
  );
}
