import React from 'react'
import classes from './MyModal.module.css'

const MyModal = ({children, title, visible, setVisible}) => {

    const rootClasses = [classes.myModal]
    if(visible) {
        rootClasses.push(classes.active)
    }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
        <div className={classes.myModalContent} onClick={e => e.stopPropagation()}>
            <h1>{title}</h1>
            {children}
        </div>
    </div>
  )
}

export default MyModal