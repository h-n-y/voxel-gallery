import PT from 'prop-types'
import styles from './SelectControl.module.css';

function SelectControl(props) {
  return (
    <div className={styles["select-control"]}>
      <label htmlFor={props.id}>
        {props.label}: 
      </label> 
      <select 
        id={props.id} 
        value={props.selectedOption} 
        onChange={(e) => props.onSelect(e.target.value)}>
          {props.options.map(value => 
            <option key={value} value={value}> {value} </option>
          )}
      </select>
    </div>
  );
}

SelectControl.propTypes = {
  id: PT.string.isRequired,
  label: PT.string.isRequired,
  options: PT.arrayOf(PT.string).isRequired,
  selectedOption: PT.string.isRequired,

  onSelect: PT.func.isRequired,
};

export default SelectControl;
