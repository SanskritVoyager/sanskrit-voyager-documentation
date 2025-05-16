import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {usePluralForm} from '@docusaurus/theme-common';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {translate} from '@docusaurus/Translate';

import type {Props} from '@theme/DocCard';
import Heading from '@theme/Heading';
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

import styles from './styles.module.css';

import { 
  IconSearch, 
  IconBook, 
  IconDatabaseSearch,
  IconLanguage,
  IconFolder 
} from '@tabler/icons-react';

function useCategoryItemsPlural() {
  const {selectMessage} = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        {count},
      ),
    );
}

function CardContainer({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}): ReactNode {
  return (
    <Link
      href={href}
      className={clsx('card padding--lg', styles.cardContainer)}>
      {children}
    </Link>
  );
}

function CardLayout({
  href,
  icon,
  title,
  description,
  iconType,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
  iconType?: string;
}): ReactNode {
  return (
    <CardContainer href={href}>
      {iconType && (
        <div className={clsx(styles.cardIcon, styles[`${iconType}Icon`])}>
          {icon}
        </div>
      )}
      <Heading
        as="h2"
        className={clsx('text--truncate', styles.cardTitle)}
        title={title}>
        {!iconType && icon} {title}
      </Heading>
      {description && (
        <p
          className={clsx('text--truncate', styles.cardDescription)}
          title={description}>
          {description}
        </p>
      )}
    </CardContainer>
  );
}

function CardCategory({item}: {item: PropSidebarItemCategory}): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();

  if (!href) {
    return null;
  }

  return (
    <CardLayout
      href={href}
      icon={<IconFolder size={24} stroke={1.5} />}
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
      iconType="folder"
    />
  );
}

function CardLink({item}: {item: PropSidebarItemLink}): ReactNode {
  const isInternal = isInternalUrl(item.href);
  const doc = useDocById(item.docId ?? undefined);
  
  // Default icon for external links
  let icon = <IconFolder size={24} stroke={1.5} />;
  let iconType = 'default';
  
  // Custom icon logic for function pages
  if (isInternal && item.docId) {
    const docPath = item.docId.toLowerCase();
    
    if (docPath.includes('dictionary-search')) {
      icon = <IconSearch size={24} stroke={1.5} />;
      iconType = 'search';
    } 
    else if (docPath.includes('text-analysis-tool')) {
      icon = <IconLanguage size={24} stroke={1.5} />;
      iconType = 'analyze';
    }
    else if (docPath.includes('book-reader')) {
      icon = <IconBook size={24} stroke={1.5} />;
      iconType = 'learn';
    }
    else if (docPath.includes('corpus-search')) {
      icon = <IconDatabaseSearch size={24} stroke={1.5} />;
      iconType = 'search';
    }
  }

  return (
    <CardLayout
      href={item.href}
      icon={icon}
      iconType={iconType}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({item}: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}