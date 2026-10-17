import React, { useState, type ReactElement, type ReactNode } from 'react';

interface TabItemProps {
  title: string;
  children: ReactNode;
}

export function TabItem({ children }: TabItemProps) {
  return <>{children}</>;
}

interface TabsProps {
  children: ReactNode;
  className?: string;
}

export function Tabs({ children, className = '' }: TabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabElements = React.Children.toArray(children).filter(
    React.isValidElement
  ) as ReactElement<TabItemProps>[];

  return (
    <div className={`w-full ${className}`}>
      <div className="flex border-b border-border">
        {tabElements.map((child, index) => (
          <button
            key={index}
            onClick={() => setActiveTabIndex(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTabIndex === index
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {child.props.title}
          </button>
        ))}
      </div>

      <div className="pt-4">
        {tabElements[activeTabIndex]}
      </div>
    </div>
  );
}