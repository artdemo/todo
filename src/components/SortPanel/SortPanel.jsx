import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import useSortPanelHook from '../../hooks/useSortPanelHook';
import SubmitButton from '../Buttons/SubmitButton';
import SortSwitchGroup from './SortSwitchGroup';
import CategoryCheckboxGroup from './CategoryCheckboxGroup';
import ColorCheckboxGroup from './ColorCheckboxGroup';
import { compareObjects, compareArrays } from '../../utils/helpers';
import useStyles from './style';

const SortPanel = () => {
  const classes = useStyles();

  const {
    setParams,
    sortObj,
    filterCategoryArray,
    filterColorArray,
    categoryListTaskCount,
    usedColorsObj,
  } = useSortPanelHook();

  // ====================== SORT SWITCH GROUP ====================== //
  const [switchersState, setSwitchersState] = useState({
    date: false,
    name: false,
  });

  useEffect(() => {
    setSwitchersState((prevState) => ({ ...prevState, ...sortObj }));
  }, [sortObj]);

  const handleSortChange = (e) => {
    setSwitchersState({ ...switchersState, [e.target.name]: e.target.checked });
  };

  // ==================== CATEGORY FILTER GROUP  =================== //
  const [filterCategoryState, setFilterCategoryState] = useState([]);

  useEffect(() => {
    setFilterCategoryState(filterCategoryArray);
  }, [filterCategoryArray]);

  const handleFilterCategoryCheck = (id) => {
    if (!filterCategoryState.includes(id)) {
      setFilterCategoryState([...filterCategoryState, id]);
      return;
    }

    setFilterCategoryState(
      filterCategoryState.filter((categoryId) => categoryId !== id),
    );
  };

  // ====================== COLOR FILTER GROUP ==================== //
  const [filterColorState, setFilterColorState] = useState([]);

  useEffect(() => {
    setFilterColorState(filterColorArray);
  }, [filterColorArray]);

  const handleFilterColorCheck = (color) => {
    if (!filterColorState.includes(color)) {
      setFilterColorState([...filterColorState, color]);
      return;
    }

    setFilterColorState(
      filterColorState.filter((setColor) => setColor !== color),
    );
  };

  // ======================== SORT PANEL ======================== //
  const handleSubmit = (e) => {
    e.preventDefault();

    const sortString = Object.keys(switchersState)
      .filter((key) => switchersState[key] && key)
      .join(',');

    setParams({
      _sort: sortString,
      categoryId: filterCategoryState,
      color: filterColorState,
      _start: 0,
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
          <SortSwitchGroup
            list={Object.keys(sortObj)}
            checkedList={switchersState}
            handleChange={handleSortChange}
          />
        </Grid>
        <Grid item>
          <CategoryCheckboxGroup
            list={categoryListTaskCount}
            checkedList={filterCategoryState}
            handleChange={handleFilterCategoryCheck}
          />
        </Grid>
        <Grid item>
          <ColorCheckboxGroup
            list={Object.entries(usedColorsObj)}
            checkedList={filterColorState}
            handleChange={handleFilterColorCheck}
          />
        </Grid>
        <Grid item>
          <SubmitButton disabled={isFilterMatched()}>Apply</SubmitButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default SortPanel;
