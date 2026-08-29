import React from 'react';
import styles from './Container.module.css';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  className,
  ...props
}) => {
  return (
    <div className={`${styles.container} ${styles[maxWidth]} ${className || ''}`} {...props}>
      {children}
    </div>
  );
};
