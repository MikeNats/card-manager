import React from 'react';
import {PageHeaderProps} from './types'
const PageHeader = ({title , description, className}: PageHeaderProps) =>
  <header className="page-header">
    <h1 className={className}>{title}</h1>
    <p>{description}</p>
  </header>
  
 
export default PageHeader 