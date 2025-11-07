import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'ghost'
}

const Button: React.FC<Props> = ({ variant = 'secondary', className, ...rest }) => {
	const cls = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ')
	return <button className={cls} {...rest} />
}

export default Button



