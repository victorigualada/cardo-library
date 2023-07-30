import React, {CSSProperties} from 'react';

export interface ContainerProps {
  id?: string;
  border?: boolean;
  children: React.ReactNode;
  style?: any;
}