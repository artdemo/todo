import React, { useState, useEffect, useMemo } from 'react';
import { Grid, FormControl, FormLabel, FormGroup } from '@material-ui/core';
import useSortPanelHook from '../../hooks/useSortPanelHook';
import { compareObjects, compareArrays } from '../../utils/helpers';
import SubmitButton from '../Buttons/SubmitButton';
import CategoryCheckbox from './CategoryCheckbox';
import ColorCheckbox from './ColorCheckbox';
import SortSwitch from './SortSwitch';
import useStyles from './style';

const SortPanel = () => {
  const classes = useStyles();

  const {
    getTasks,
    sortObj,
    filterCategoryArray,
    filterColorArray,
    isSortPending,
    categoryListAmount,
    usedColorsObj,
  } = useSortPanelHook();

  const [switchersState, setSwitchersState] = useState({
    date: false,
    name: false,
  });
  const [filterCategoryState, setFilterCategoryState] = useState([]);
  const [filterColorState, setFilterColorState] = useState([]);

  useEffect(() => {
    setSwitchersState((prevState) => ({ ...prevState, ...sortObj }));
  }, [sortObj]);

  useEffect(() => {
    setFilterCategoryState(filterCategoryArray);
  }, [filterCategoryArray]);

  useEffect(() => {
    setFilterColorState(filterColorArray);
  }, [filterColorArray]);

  // ==================== CATEGORY FILTER LIST ================== //
  const handleFilterCategoryCheck = (id) => {
    if (!filterCategoryState.includes(id)) {
      setFilterCategoryState([...filterCategoryState, id]);
      return;
    }

    setFilterCategoryState(
      filterCategoryState.filter((categoryId) => categoryId !== id),
    );
  };

  const categoryCheckboxList = useMemo(
    () =>
      categoryListAmount.map(({ id, name, icon, taskAmount }) => (
        <CategoryCheckbox
          id={id}
          name={name}
          icon={icon}
          taskAmount={taskAmount}
          isChecked={filterCategoryState.includes(id)}
          handleChange={handleFilterCategoryCheck}
          key={`${name}-${id}`}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoryListAmount, filterCategoryState],
  );

  // ====================== COLOR FILTER LIST ==================== //
  const handleFilterColorCheck = (color) => {
    if (!filterColorState.includes(color)) {
      setFilterColorState([...filterColorState, color]);
      return;
    }

    setFilterColorState(
      filterColorState.filter((setColor) => setColor !== color),
    );
  };

  const colorCheckboxList = useMemo(
    () =>
      Object.entries(usedColorsObj).map(([color, taskAmount]) => (
        <ColorCheckbox
          color={color}
          taskAmount={taskAmount}
          isChecked={filterColorState.includes(color)}
          handleChange={handleFilterColorCheck}
          key={color}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [usedColorsObj, filterColorState],
  );

  // ====================== SORT SWITCH LIST ====================== //
  const handleSortChange = (e) => {
    setSwitchersState({ ...switchersState, [e.target.name]: e.target.checked });
  };

  const switchList = useMemo(
    () =>
      Object.keys(sortObj).map((name) => (
        <SortSwitch
          name={name}
          isChecked={switchersState[name]}
          handleChange={handleSortChange}
          key={name}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortObj, switchersState],
  );

  // ======================== SORT PANEL ======================== //
  const handleSubmit = (e) => {
    e.preventDefault();

    const sortString = Object.keys(switchersState)
      .filter((key) => switchersState[key] && key)
      .join(',');

    getTasks({
      _sort: sortString,
      categoryId: filterCategoryState,
      color: filterColorState,
    });
  };

  const isFilterMatched = () =>
    compareObjects(sortObj, switchersState) &&
    compareArrays(filterCategoryState, filterCategoryArray) &&
    compareArrays(filterColorState, filterColorArray);

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sort</FormLabel>
            <FormGroup>{switchList}</FormGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">Filter by category</FormLabel>
            <FormGroup>{categoryCheckboxList}</FormGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">Filter by color</FormLabel>
            <FormGroup className={classes.colorGroup}>
              {colorCheckboxList}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <SubmitButton isLoading={isSortPending} disabled={isFilterMatched()}>
            Apply
          </SubmitButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default SortPanel;
