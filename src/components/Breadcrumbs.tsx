import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbsProps {
  customItems?: {
    label: string;
    path: string;
  }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customItems }) => {
  const location = useLocation();

  // Function to generate proper breadcrumbs from path
  const getBreadcrumbs = () => {
    // Use custom items if provided
    if (customItems) {
      return customItems;
    }

    // Otherwise generate from the current path
    const paths = location.pathname.split('/').filter(p => p);
    let currentPath = '';

    // Create home as first breadcrumb
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    // Add path segments as breadcrumbs
    paths.forEach((path, i) => {
      currentPath += `/${path}`;

      // Format label to be more readable
      let label = path.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');

      // Handle special cases
      if (path === 'pregnancy' && i === 0) {
        label = 'Pregnancy';
      } else if (path === 'health-a-z') {
        label = 'Health A-Z';
      } else if (path === 'phb-services') {
        label = 'PHB Services';
      } else if (path === 'after-birth') {
        label = 'After Birth';
      } else if (path === 'labor-and-birth') {
        label = 'Labor and Birth';
      }

      breadcrumbs.push({
        label,
        path: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="py-3 px-4 bg-gray-100" aria-label="Breadcrumb">
      <ol className="phb-container list-none flex flex-wrap text-sm">
        {breadcrumbs.map((breadcrumb, i) => {
          const isLast = i === breadcrumbs.length - 1;

          return (
            <li key={i} className="flex items-center">
              {i > 0 && (
                <svg
                  className="mx-2 h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}

              {isLast ? (
                <span className="font-medium text-gray-700" aria-current="page">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="text-[#005eb8] hover:underline"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
