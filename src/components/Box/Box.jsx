import styles from "./Box.module.scss";

const Box = ({ children, columns = 2, padding = 10, gap = 20 }) => {
  return <div className={styles.gridBox} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, padding: `${padding}px`, gap: `${gap}px` }}>{children}</div>;
};

export default Box;
