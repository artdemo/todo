/*eslint-disable*/

import React, { useState, useEffect, useMemo } from 'react';
import {
  Grid,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Switch,
  Checkbox,
  List,
} from '@material-ui/core';
import SubmitButton from '../Buttons/SubmitButton';
import FrameBox from '../FrameBox';
import useSortPanelHook from '../../hooks/useSortPanelHook';

const SortPanel = () => {
  const {
    getTasks,
    resolvedSortState,
    isSortPending,
    categoryList,
  } = useSortPanelHook();

  console.log(categoryList);

  const [switchersState, setSwitchersState] = useState({
    date: false,
    name: false,
  });

  useEffect(() => {
    setSwitchersState((prevState) => ({ ...prevState, ...resolvedSortState }));
  }, [resolvedSortState]);

  const handleChange = (e) => {
    setSwitchersState({ ...switchersState, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getTasks(switchersState);
  };

  const categoryFieldset = categoryList.map(({ id, name }) => (
    <FormControlLabel
      key={`${id}-${name}`}
      control={
        <Checkbox checked={() => false} onChange={() => false} name={name} />
      }
      label={name}
    />
  ));

  // const list = categoryList.map(({ id, name }) => <div>{name}</div>);

  return (
    <FrameBox>
      <form onSubmit={handleSubmit}>
        <Grid container alignContent="center" spacing={2}>
          <Grid item xs={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Sort</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={switchersState.date}
                      onChange={handleChange}
                      name="date"
                    />
                  }
                  label="Date"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={switchersState.name}
                      onChange={handleChange}
                      name="name"
                    />
                  }
                  label="Name"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Choose category</FormLabel>
              <FormGroup>{categoryFieldset}</FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <SubmitButton
              isLoading={isSortPending}
              disabled={
                JSON.stringify(resolvedSortState) ===
                JSON.stringify(switchersState)
              }
            >
              Sort
            </SubmitButton>
          </Grid>
        </Grid>
      </form>
    </FrameBox>
  );
};

export default SortPanel;
