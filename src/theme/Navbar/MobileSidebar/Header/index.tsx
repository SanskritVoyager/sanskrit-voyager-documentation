import React, {type ReactNode} from 'react';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import IconClose from '@theme/Icon/Close';
import NavbarLogo from '@theme/Navbar/Logo';
import VoyagerLogo from '@site/src/components/HomepageFeatures/VoyagerLogo';
import styles from './styles.module.css';

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}>
      <IconClose color="var(--ifm-color-emphasis-600)" />
    </button>
  );
}

//        <NavbarColorModeToggle className="margin-right--md" />


export default function NavbarMobileSidebarHeader(): ReactNode {
  return (
    <div className="navbar-sidebar__brand">
          <a
            href="https://www.sanskritvoyager.com/"
            target="_blank" // Optional: Open in new tab
            rel="noopener noreferrer" // Recommended for security when using target="_blank"
            className={styles.logoLink} // Optional: Add a class for specific link styling if needed
            aria-label="Sanskrit Voyager App Home" // Accessibility: Describe the link's purpose
          >
            <VoyagerLogo className={styles.voyagerLogo} size={35} />
          </a>
      <CloseButton />
    </div>
  );
}
