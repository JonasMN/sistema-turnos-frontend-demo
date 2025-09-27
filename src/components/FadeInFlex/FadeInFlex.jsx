import React, { Children } from 'react'
import styles from './FadeInFlex.module.scss'

export default function FadeInFlex({ children, className }) {
  return (
    <div className={`${styles['fade-in-flex']} ${className}`} >
      {
        Children.toArray(children).map((child, idx) => (
          <div
            className={styles['fade-in-item']}
            style={{
              animationDelay: `${idx * 100}ms`
            }}
            key={idx}
          >
            {child}
          </div>
        ))
      }

    </ div>
  )
}
