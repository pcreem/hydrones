import React from 'react'
import {
  FormControl,
  Select,
  InputLabel,
  makeStyles,
  Button
} from "@material-ui/core";
import './List.css';

function List({ level, levels, onLevelChange }) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
      backgroundColor: 'white',
      marginBlock: '10px',
      borderRadius: '5px',
      textAlign: 'center',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <div className="list">
      <FormControl className={classes.formControl}>
        <InputLabel >Slick Level</InputLabel>
        <Select
          native
          onChange={onLevelChange}
          value={level}
        >
          <option aria-label="None" value="" />
          {levels.map((level) => (
            <option value={level}>{level}</option>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default List
