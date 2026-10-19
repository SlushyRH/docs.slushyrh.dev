import React, { useState, type ReactElement, type ReactNode } from 'react';
import { Card } from './card';

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
    <div className={`w-full bg-input border-2 border-border rounded-lg ${className}`}>
      <div className="flex space-x-1 bg-bg rounded-t-lg">
        {tabElements.map((child, index) => (
          <button
            key={index}
            onClick={() => setActiveTabIndex(index)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTabIndex === index
                ? 'bg-input text-white'
                : 'text-zinc-400 bg-transparent hover:text-zinc-200 hover:bg-zinc-800/30'
            }`}
          >
            {child.props.title}
          </button>
        ))}
      </div>

      <Card noMargin className="rounded-tl-none border-t-0 shadow-none px-2 py-2">
        {tabElements[activeTabIndex]}
      </Card>
    </div>
  );
}