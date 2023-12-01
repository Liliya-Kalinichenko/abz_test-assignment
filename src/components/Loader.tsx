import React from 'react';
import './Loader.scss';

type Props = {
  className?: string,
}

export const Loader: React.FC<Props> = ({className =''}) => (
  <div className={`Loader ${className}`}>
    <div className="Loader__content" />
  </div>
);
