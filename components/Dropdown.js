import styles from './Dropdown.module.css';
import arrowIcon from '@/assets/arrow.svg';

export default function Dropdown({
  id,
  className,
  name,
  value,
  defaultValue,
  options,
  required = false,
  disabled = false,
  onChange,
}) {
  return (
    <div className={`${styles.container} ${className}`}>
      <select
        className={styles.select}
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={styles.arrow}>
        <img
          className={styles.arrowIcon}
          src={arrowIcon.src}
          width={12}
          height={9}
          alt="▼"
        />
      </div>
    </div>
  );
}
