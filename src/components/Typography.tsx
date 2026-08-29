import React from 'react';
import styles from './Typography.module.css';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ level, children, className, ...props }) => {
  const Tag = `h${level}` as const;
  return (
    <Tag className={`${styles.heading} ${styles[`h${level}`]} ${className || ''}`} {...props}>
      {children}
    </Tag>
  );
};

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'primary' | 'secondary' | 'muted' | 'accent';
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'primary',
  children,
  className,
  ...props
}) => {
  return (
    <p className={`${styles.text} ${styles[variant]} ${className || ''}`} {...props}>
      {children}
    </p>
  );
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children, className, ...props }) => {
  return (
    <span className={`${styles.badge} ${className || ''}`} {...props}>
      {children}
    </span>
  );
};
