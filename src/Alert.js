import React from 'react'
 
const BaseIcon = ({ color, pushRight = true, children }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        style={{ marginRight: pushRight ? '20px' : '0', minWidth: 24 }}
    >
        {children}
    </svg>
)
 
const ErrorIcon = () => (
    <BaseIcon color='white'>
        <circle cx='12' cy='12' r='10' />
        <line x1='12' y1='8' x2='12' y2='12' />
        <line x1='12' y1='16' x2='12' y2='16' />
    </BaseIcon>
)
 
const SuccessIcon = () => (
    <BaseIcon color='white'>
        <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
        <polyline points='22 4 12 14.01 9 11.01' />
    </BaseIcon>
)
 
const CloseIcon = () => (
    <BaseIcon color='#FFFFFF' pushRight={false}>
        <line x1='18' y1='6' x2='6' y2='18' />
        <line x1='6' y1='6' x2='18' y2='18' />
    </BaseIcon>
)
 
const InfoIcon = () => (
    <BaseIcon color='#2E9AFE'>
        <circle cx='12' cy='12' r='10' />
        <line x1='12' y1='16' x2='12' y2='12' />
        <line x1='12' y1='8' x2='12' y2='8' />
    </BaseIcon>
)
 
const alertStyleError = {
    backgroundColor: '#FD5D5D',
    color: 'white',
    padding: '10px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '400px',
    boxSizing: 'border-box'
}
 
const alertStyleSuccess = {
    backgroundColor: '#6BCB77',
    color: 'white',
    padding: '10px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '400px',
    boxSizing: 'border-box'
}
 
const buttonStyle = {
    marginLeft: '20px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#FFFFFF'
}
const AlertTemplate = ({ message, options, style, close }) => {
    if (
        options.type === 'error'
    )
        return (
            <div style={{ ...alertStyleError, ...style }}>
                {options.type === 'info' && <InfoIcon />}
                {options.type === 'success' && <SuccessIcon />}
                {options.type === 'error' && <ErrorIcon />}
                <span style={{ flex: 2 }}>{message}</span>
                <button onClick={close} style={buttonStyle}>
                    <CloseIcon />
                </button>
            </div>
        )
    else return (
        <div style={{ ...alertStyleSuccess, ...style }}>
            {options.type === 'info' && <InfoIcon />}
            {options.type === 'success' && <SuccessIcon />}
            {options.type === 'error' && <ErrorIcon />}
            <span style={{ flex: 2 }}>{message}</span>
            <button onClick={close} style={buttonStyle}>
                <CloseIcon />
            </button>
        </div>
    )
}
 
export default AlertTemplate