import React, {type ReactNode} from 'react';
import {useThemeConfig, ErrorCauseBoundary} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import VoyagerLogo from '@site/src/components/HomepageFeatures/VoyagerLogo';  

import styles from './styles.module.css';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({items}: {items: NavbarItemConfig[]}): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();

  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        // <NavbarLogo />
        //           <NavbarItems items={leftItems} />

        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}

           
           <a
            href="https://www.sanskritvoyager.com/"
            target="_blank" // Optional: Open in new tab
            rel="noopener noreferrer" // Recommended for security when using target="_blank"
            className={styles.logoLink} // Optional: Add a class for specific link styling if needed
            aria-label="Sanskrit Voyager App Home" // Accessibility: Describe the link's purpose // reference1
          >
            <VoyagerLogo className={styles.voyagerLogo} size={35} />
          </a>

           <NavbarColorModeToggle className={styles.colorModeToggle} />
          
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        //           <NavbarItems items={rightItems} />

        <>

        <NavbarItems items={leftItems} />
        
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
