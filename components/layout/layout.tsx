import { FC } from 'react';
import '@snowstorm/core/base.css';
import './global.scss';

import styles from './layout.module.scss';

export const Layout: FC = ({ children }) => (
	<div className={styles.wrapper}>{children}</div>
);
