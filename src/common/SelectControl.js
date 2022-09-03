import PT from 'prop-types'
import styles from './SelectControl.module.css';

/**
 * A styled control for selecting a single option from a list of options.
 */
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
  // An id for associating the select control label with the control.
  id: PT.string.isRequired,

  // The label's text.
  label: PT.string.isRequired,

  // The controls options.
  options: PT.arrayOf(PT.string).isRequired,

  // The currently-selected option. Expected to be a member of `options`.
  selectedOption: PT.string.isRequired,

  // A callback to execute when an option is selected.
  onSelect: PT.func.isRequired,
};

export default SelectControl;
