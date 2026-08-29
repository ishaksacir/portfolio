import { useTheme } from '../context/ThemeContext';
import styles from './Header.module.css';
import TextPressure from './TextPressure';
import { FiMoon, FiSun } from 'react-icons/fi';
export const Header = () => { const { theme, toggleTheme } = useTheme(); return <header className={styles.header}><a className={styles.logo} href="#top" aria-label="Home">IS<span>.</span></a><nav aria-label="Main navigation"><a href="#about"><TextPressure as="span" text="ABOUT" /></a><a href="#projects"><TextPressure as="span" text="PROJECTS" /></a><a href="#approach"><TextPressure as="span" text="APPROACH" /></a><a href="#experience"><TextPressure as="span" text="EXPERIENCE" /></a><a href="#contact"><TextPressure as="span" text="CONTACT" /></a></nav><button className={styles.toggle} onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}</button></header>; };
