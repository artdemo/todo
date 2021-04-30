import React, { useState, useEffect } from 'react';
import { Grid, FormControlLabel, Switch } from '@material-ui/core';
import SubmitButton from '../Buttons/SubmitButton';
import FrameBox from '../FrameBox';
import useSortPanelHook from '../../hooks/useSortPanelHook';

const SortPanel = () => {
  const { getTasks, resolvedSortState, isSortPending } = useSortPanelHook();

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

  return (
    <FrameBox>
      <form onSubmit={handleSubmit}>
        <Grid container alignContent="center" spacing={2}>
          <Grid item xs={3}>
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
          </Grid>
          <Grid item xs={6}>
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
