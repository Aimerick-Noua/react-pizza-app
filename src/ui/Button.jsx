import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function Button({to, children, disabled,type,onClick }) {

  const base=  "text-sm disabled:cursor-not-allowed focus:outline-none bg-yellow-400 uppercase font-semibold text-stone-800  inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 "

  const styles={
    primary:base+" px-4 py-3 sm:px-6 sm:py-4",
    small:base+" px-2 py-2 md:px-5 md:py-2.5 text-xs",
    secondary: "text-sm px-4 py-2.5 sm:px-6 sm:py-3.5 disabled:cursor-not-allowed focus:outline-none border-2 border-stone-300 uppercase font-semibold text-stone-800  inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 ",
    round:base+" px-2.5 py-1 md:px-3.5 md:py-2 text-sm ",

  }
  if(to) return <Link className={styles[type]} to={to}>{children}</Link>
  if(onClick) {
    return (
      <button
        disabled={disabled}
        className={styles[type]}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
  return (
    <button
      disabled={disabled}
      className={styles[type]}
    >
      {children}
    </button>
  )
}

export default Button
